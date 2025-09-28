/* eslint-disable @typescript-eslint/no-explicit-any */


import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('PROJECT_URL') ?? '',
      Deno.env.get('ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Get user ID from JWT
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const user_id = user.id;

    // Fetch all dashboard data in parallel
    const [
      subjectsResult,
      recentLogsResult,
      tasksExamsResult,
      insightsResult,
      studyStatsResult
    ] = await Promise.all([
      // Subjects with progress
      supabaseClient
        .from('subjects')
        .select(`
          id, name, color, target_hours_per_week,
          study_logs(duration_minutes, study_date)
        `)
        .eq('user_id', user_id),
      
      // Recent study logs for charts
      supabaseClient
        .from('study_logs')
        .select('*')
        .eq('user_id', user_id)
        .gte('study_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('study_date', { ascending: false }),
      
      // Upcoming tasks and exams
      supabaseClient
        .from('tasks_exams')
        .select('*, subjects(name, color)')
        .eq('user_id', user_id)
        .gte('due_date', new Date().toISOString().split('T')[0])
        .order('due_date', { ascending: true })
        .limit(20),
      
      // AI insights
      supabaseClient
        .from('ai_insights')
        .select('*')
        .eq('user_id', user_id)
        .order('generated_at', { ascending: false })
        .limit(5),
      
      // Study statistics
      supabaseClient
        .rpc('get_study_stats', { p_user_id: user_id })
    ]);

    // Process subjects with weekly progress
    const subjects = subjectsResult.data?.map(subject => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      
      const thisWeekLogs = subject.study_logs?.filter((log: any) => 
        new Date(log.study_date) >= weekStart
      ) || [];
      
      const weeklyHours = thisWeekLogs.reduce((sum: number, log: any) => 
        sum + (log.duration_minutes || 0), 0) / 60;
      
      const progress = subject.target_hours_per_week > 0 
        ? Math.min((weeklyHours / subject.target_hours_per_week) * 100, 100)
        : 0;

      return {
        id: subject.id,
        name: subject.name,
        color: subject.color,
        target_hours_per_week: subject.target_hours_per_week,
        weekly_hours: Math.round(weeklyHours * 10) / 10,
        progress: Math.round(progress)
      };
    }) || [];

    // Process study hours data for chart
    const studyHoursData = processStudyHoursData(recentLogsResult.data || []);

    // Format calendar events
    const calendarEvents = tasksExamsResult.data?.map(item => ({
      id: item.id,
      title: item.title,
      date: item.due_date,
      type: item.type,
      priority: item.priority,
      status: item.status,
      subject: item.subjects?.name || 'General',
      color: item.subjects?.color || '#3B82F6'
    })) || [];

    const dashboardData = {
      subjects,
      studyHoursData,
      calendarEvents,
      insights: insightsResult.data || [],
      stats: studyStatsResult.data?.[0] || {
        total_hours_this_week: 0,
        total_hours_this_month: 0,
        active_subjects: 0,
        upcoming_deadlines: 0
      }
    };

    return new Response(
      JSON.stringify({ success: true, data: dashboardData }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

function processStudyHoursData(logs: any[]) {
  const dailyData: Record<string, number> = {};
  
  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dailyData[dateStr] = 0;
  }

  // Aggregate study hours by date
  logs.forEach(log => {
    const date = log.study_date;
    if (dailyData.hasOwnProperty(date)) {
      dailyData[date] += (log.duration_minutes || 0) / 60;
    }
  });

  return Object.entries(dailyData).map(([date, hours]) => ({
    date: new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }),
    hours: Math.round(hours * 10) / 10
  }));
}