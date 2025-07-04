
-- Create function to get group discussions
CREATE OR REPLACE FUNCTION public.get_group_discussions(p_group_id UUID)
RETURNS TABLE (
  id UUID,
  group_id UUID,
  user_id UUID,
  message TEXT,
  message_type TEXT,
  parent_id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gd.id,
    gd.group_id,
    gd.user_id,
    gd.message,
    gd.message_type,
    gd.parent_id,
    gd.created_at,
    gd.updated_at
  FROM public.group_discussions gd
  WHERE gd.group_id = p_group_id
  ORDER BY gd.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to create group discussion
CREATE OR REPLACE FUNCTION public.create_group_discussion(
  p_group_id UUID,
  p_user_id UUID,
  p_message TEXT,
  p_message_type TEXT,
  p_parent_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_discussion_id UUID;
BEGIN
  INSERT INTO public.group_discussions (
    group_id, user_id, message, message_type, parent_id
  ) VALUES (
    p_group_id, p_user_id, p_message, p_message_type, p_parent_id
  ) RETURNING id INTO new_discussion_id;
  
  RETURN new_discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get group voting sessions
CREATE OR REPLACE FUNCTION public.get_group_voting_sessions(p_group_id UUID)
RETURNS TABLE (
  id UUID,
  group_id UUID,
  title TEXT,
  description TEXT,
  type TEXT,
  phase TEXT,
  max_selections INTEGER,
  candidates UUID[],
  options JSONB,
  status TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ,
  deadline TIMESTAMPTZ,
  results JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gvs.id,
    gvs.group_id,
    gvs.title,
    gvs.description,
    gvs.type,
    gvs.phase,
    gvs.max_selections,
    gvs.candidates,
    gvs.options,
    gvs.status,
    gvs.created_by,
    gvs.created_at,
    gvs.deadline,
    gvs.results
  FROM public.group_voting_sessions gvs
  WHERE gvs.group_id = p_group_id
  ORDER BY gvs.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user votes
CREATE OR REPLACE FUNCTION public.get_user_votes(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  voting_session_id UUID,
  voter_id UUID,
  selections UUID[],
  choice TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gv.id,
    gv.voting_session_id,
    gv.voter_id,
    gv.selections,
    gv.choice,
    gv.created_at
  FROM public.group_votes gv
  WHERE gv.voter_id = p_user_id
  ORDER BY gv.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to create voting session
CREATE OR REPLACE FUNCTION public.create_voting_session(
  p_group_id UUID,
  p_title TEXT,
  p_description TEXT,
  p_type TEXT,
  p_phase TEXT,
  p_max_selections INTEGER,
  p_candidates UUID[],
  p_options JSONB,
  p_created_by UUID,
  p_deadline TIMESTAMPTZ DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_session_id UUID;
BEGIN
  INSERT INTO public.group_voting_sessions (
    group_id, title, description, type, phase, max_selections, 
    candidates, options, created_by, deadline
  ) VALUES (
    p_group_id, p_title, p_description, p_type, p_phase, p_max_selections,
    p_candidates, p_options, p_created_by, p_deadline
  ) RETURNING id INTO new_session_id;
  
  RETURN new_session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to cast vote
CREATE OR REPLACE FUNCTION public.cast_vote(
  p_voting_session_id UUID,
  p_voter_id UUID,
  p_selections UUID[],
  p_choice TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_vote_id UUID;
BEGIN
  INSERT INTO public.group_votes (
    voting_session_id, voter_id, selections, choice
  ) VALUES (
    p_voting_session_id, p_voter_id, p_selections, p_choice
  ) RETURNING id INTO new_vote_id;
  
  RETURN new_vote_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user points
CREATE OR REPLACE FUNCTION public.get_user_points(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  total_points INTEGER,
  held_points INTEGER,
  available_points INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.id,
    up.user_id,
    up.total_points,
    up.held_points,
    up.available_points,
    up.created_at,
    up.updated_at
  FROM public.user_points up
  WHERE up.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get point transactions
CREATE OR REPLACE FUNCTION public.get_point_transactions(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  group_id UUID,
  amount INTEGER,
  type TEXT,
  description TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pt.id,
    pt.user_id,
    pt.group_id,
    pt.amount,
    pt.type,
    pt.description,
    pt.created_at
  FROM public.point_transactions pt
  WHERE pt.user_id = p_user_id
  ORDER BY pt.created_at DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
