/* eslint-disable @typescript-eslint/no-explicit-any */

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StudyLogRequest {
  raw_text: string;
  user_id: string;
}

interface ProcessedStudyLog {
  subject?: string;
  duration_minutes?: number;
  topics: string[];
  insights: string;
  mood_score?: number;
  difficulty_level?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { raw_text, user_id }: StudyLogRequest = await req.json();
    
    if (!raw_text || !user_id) {
      throw new Error('Missing required fields: raw_text or user_id');
    }

    // Process text with IBM Granite AI (simulated for now - replace with actual API)
    const processedData = await processWithIBMGranite(raw_text);
    
    // Find or create subject
    let subject_id: string | null = null;
    if (processedData.subject) {
      const { data: existingSubject } = await supabaseClient
        .from('subjects')
        .select('id')
        .eq('user_id', user_id)
        .ilike('name', processedData.subject)
        .single();

      if (existingSubject) {
        subject_id = existingSubject.id;
      } else {
        const { data: newSubject, error } = await supabaseClient
          .from('subjects')
          .insert({
            user_id,
            name: processedData.subject,
            color: getSubjectColor(processedData.subject)
          })
          .select('id')
          .single();
        
        if (error) throw error;
        subject_id = newSubject.id;
      }
    }

    // Insert study log
    const { data: studyLog, error } = await supabaseClient
      .from('study_logs')
      .insert({
        user_id,
        subject_id,
        raw_text,
        extracted_topics: processedData.topics,
        duration_minutes: processedData.duration_minutes,
        insights: processedData.insights,
        mood_score: processedData.mood_score,
        difficulty_level: processedData.difficulty_level,
        study_date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single();

    if (error) throw error;

    // Generate AI insights if this is significant progress
    if (processedData.duration_minutes && processedData.duration_minutes > 30) {
      await generateInsights(supabaseClient, user_id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: studyLog,
        processed_data: processedData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error processing study log:', error);
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

async function processWithIBMGranite(text: string): Promise<ProcessedStudyLog> {
  // TODO: Replace with actual IBM Granite API call
  // For now, using rule-based processing as a placeholder
  
  const duration_match = text.match(/(\d+)\s*(hours?|hrs?|minutes?|mins?)/i);
  let duration_minutes = 0;
  
  if (duration_match) {
    const value = parseInt(duration_match[1]);
    const unit = duration_match[2].toLowerCase();
    duration_minutes = unit.includes('hour') || unit.includes('hr') ? value * 60 : value;
  }

  // Extract potential subjects
  const subjects = ['calculus', 'algebra', 'physics', 'chemistry', 'biology', 'history', 'english', 'literature', 'computer science', 'programming'];
  const found_subject = subjects.find(subject => text.toLowerCase().includes(subject));

  // Extract topics (basic keyword extraction)
  const topics: string[] = [];
  const topic_keywords = ['derivative', 'integral', 'function', 'equation', 'theory', 'concept', 'chapter', 'problem', 'exercise'];
  topic_keywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      topics.push(keyword);
    }
  });

  // Generate insights based on content
  const insights = generateBasicInsights(text, duration_minutes, topics);

  // Estimate mood and difficulty (basic sentiment analysis)
  const mood_indicators = {
    positive: ['understood', 'clear', 'easy', 'good', 'well', 'progress'],
    negative: ['difficult', 'hard', 'confused', 'struggle', 'complex']
  };
  
  let mood_score = 3; // neutral
  let difficulty_level = 3; // medium

  const positive_count = mood_indicators.positive.filter(word => text.toLowerCase().includes(word)).length;
  const negative_count = mood_indicators.negative.filter(word => text.toLowerCase().includes(word)).length;

  if (positive_count > negative_count) mood_score = 4;
  if (negative_count > positive_count) mood_score = 2;

  if (text.toLowerCase().includes('difficult') || text.toLowerCase().includes('hard')) difficulty_level = 4;
  if (text.toLowerCase().includes('easy') || text.toLowerCase().includes('simple')) difficulty_level = 2;

  return {
    subject: found_subject,
    duration_minutes,
    topics,
    insights,
    mood_score,
    difficulty_level
  };
}

function generateBasicInsights(text: string, duration: number, topics: string[]): string {
  const insights: string[] = [];
  
  if (duration > 120) {
    insights.push("Great job on the extended study session!");
  } else if (duration < 30) {
    insights.push("Consider longer study sessions for better retention.");
  }

  if (topics.length > 2) {
    insights.push("You covered multiple topics - good breadth of learning.");
  }

  if (text.toLowerCase().includes('practice') || text.toLowerCase().includes('problem')) {
    insights.push("Practice problems are excellent for reinforcing concepts.");
  }

  return insights.length > 0 ? insights.join(' ') : "Keep up the consistent study routine!";
}

function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    'calculus': '#3B82F6',
    'algebra': '#10B981',
    'physics': '#8B5CF6',
    'chemistry': '#F59E0B',
    'biology': '#EF4444',
    'history': '#6B7280',
    'english': '#EC4899',
    'literature': '#14B8A6',
    'computer science': '#6366F1',
    'programming': '#84CC16'
  };
  return colors[subject.toLowerCase()] || '#3B82F6';
}

async function generateInsights(supabaseClient: any, user_id: string) {
  // Generate weekly summary and recommendations
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data: recentLogs } = await supabaseClient
    .from('study_logs')
    .select('*')
    .eq('user_id', user_id)
    .gte('created_at', weekAgo.toISOString());

  if (recentLogs && recentLogs.length > 0) {
    const totalHours = recentLogs.reduce((sum: number, log: any) => sum + (log.duration_minutes || 0), 0) / 60;
    const subjects = [...new Set(recentLogs.map((log: any) => log.subject_id).filter(Boolean))];

    const insight = {
      total_hours: Math.round(totalHours * 10) / 10,
      subjects_studied: subjects.length,
      average_session: Math.round((totalHours / recentLogs.length) * 60),
      recommendation: totalHours < 10 ? "Try to increase your weekly study time to 10+ hours" : "Great weekly study consistency!"
    };

    await supabaseClient
      .from('ai_insights')
      .insert({
        user_id,
        insight_type: 'weekly_summary',
        content: insight
      });
  }
}