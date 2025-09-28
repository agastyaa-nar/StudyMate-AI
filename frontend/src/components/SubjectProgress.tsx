import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Clock, TrendingUp, Target } from "lucide-react";

const subjects = [
  {
    name: "Calculus",
    progress: 78,
    hoursThisWeek: 12,
    totalHours: 45,
    trend: "+15%",
    color: "bg-primary",
    nextDeadline: "Midterm - Oct 15"
  },
  {
    name: "Physics",
    progress: 65,
    hoursThisWeek: 8,
    totalHours: 32,
    trend: "+8%",
    color: "bg-secondary",
    nextDeadline: "Lab Report - Oct 12"
  },
  {
    name: "Chemistry",
    progress: 82,
    hoursThisWeek: 10,
    totalHours: 38,
    trend: "+12%",
    color: "bg-accent",
    nextDeadline: "Quiz - Oct 18"
  },
  {
    name: "Statistics",
    progress: 45,
    hoursThisWeek: 6,
    totalHours: 22,
    trend: "+5%",
    color: "bg-warning",
    nextDeadline: "Project - Oct 25"
  }
];

export const SubjectProgress = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {subjects.map((subject) => (
        <Card key={subject.name} className="p-4 shadow-card hover:shadow-elevated transition-all duration-300">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium text-sm">{subject.name}</h4>
              </div>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                {subject.trend}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span>{subject.hoursThisWeek}h this week</span>
              </div>
              <div className="text-right text-muted-foreground">
                {subject.totalHours}h total
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Target className="h-3 w-3" />
                <span>{subject.nextDeadline}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};