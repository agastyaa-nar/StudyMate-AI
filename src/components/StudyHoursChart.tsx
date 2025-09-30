// src/components/StudyHoursChart.tsx - Updated with Supabase
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudyLogs } from '@/hooks/useStudyLogs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

export function StudyHoursChart() {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const { logs, loading } = useStudyLogs(
    weekAgo.toISOString().split('T')[0],
    today.toISOString().split('T')[0]
  );

  const chartData = useMemo(() => {
    // Group logs by date and sum hours
    const dataMap = new Map();
    
    logs.forEach((log: any) => {
      const date = log.date;
      const currentHours = dataMap.get(date) || 0;
      dataMap.set(date, currentHours + parseFloat(log.hours));
    });

    // Create array with all dates in range
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      result.push({
        date: dateStr,
        hours: dataMap.get(dateStr) || 0,
      });
    }

    return result;
  }, [logs]);

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Study Hours (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#3b82f6" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}