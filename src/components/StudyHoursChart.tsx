import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Calendar, Clock, BarChart3 } from "lucide-react";

const weeklyData = [
  { day: "Mon", hours: 4.5, target: 4 },
  { day: "Tue", hours: 6.2, target: 4 },
  { day: "Wed", hours: 3.8, target: 4 },
  { day: "Thu", hours: 5.5, target: 4 },
  { day: "Fri", hours: 2.3, target: 4 },
  { day: "Sat", hours: 7.2, target: 6 },
  { day: "Sun", hours: 5.8, target: 6 }
];

const monthlyData = [
  { week: "Week 1", hours: 28 },
  { week: "Week 2", hours: 32 },
  { week: "Week 3", hours: 35 },
  { week: "Week 4", hours: 29 }
];

export const StudyHoursChart = () => {
  const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const avgHours = totalHours / weeklyData.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-6 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Daily Study Hours</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{totalHours.toFixed(1)}h</p>
              <p className="text-xs text-muted-foreground">This Week</p>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="hours" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="target" 
                  fill="hsl(var(--muted))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Avg: {avgHours.toFixed(1)}h/day</span>
            </div>
            <div className="text-success">
              Target achieved 5/7 days
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-semibold">Weekly Trends</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Best Week</p>
              <p className="font-semibold">Week 3 (35h)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Improvement</p>
              <p className="font-semibold text-success">+3.5h from Week 1</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};