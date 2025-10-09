import { StudyLogInput } from "@/components/StudyLogInput";
import { SubjectProgress } from "@/components/SubjectProgress";
import { StudyHoursChart } from "@/components/StudyHoursChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, Calendar, Target, Brain, Loader2, Clock, TrendingUp, Plus, Eye } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useStudyLogs } from "@/hooks/useStudyLogs";

const Dashboard = () => {
  const { data, loading } = useDashboard();
  const { user } = useAuth();
  const { logs } = useStudyLogs();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    total_hours_this_week: 0,
    active_subjects: 0,
    upcoming_deadlines: 0,
    current_streak: 0,
  };

  const goalAchievement = Math.round((stats.total_hours_this_week / 40) * 100);

  // Recent study logs (last 5)
  const recentLogs = logs.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Student'}!
          </h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        {/* Quick Stats - Simplified */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.active_subjects}</p>
                  <p className="text-sm text-gray-600">Active Subjects</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.total_hours_this_week.toFixed(1)}h</p>
                  <p className="text-sm text-gray-600">This Week</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{goalAchievement}%</p>
                  <p className="text-sm text-gray-600">Goal Progress</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{stats.current_streak}</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Add a new study session or view your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={() => {
                  // Scroll to study log input
                  const studyLogSection = document.querySelector('[data-study-log]');
                  studyLogSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Study Log
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                size="lg"
                onClick={() => {
                  // Scroll to analytics section
                  const analyticsSection = document.querySelector('[data-analytics]');
                  analyticsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Log Input - Simplified */}
        <Card data-study-log>
          <CardHeader>
            <CardTitle>Log Your Study Session</CardTitle>
            <CardDescription>Track your learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <StudyLogInput />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Study Sessions
              </CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.length > 0 ? (
                  recentLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{log.subjects?.name || 'Unknown Subject'}</p>
                        <p className="text-sm text-gray-600">{log.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{log.hours}h</p>
                        {log.efficiency && (
                          <p className="text-sm text-gray-600">Efficiency: {log.efficiency}/10</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No study sessions yet. Start logging your progress!</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress - Simplified */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Subject Progress
              </CardTitle>
              <CardDescription>Your learning progress by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <SubjectProgress />
            </CardContent>
          </Card>
        </div>

        {/* Study Chart - Simplified */}
        <Card data-analytics>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Study Analytics
            </CardTitle>
            <CardDescription>Visualize your learning patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <StudyHoursChart />
          </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default Dashboard;