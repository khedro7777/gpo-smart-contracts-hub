
-- Create function to manage user points (hold, release, deduct, earn)
CREATE OR REPLACE FUNCTION public.manage_user_points(
  p_user_id UUID,
  p_group_id UUID,
  p_amount INTEGER,
  p_action TEXT, -- 'hold', 'release', 'deduct', 'earn'
  p_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  current_points RECORD;
  new_total INTEGER;
  new_held INTEGER;
  new_available INTEGER;
BEGIN
  -- Get current user points
  SELECT total_points, held_points, available_points 
  INTO current_points
  FROM public.user_points 
  WHERE user_id = p_user_id;
  
  -- If user doesn't have points record, create one
  IF NOT FOUND THEN
    INSERT INTO public.user_points (user_id, total_points, held_points, available_points)
    VALUES (p_user_id, 0, 0, 0);
    current_points.total_points := 0;
    current_points.held_points := 0;
    current_points.available_points := 0;
  END IF;
  
  -- Process the action
  CASE p_action
    WHEN 'hold' THEN
      -- Check if user has enough available points
      IF current_points.available_points < p_amount THEN
        RETURN FALSE;
      END IF;
      new_total := current_points.total_points;
      new_held := current_points.held_points + p_amount;
      new_available := current_points.available_points - p_amount;
      
    WHEN 'release' THEN
      -- Release held points back to available
      new_total := current_points.total_points;
      new_held := GREATEST(0, current_points.held_points - p_amount);
      new_available := current_points.available_points + LEAST(p_amount, current_points.held_points);
      
    WHEN 'deduct' THEN
      -- Deduct points (remove from total and available)
      IF current_points.available_points < p_amount THEN
        RETURN FALSE;
      END IF;
      new_total := GREATEST(0, current_points.total_points - p_amount);
      new_held := current_points.held_points;
      new_available := GREATEST(0, current_points.available_points - p_amount);
      
    WHEN 'earn' THEN
      -- Add new points
      new_total := current_points.total_points + p_amount;
      new_held := current_points.held_points;
      new_available := current_points.available_points + p_amount;
      
    ELSE
      RETURN FALSE;
  END CASE;
  
  -- Update user points
  UPDATE public.user_points 
  SET 
    total_points = new_total,
    held_points = new_held,
    available_points = new_available,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  -- Record the transaction
  INSERT INTO public.point_transactions (
    user_id, group_id, amount, type, description
  ) VALUES (
    p_user_id, p_group_id, p_amount, p_action, p_description
  );
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the required tables if they don't exist
CREATE TABLE IF NOT EXISTS public.user_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  held_points INTEGER NOT NULL DEFAULT 0,
  available_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.point_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  group_id UUID,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'hold', 'release', 'deduct', 'earn'
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.group_discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'general', -- 'general', 'suggestion', 'complaint', 'admin_notice'
  parent_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.group_voting_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'admin_election', 'decision', 'contract_approval'
  phase TEXT NOT NULL,
  max_selections INTEGER NOT NULL DEFAULT 1,
  candidates UUID[] DEFAULT '{}',
  options JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deadline TIMESTAMPTZ,
  results JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.group_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voting_session_id UUID NOT NULL,
  voter_id UUID NOT NULL,
  selections UUID[] DEFAULT '{}',
  choice TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_voting_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_votes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own points" ON public.user_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own points" ON public.user_points FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own points" ON public.user_points FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own transactions" ON public.point_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert transactions" ON public.point_transactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view discussions" ON public.group_discussions FOR SELECT USING (true);
CREATE POLICY "Users can create discussions" ON public.group_discussions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view voting sessions" ON public.group_voting_sessions FOR SELECT USING (true);
CREATE POLICY "Users can create voting sessions" ON public.group_voting_sessions FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Anyone can view votes" ON public.group_votes FOR SELECT USING (true);
CREATE POLICY "Users can cast votes" ON public.group_votes FOR INSERT WITH CHECK (auth.uid() = voter_id);
