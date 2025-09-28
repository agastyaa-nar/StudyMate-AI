import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const StudyLogInput = () => {
  const [logText, setLogText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!logText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "Study log processed!",
        description: "Your study session has been analyzed and added to your progress.",
      });
      setLogText("");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Log Your Study Session</h3>
        </div>
        
        <Textarea
          placeholder="e.g., 'Studied calculus derivatives for 2 hours, worked on practice problems and understood chain rule better. Need to review more tomorrow.'"
          value={logText}
          onChange={(e) => setLogText(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            AI will extract topics, duration, and insights
          </p>
          <Button 
            onClick={handleSubmit}
            disabled={!logText.trim() || isProcessing}
            className="bg-gradient-primary hover:opacity-90"
          >
            {isProcessing ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Log Study Session
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};