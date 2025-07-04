
-- Create voting sessions table for admin elections and group decisions
CREATE TABLE IF NOT EXISTS public.group_voting_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'admin_election', -- 'admin_election', 'decision', 'contract_approval'
  phase TEXT NOT NULL,
  max_selections INTEGER DEFAULT 1,
  candidates UUID[] DEFAULT '{}',
  options JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deadline TIMESTAMPTZ,
  results JSONB DEFAULT '{}'
);

-- Create votes table for tracking individual votes
CREATE TABLE IF NOT EXISTS public.group_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voting_session_id UUID REFERENCES public.group_voting_sessions(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL,
  selections UUID[] DEFAULT '{}', -- For multi-select votes like admin elections
  choice TEXT, -- For simple yes/no or text choices
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(voting_session_id, voter_id) -- One vote per session per user
);

-- Create group actions log for admin activities
CREATE TABLE IF NOT EXISTS public.group_actions_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL,
  action TEXT NOT NULL, -- 'approve_member', 'reject_member', 'freeze_member', 'escalate_complaint'
  target_user_id UUID,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user points system
CREATE TABLE IF NOT EXISTS public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  total_points INTEGER DEFAULT 0,
  held_points INTEGER DEFAULT 0, -- Points held for pending group memberships
  available_points INTEGER GENERATED ALWAYS AS (total_points - held_points) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create point transactions log
CREATE TABLE IF NOT EXISTS public.point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  group_id UUID REFERENCES public.groups(id),
  amount INTEGER NOT NULL, -- Positive for credit, negative for debit
  type TEXT NOT NULL, -- 'hold', 'release', 'deduct', 'earn'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group discussions/messages
CREATE TABLE IF NOT EXISTS public.group_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'general', -- 'general', 'suggestion', 'complaint', 'admin_notice'
  parent_id UUID REFERENCES public.group_discussions(id), -- For replies
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group files/contracts storage
CREATE TABLE IF NOT EXISTS public.group_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT, -- 'contract', 'proposal', 'document'
  uploaded_by UUID NOT NULL,
  phase TEXT, -- Which phase this file belongs to
  status TEXT DEFAULT 'active', -- 'active', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update groups table to include more fields for lifecycle management
ALTER TABLE public.groups 
ADD COLUMN IF NOT EXISTS points_held INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS activation_threshold INTEGER DEFAULT 5, -- Minimum members needed
ADD COLUMN IF NOT EXISTS last_phase_change TIMESTAMPTZ DEFAULT NOW();

-- Update group_members table to include more status options
ALTER TABLE public.group_members 
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
ADD COLUMN IF NOT EXISTS frozen_until TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Enable RLS on all new tables
ALTER TABLE public.group_voting_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_actions_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for group_voting_sessions
CREATE POLICY "Group members can view voting sessions" ON public.group_voting_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members 
      WHERE group_id = group_voting_sessions.group_id 
      AND user_id = auth.uid() 
      AND status = 'active'
    )
  );

CREATE POLICY "Group admins can create voting sessions" ON public.group_voting_sessions
  FOR INSERT WITH CHECK (
    auth.uid() = ANY(
      SELECT unnest(admins) FROM public.groups WHERE id = group_id
    )
  );

-- RLS Policies for group_votes
CREATE POLICY "Users can view all votes in their groups" ON public.group_votes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_voting_sessions gvs
      JOIN public.group_members gm ON gvs.group_id = gm.group_id
      WHERE gvs.id = group_votes.voting_session_id
      AND gm.user_id = auth.uid()
      AND gm.status = 'active'
    )
  );

CREATE POLICY "Users can cast their own votes" ON public.group_votes
  FOR INSERT WITH CHECK (auth.uid() = voter_id);

-- RLS Policies for group_actions_log
CREATE POLICY "Group members can view actions log" ON public.group_actions_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members 
      WHERE group_id = group_actions_log.group_id 
      AND user_id = auth.uid() 
      AND status = 'active'
    )
  );

