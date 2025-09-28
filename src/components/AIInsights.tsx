import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Clock } from "lucide-react";

const insights = [
  {
    type: "pattern",
    icon: <TrendingUp className="h-4 w-4" />,
    title: "Peak Study Time Detected",
    description: "You're most productive between 2-5 PM. Consider scheduling difficult topics during this window.",
    confidence: 92,
    actionable: true
  },
  {
    type: "warning",
    icon: <AlertTriangle className="h-4 w-4" />,
    title: "Statistics Needs Attention",
    description: "You've studied Statistics 40% less than other subjects this week. Consider increasing focus.",
    confidence: 88,
    actionable: true
  },
  {
    type: "recommendation",
    icon: <Lightbulb className="h-4 w-4" />,
    title: "Spaced Repetition Opportunity",
    description: "Review Calculus derivatives from 3 days ago to improve retention by 25%.",
    confidence: 85,
    actionable: true
  },
  {
    type: "habit",
    icon: <Clock className="h-4 w-4" />,
    title: "Consistency Improvement",
    description: "You've maintained daily study habits for 12 days straight. Keep up the momentum!",
    confidence: 100,
    actionable: false
  }
];

const recommendations = [
  "Focus on Statistics for next 2 study sessions",
  "Review Calculus Chain Rule concepts tomorrow",
  "Take a 15-minute break every hour for better retention",
  "Practice Physics problems after theory sessions"
];

export const AIInsights = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "pattern": return "text-primary bg-primary/10";
      case "warning": return "text-warning bg-warning/10";
      case "recommendation": return "text-success bg-success/10";
      case "habit": return "text-accent bg-accent/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-6 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Study Insights</h3>
            <Badge variant="outline" className="text-xs bg-gradient-primary text-white">
              Powered by IBM Granite
            </Badge>
          </div>

          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-full ${getTypeColor(insight.type)}`}>
                    {insight.icon}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confident
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-success" />
            <h3 className="text-lg font-semibold">Smart Recommendations</h3>
          </div>

          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-subtle">
                <div className="w-5 h-5 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <p className="text-sm flex-1">{recommendation}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Actions Taken</p>
                <p className="font-semibold text-primary">8/12</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Success Rate</p>
                <p className="font-semibold text-success">85%</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};