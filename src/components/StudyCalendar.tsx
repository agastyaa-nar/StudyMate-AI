import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, AlertCircle, CheckCircle } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Calculus Midterm",
    date: "Oct 15",
    type: "exam",
    priority: "high",
    subject: "Calculus",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Physics Lab Report",
    date: "Oct 12",
    type: "assignment",
    priority: "medium",
    subject: "Physics",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Chemistry Quiz",
    date: "Oct 18",
    type: "quiz",
    priority: "medium",
    subject: "Chemistry",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Statistics Project",
    date: "Oct 25",
    type: "project",
    priority: "high",
    subject: "Statistics",
    status: "upcoming"
  },
  {
    id: 5,
    title: "Math Homework Ch.5",
    date: "Oct 10",
    type: "homework",
    priority: "low",
    subject: "Calculus",
    status: "completed"
  }
];

export const StudyCalendar = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "exam": return "📝";
      case "assignment": return "📄";
      case "quiz": return "❓";
      case "project": return "🏗️";
      case "homework": return "📖";
      default: return "📅";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress": return <AlertCircle className="h-4 w-4 text-warning" />;
      default: return <CalendarDays className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">Upcoming Tasks & Exams</h3>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="text-lg">{getTypeIcon(event.type)}</div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {event.subject}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getPriorityColor(event.priority)}`}>
                  {event.priority}
                </Badge>
                {getStatusIcon(event.status)}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-muted-foreground">This Week</p>
              <p className="font-semibold text-primary">3 tasks</p>
            </div>
            <div>
              <p className="text-muted-foreground">Completed</p>
              <p className="font-semibold text-success">1 task</p>
            </div>
            <div>
              <p className="text-muted-foreground">Overdue</p>
              <p className="font-semibold text-destructive">0 tasks</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};