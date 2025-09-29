import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  BookOpen,
  TrendingUp,
  X
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'insight' | 'recommendation' | 'analysis';
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI study assistant powered by IBM Granite. I can help you analyze your study patterns, provide personalized recommendations, and answer questions about your learning progress.',
      sender: 'ai',
      timestamp: new Date(),
      type: 'insight'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
        type: 'recommendation'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('study') && lowerInput.includes('time')) {
      return 'Based on your study patterns, I recommend studying during your peak focus hours (9-11 AM). You\'ve shown 23% better retention during morning sessions compared to evening study.';
    }
    
    if (lowerInput.includes('subject') || lowerInput.includes('topic')) {
      return 'Your current subject distribution shows you\'re spending 40% time on Mathematics, 30% on Physics, and 30% on Chemistry. Consider balancing your time more evenly or focusing on subjects with upcoming deadlines.';
    }
    
    if (lowerInput.includes('improve') || lowerInput.includes('better')) {
      return 'To improve your study efficiency: 1) Take 10-minute breaks every 45 minutes, 2) Use active recall techniques, 3) Study similar topics in clusters. Your data shows 15% better performance when following these patterns.';
    }
    
    if (lowerInput.includes('exam') || lowerInput.includes('test')) {
      return 'You have 3 exams coming up in the next 2 weeks. Based on your study pace, I recommend allocating 2.5 hours daily to exam preparation. Focus on Chemistry first (exam in 5 days), then Physics, then Mathematics.';
    }
    
    return 'I\'m analyzing your study patterns using IBM Granite AI. Could you be more specific about what you\'d like help with? I can provide insights on study scheduling, subject prioritization, performance analysis, or exam preparation strategies.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessageIcon = (message: Message) => {
    if (message.sender === 'user') return <User className="h-4 w-4" />;
    
    switch (message.type) {
      case 'insight':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'recommendation':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'analysis':
        return <BookOpen className="h-4 w-4 text-green-500" />;
      default:
        return <Bot className="h-4 w-4 text-primary" />;
    }
  };

  const getMessageTypeLabel = (type?: string) => {
    switch (type) {
      case 'insight':
        return <Badge variant="secondary" className="text-xs">Insight</Badge>;
      case 'recommendation':
        return <Badge variant="default" className="text-xs">Recommendation</Badge>;
      case 'analysis':
        return <Badge variant="outline" className="text-xs">Analysis</Badge>;
      default:
        return null;
    }
  };

  if (!isOpen && !isMobile) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 bg-background border-l shadow-lg z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isMobile 
          ? `w-full sm:w-96 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
          : 'w-96'
      }`}>
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI Study Assistant</h3>
              <p className="text-xs text-muted-foreground">Powered by IBM Granite</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {getMessageIcon(message)}
              </div>
              
              <div className={`flex-1 space-y-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                <div className="flex items-center gap-2">
                  {message.sender === 'ai' && getMessageTypeLabel(message.type)}
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                
                <Card className={`p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground ml-8' 
                    : 'bg-muted mr-8'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </Card>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-3 bg-muted mr-8">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator />

      {/* Input */}
      <div className="p-4 bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your study patterns..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!input.trim() || isTyping}
            size="sm"
            className="bg-gradient-primary hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          AI responses are simulated. Press Enter to send.
        </p>
      </div>
      </div>
    </>
  );
};