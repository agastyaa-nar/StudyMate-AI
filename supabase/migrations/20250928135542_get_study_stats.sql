-- SQL function to get study statistics
CREATE OR REPLACE FUNCTION get_study_stats(p_user_id UUID)
RETURNS TABLE (
  total_hours_this_week NUMERIC,
  total_hours_this_month NUMERIC,
  active_subjects INTEGER,
  upcoming_deadlines INTEGER
) AS $$
BEGIN
  RETURN QUERY
  WITH week_start AS (
    SELECT DATE_TRUNC('week', CURRENT_DATE) AS start_date
  ),
  month_start AS (
    SELECT DATE_TRUNC('month', CURRENT_DATE) AS start_date
  ),
  week_hours AS (
    SELECT COALESCE(SUM(duration_minutes), 0) / 60.0 AS hours
    FROM study_logs sl, week_start ws
    WHERE sl.user_id = p_user_id 
    AND sl.study_date >= ws.start_date
  ),
  month_hours AS (
    SELECT COALESCE(SUM(duration_minutes), 0) / 60.0 AS hours
    FROM study_logs sl, month_start ms
    WHERE sl.user_id = p_user_id 
    AND sl.study_date >= ms.start_date
  ),
  active_subs AS (
    SELECT COUNT(DISTINCT subject_id) AS count
    FROM study_logs sl, week_start ws
    WHERE sl.user_id = p_user_id 
    AND sl.study_date >= ws.start_date
    AND sl.subject_id IS NOT NULL
  ),
  upcoming_tasks AS (
    SELECT COUNT(*) AS count
    FROM tasks_exams te
    WHERE te.user_id = p_user_id 
    AND te.due_date >= CURRENT_DATE
    AND te.due_date <= CURRENT_DATE + INTERVAL '7 days'
    AND te.status != 'completed'
  )
  SELECT 
    ROUND(wh.hours, 1),
    ROUND(mh.hours, 1),
    COALESCE(as_count.count, 0)::INTEGER,
    COALESCE(ut.count, 0)::INTEGER
  FROM week_hours wh, month_hours mh, active_subs as_count, upcoming_tasks ut;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;