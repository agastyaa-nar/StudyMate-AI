import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Target, Brain, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  deadline: string;
  description: string;
  completed: boolean;
  tasks: StudyTask[];
}

interface StudyTask {
  id: string;
  title: string;
  estimated_time: number;
  completed: boolean;
  scheduled_date: string;
}

const StudyPlanner = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const { toast } = useToast();
  
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: '1',
      title: 'Advanced Calculus Exam Prep',
      subject: 'Mathematics',
      duration: 20,
      difficulty: 'hard',
      deadline: '2024-12-15',
      description: 'Comprehensive review of integration techniques and differential equations',
      completed: false,
      tasks: [
        { id: '1', title: 'Review integration by parts', estimated_time: 120, completed: true, scheduled_date: '2024-11-20' },
        { id: '2', title: 'Practice differential equations', estimated_time: 180, completed: false, scheduled_date: '2024-11-22' },
        { id: '3', title: 'Solve practice exam', estimated_time: 240, completed: false, scheduled_date: '2024-11-25' }
      ]
    },
    {
      id: '2',
      title: 'Data Structures Final Project',
      subject: 'Computer Science',
      duration: 30,
      difficulty: 'medium',
      deadline: '2024-12-10',
      description: 'Implement and analyze various sorting algorithms',
      completed: false,
      tasks: [
        { id: '4', title: 'Research sorting algorithms', estimated_time: 90, completed: true, scheduled_date: '2024-11-18' },
        { id: '5', title: 'Implement quicksort', estimated_time: 150, completed: false, scheduled_date: '2024-11-21' },
        { id: '6', title: 'Write performance analysis', estimated_time: 120, completed: false, scheduled_date: '2024-11-24' }
      ]
    }
  ]);

  const [newPlan, setNewPlan] = useState({
    title: '',
    subject: '',
    duration: '',
    difficulty: 'medium' as const,
    deadline: '',
    description: ''
  });

  const generateAIPlan = () => {
    toast({
      title: "AI Plan Generated! 🎯",
      description: "Your personalized study plan has been created based on your learning patterns.",
    });
    
    // Simulate AI-generated plan
    setStudyPlans(prev => [...prev, {
      id: Date.now().toString(),
      title: newPlan.title || 'AI Generated Study Plan',
      subject: newPlan.subject || 'General',
      duration: parseInt(newPlan.duration) || 15,
      difficulty: newPlan.difficulty,
      deadline: newPlan.deadline,
      description: newPlan.description || 'AI-optimized study plan based on your learning patterns',
      completed: false,
      tasks: [
        { id: Date.now().toString() + '1', title: 'Foundation review', estimated_time: 60, completed: false, scheduled_date: new Date().toISOString().split('T')[0] },
        { id: Date.now().toString() + '2', title: 'Practice exercises', estimated_time: 90, completed: false, scheduled_date: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
        { id: Date.now().toString() + '3', title: 'Final assessment', estimated_time: 120, completed: false, scheduled_date: new Date(Date.now() + 172800000).toISOString().split('T')[0] }
      ]
    }]);
    
    setShowCreatePlan(false);
    setNewPlan({ title: '', subject: '', duration: '', difficulty: 'medium', deadline: '', description: '' });
  };

  const toggleTaskComplete = (planId: string, taskId: string) => {
    setStudyPlans(prev => prev.map(plan => 
      plan.id === planId 
        ? {
            ...plan,
            tasks: plan.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : plan
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getCompletionPercentage = (plan: StudyPlan) => {
    const completedTasks = plan.tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / plan.tasks.length) * 100);
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
              <Target className="h-8 w-8 text-primary" />
              Study Planner
            </h1>
            <p className="text-muted-foreground">AI-powered adaptive study planning</p>
          </div>
          
          <Button onClick={() => setShowCreatePlan(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Plan
          </Button>
        </div>

        {/* Create Plan Form */}
        {showCreatePlan && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Create AI-Powered Study Plan
              </CardTitle>
              <CardDescription>
                Let our AI create a personalized study plan based on your learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Plan Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Final Exam Preparation"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics"
                    value={newPlan.subject}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Study Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 20"
                    value={newPlan.duration}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={newPlan.difficulty} onValueChange={(value: any) => setNewPlan(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newPlan.deadline}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your study goals and any specific topics to focus on..."
                  value={newPlan.description}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={generateAIPlan} className="gap-2">
                  <Brain className="h-4 w-4" />
                  Generate AI Plan
                </Button>
                <Button variant="outline" onClick={() => setShowCreatePlan(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Study Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studyPlans.map((plan) => (
            <Card key={plan.id} className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {plan.subject}
                      </span>
                      <span className={`flex items-center gap-1 ${getDifficultyColor(plan.difficulty)}`}>
                        <Brain className="h-4 w-4" />
                        {plan.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(plan.deadline).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{getCompletionPercentage(plan)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getCompletionPercentage(plan)}%` }}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Tasks
                  </h4>
                  {plan.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        onChange={() => toggleTaskComplete(plan.id, task.id)}
                        className="rounded border-muted-foreground"
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {task.estimated_time} min • {new Date(task.scheduled_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </div>
  );
};

export default StudyPlanner;