CREATE POLICY "Admins can log actions" ON public.group_actions_log
  FOR INSERT WITH CHECK (
    auth.uid() = ANY(
      SELECT unnest(admins) FROM public.groups WHERE id = group_id
    )
  );

-- RLS Policies for user_points
CREATE POLICY "Users can view their own points" ON public.user_points
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own points" ON public.user_points
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own points" ON public.user_points
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for point_transactions
CREATE POLICY "Users can view their own transactions" ON public.point_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create transactions" ON public.point_transactions
  FOR INSERT WITH CHECK (true);

-- RLS Policies for group_discussions
CREATE POLICY "Group members can view discussions" ON public.group_discussions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members 
      WHERE group_id = group_discussions.group_id 
      AND user_id = auth.uid() 
      AND status = 'active'
    )
  );

CREATE POLICY "Group members can post messages" ON public.group_discussions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.group_members 
      WHERE group_id = group_discussions.group_id 
      AND user_id = auth.uid() 
      AND status = 'active'
    )
  );

-- RLS Policies for group_files
CREATE POLICY "Group members can view files" ON public.group_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members 
      WHERE group_id = group_files.group_id 
      AND user_id = auth.uid() 
      AND status = 'active'
    )
  );

CREATE POLICY "Group members can upload files" ON public.group_files
  FOR INSERT WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM public.group_members 
      WHERE group_id = group_files.group_id 
      AND user_id = auth.uid() 
      AND status = 'active'
    )
  );

-- Create function to automatically initialize user points
CREATE OR REPLACE FUNCTION public.initialize_user_points()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_points (user_id, total_points)
  VALUES (NEW.id, 100) -- Start with 100 points
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to initialize points for new users
DROP TRIGGER IF EXISTS on_auth_user_created_points ON auth.users;
CREATE TRIGGER on_auth_user_created_points
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_points();

-- Create function to hold/release points for group membership
CREATE OR REPLACE FUNCTION public.manage_user_points(
  p_user_id UUID,
  p_group_id UUID,
  p_amount INTEGER,
  p_action TEXT,
  p_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  current_points INTEGER;
  current_held INTEGER;
BEGIN
  -- Get current points
  SELECT total_points, held_points INTO current_points, current_held
  FROM public.user_points WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    -- Initialize if not exists
    INSERT INTO public.user_points (user_id, total_points) VALUES (p_user_id, 100);
    current_points := 100;
    current_held := 0;
  END IF;
  
  -- Perform action
  CASE p_action
    WHEN 'hold' THEN
      IF (current_points - current_held) >= p_amount THEN
        UPDATE public.user_points 
        SET held_points = held_points + p_amount, updated_at = NOW()
        WHERE user_id = p_user_id;
        
        INSERT INTO public.point_transactions (user_id, group_id, amount, type, description)
        VALUES (p_user_id, p_group_id, p_amount, 'hold', COALESCE(p_description, 'Points held for group membership'));
        
        RETURN TRUE;
      ELSE
        RETURN FALSE;
      END IF;
      
    WHEN 'release' THEN
      UPDATE public.user_points 
      SET held_points = GREATEST(0, held_points - p_amount), updated_at = NOW()
      WHERE user_id = p_user_id;
      
      INSERT INTO public.point_transactions (user_id, group_id, amount, type, description)
      VALUES (p_user_id, p_group_id, p_amount, 'release', COALESCE(p_description, 'Points released from group membership'));
      
      RETURN TRUE;
      
    WHEN 'deduct' THEN
      IF (current_points - current_held) >= p_amount THEN
        UPDATE public.user_points 
        SET total_points = total_points - p_amount, updated_at = NOW()
        WHERE user_id = p_user_id;
        
        INSERT INTO public.point_transactions (user_id, group_id, amount, type, description)
        VALUES (p_user_id, p_group_id, -p_amount, 'deduct', COALESCE(p_description, 'Points deducted for group membership'));
        
        RETURN TRUE;
      ELSE
        RETURN FALSE;
      END IF;
      
    ELSE
      RETURN FALSE;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
