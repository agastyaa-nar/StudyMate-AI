// src/components/StudyHoursChart.tsx - Simplified and Functional
import { useStudyLogs } from '@/hooks/useStudyLogs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

export function StudyHoursChart() {
  const { logs, loading } = useStudyLogs();

  const chartData = useMemo(() => {
    // Get last 7 days
    const today = new Date();
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Calculate total hours for this date
      const dayLogs = logs.filter((log: any) => log.date === dateStr);
      const totalHours = dayLogs.reduce((sum, log) => sum + (log.hours || 0), 0);
      
      last7Days.push({
        date: dateStr,
        hours: totalHours,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }

    return last7Days;
  }, [logs]);

  const totalHours = chartData.reduce((sum, day) => sum + day.hours, 0);
  const averageHours = totalHours / 7;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total Hours</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}h</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Daily Average</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{averageHours.toFixed(1)}h</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Study Hours - Last 7 Days</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12, fill: '#666' }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#666' }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                      <p className="font-medium text-gray-900">{data.fullDate}</p>
                      <p className="text-blue-600">
                        <span className="font-semibold">{data.hours.toFixed(1)}h</span> studied
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="hours" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* No Data State */}
      {totalHours === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Study Data Yet</h3>
          <p className="text-gray-600">Start logging your study sessions to see your progress here!</p>
        </div>
      )}
    </div>
  );
}