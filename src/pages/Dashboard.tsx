import { useState } from 'react';
import { StudyLogInput } from "@/components/StudyLogInput";
import { SubjectProgress } from "@/components/SubjectProgress";
import { StudyHoursChart } from "@/components/StudyHoursChart";
import { StudyCalendar } from "@/components/StudyCalendar";
import { AIInsights } from "@/components/AIInsights";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { BookOpen, BarChart3, Calendar, Target, Brain } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, loading } = useDashboard();

  const stats = data?.stats || {
    total_hours_this_week: 35.2,
    active_subjects: 4,
    upcoming_deadlines: 3,
  };

  // Calculate goal achievement (example calculation)
  const goalAchievement = Math.round((stats.total_hours_this_week / 40) * 100);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        todayProgress={{ hours: 4.2, target: 6.0 }}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.active_subjects}</p>
                <p className="text-sm text-muted-foreground">Active Subjects</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{stats.total_hours_this_week}h</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{goalAchievement}%</p>
                <p className="text-sm text-muted-foreground">Goal Achievement</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Study Streak</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Study Log Input */}
        <StudyLogInput />

        {/* Subject Progress */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Subject Progress
          </h2>
          <SubjectProgress />
        </section>

        {/* Charts Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-secondary" />
            Study Analytics
          </h2>
          <StudyHoursChart />
        </section>

        {/* Calendar and AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Calendar & Tasks
            </h2>
            <StudyCalendar />
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibeld flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Insights
            </h2>
            <AIInsights />
          </section>
        </div>
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;