import { StudyLogInput } from "@/components/StudyLogInput";
import { SubjectProgress } from "@/components/SubjectProgress";
import { StudyHoursChart } from "@/components/StudyHoursChart";
import { StudyCalendar } from "@/components/StudyCalendar";
import { AIInsights } from "@/components/AIInsights";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, Brain, BarChart3, Calendar, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Study Tracker</h1>
                <p className="text-sm text-muted-foreground">Intelligent learning analytics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Today's Progress</p>
                <p className="font-semibold">4.2 / 6.0 hours</p>
              </div>
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Active Subjects</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">35.2h</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">87%</p>
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
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Insights
            </h2>
            <AIInsights />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;