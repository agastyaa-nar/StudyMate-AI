import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, Clock, Calendar, Target, Brain, Download, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('week');

  // Sample data for charts
  const studyHoursData = [
    { date: '2024-11-15', hours: 3.5, efficiency: 85 },
    { date: '2024-11-16', hours: 4.2, efficiency: 78 },
    { date: '2024-11-17', hours: 2.8, efficiency: 92 },
    { date: '2024-11-18', hours: 5.1, efficiency: 88 },
    { date: '2024-11-19', hours: 3.9, efficiency: 75 },
    { date: '2024-11-20', hours: 4.7, efficiency: 90 },
    { date: '2024-11-21', hours: 3.3, efficiency: 82 }
  ];

  const productivityByTime = [
    { time: '6:00', productivity: 65 },
    { time: '8:00', productivity: 88 },
    { time: '10:00', productivity: 95 },
    { time: '12:00', productivity: 72 },
    { time: '14:00', productivity: 68 },
    { time: '16:00', productivity: 85 },
    { time: '18:00', productivity: 78 },
    { time: '20:00', productivity: 82 },
    { time: '22:00', productivity: 45 }
  ];

  const subjectDistribution = [
    { name: 'Mathematics', value: 35, color: '#3b82f6' },
    { name: 'Physics', value: 25, color: '#10b981' },
    { name: 'Computer Science', value: 20, color: '#8b5cf6' },
    { name: 'Chemistry', value: 15, color: '#f59e0b' },
    { name: 'Literature', value: 5, color: '#ef4444' }
  ];

  const focusPatterns = [
    { session: 1, focus: 85, duration: 45 },
    { session: 2, focus: 92, duration: 60 },
    { session: 3, focus: 78, duration: 30 },
    { session: 4, focus: 88, duration: 90 },
    { session: 5, focus: 95, duration: 75 },
    { session: 6, focus: 82, duration: 50 }
  ];

  const streakData = [
    { date: '2024-11-01', streak: 1 },
    { date: '2024-11-02', streak: 2 },
    { date: '2024-11-03', streak: 3 },
    { date: '2024-11-04', streak: 4 },
    { date: '2024-11-05', streak: 5 },
    { date: '2024-11-06', streak: 6 },
    { date: '2024-11-07', streak: 7 },
    { date: '2024-11-08', streak: 8 },
    { date: '2024-11-09', streak: 9 },
    { date: '2024-11-10', streak: 10 },
    { date: '2024-11-11', streak: 11 },
    { date: '2024-11-12', streak: 12 }
  ];

  const exportData = () => {
    console.log('Exporting analytics data...');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        todayProgress={{ hours: 4.2, target: 6.0 }}
      />

      <main className="container mx-auto px-4 py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              Advanced Analytics
            </h1>
            <p className="text-muted-foreground">Deep insights into your study patterns and productivity</p>
          </div>
          
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={exportData} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">27.5h</p>
                  <p className="text-sm text-muted-foreground">Total Study Time</p>
                  <p className="text-xs text-success">+12% vs last week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                  <p className="text-xs text-success">+5% vs last week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-xs text-warning">Personal best!</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">4.2h</p>
                  <p className="text-sm text-muted-foreground">Peak Focus Time</p>
                  <p className="text-xs text-muted-foreground">10:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Study Hours & Efficiency</CardTitle>
                  <CardDescription>Daily study hours with efficiency tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studyHoursData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Study Streak Progress</CardTitle>
                  <CardDescription>Your consistency over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={streakData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="streak" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="productivity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Productivity Heatmap</CardTitle>
                  <CardDescription>Your focus levels throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productivityByTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="productivity" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Focus Session Analysis</CardTitle>
                  <CardDescription>Focus quality vs session duration</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={focusPatterns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="session" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="focus" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="duration" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Subject Distribution</CardTitle>
                  <CardDescription>Time allocation across subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Weekly hours by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectDistribution.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{subject.name}</span>
                          <span className="text-sm text-muted-foreground">{subject.value}h</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(subject.value / 35) * 100}%`,
                              backgroundColor: subject.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>AI Pattern Detection</CardTitle>
                  <CardDescription>Insights discovered by AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary">Peak Performance Window</h4>
                        <p className="text-sm text-muted-foreground">
                          Your focus is 23% higher between 10:00-12:00 AM. Consider scheduling challenging topics during this time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-secondary">Study Session Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          60-75 minute sessions show 15% better retention compared to longer sessions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-accent">Weekly Pattern</h4>
                        <p className="text-sm text-muted-foreground">
                          Tuesday and Thursday are your most productive days. Plan important reviews accordingly.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>AI-powered study recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <p className="text-sm">Schedule Math sessions at 10 AM for better performance</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 w-2 bg-secondary rounded-full"></div>
                    <p className="text-sm">Take 15-minute breaks between study sessions</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 w-2 bg-accent rounded-full"></div>
                    <p className="text-sm">Review Physics notes before Thursday sessions</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 w-2 bg-warning rounded-full"></div>
                    <p className="text-sm">Increase Computer Science study time by 2 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Goals Progress</CardTitle>
                  <CardDescription>Track your weekly study targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Study Hours</span>
                      <span className="text-sm text-muted-foreground">27.5 / 30h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[92%] transition-all duration-300"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Mathematics</span>
                      <span className="text-sm text-muted-foreground">8 / 10h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full w-[80%] transition-all duration-300"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Physics</span>
                      <span className="text-sm text-muted-foreground">6 / 8h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full w-[75%] transition-all duration-300"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Study Streak</span>
                      <span className="text-sm text-muted-foreground">12 / 14 days</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full w-[86%] transition-all duration-300"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Achievement Forecast</CardTitle>
                  <CardDescription>AI prediction of goal completion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-primary/10 rounded-lg border border-primary/20">
                      <h3 className="text-2xl font-bold text-primary">95%</h3>
                      <p className="text-sm text-muted-foreground">Likelihood of achieving weekly goals</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Total Hours Goal</span>
                        <span className="text-sm font-medium text-success">On Track</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Study Streak Goal</span>
                        <span className="text-sm font-medium text-warning">Needs Focus</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Subject Balance</span>
                        <span className="text-sm font-medium text-success">Excellent</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </div>
  );
};

export default Analytics;