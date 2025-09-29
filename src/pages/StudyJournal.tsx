import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Brain, Calendar, Clock, Sparkles, Plus, Search, Filter, Edit, Eye, Trash2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  aiSummary: string;
  aiReflection: string;
  date: string;
  studyDuration: number;
  subjects: string[];
  mood: 'excellent' | 'good' | 'neutral' | 'challenging' | 'difficult';
  keyTopics: string[];
  insights: string[];
  type: 'daily' | 'weekly' | 'reflection' | 'goal-setting';
}

const StudyJournal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Calculus Integration Breakthrough',
      content: 'Today I finally understood integration by parts after struggling with it for weeks. The key was practicing with different function types and seeing the pattern. Started with simple polynomial functions, then moved to exponential and trigonometric combinations.',
      aiSummary: 'Student achieved breakthrough in calculus integration, specifically mastering integration by parts through systematic practice with various function types.',
      aiReflection: 'This represents significant progress in mathematical reasoning. The systematic approach from simple to complex problems demonstrates effective learning strategy. Consider applying this methodology to other challenging topics.',
      date: '2024-11-21',
      studyDuration: 180,
      subjects: ['Mathematics', 'Calculus'],
      mood: 'excellent',
      keyTopics: ['Integration by parts', 'Function analysis', 'Problem-solving patterns'],
      insights: ['Systematic practice works better than random problems', 'Pattern recognition is key to mastery'],
      type: 'daily'
    },
    {
      id: '2',
      title: 'Weekly Study Reflection',
      content: 'This week was challenging but productive. Spent 25 hours total studying across 4 subjects. Physics quantum mechanics concepts are still confusing, but making progress with wave functions. Need to allocate more time to chemistry organic reactions.',
      aiSummary: 'Weekly review showing 25 hours across 4 subjects with mixed progress. Physics quantum mechanics challenging, chemistry needs more attention.',
      aiReflection: 'Good self-awareness of learning progress. The identification of challenging areas (quantum mechanics) and areas needing more time (organic chemistry) shows effective metacognitive skills. Consider specific strategies for quantum mechanics visualization.',
      date: '2024-11-18',
      studyDuration: 1500, // 25 hours total for the week
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
      mood: 'good',
      keyTopics: ['Quantum mechanics', 'Wave functions', 'Organic reactions', 'Study planning'],
      insights: ['Need better time allocation', 'Visual learning helps with complex concepts'],
      type: 'weekly'
    },
    {
      id: '3',
      title: 'Data Structures Confusion',
      content: 'Struggled with binary tree traversal algorithms today. The recursive nature is conceptually clear, but implementing it in code is challenging. Spent 2 hours debugging a simple in-order traversal. Need to practice more basic recursion problems.',
      aiSummary: 'Student faced challenges with binary tree traversal implementation, particularly with recursive concepts in practical coding.',
      aiReflection: 'The gap between conceptual understanding and implementation is common in computer science. This suggests need for more hands-on coding practice with simpler recursive problems before tackling complex data structures.',
      date: '2024-11-20',
      studyDuration: 120,
      subjects: ['Computer Science', 'Data Structures'],
      mood: 'challenging',
      keyTopics: ['Binary trees', 'Recursion', 'Algorithm implementation', 'Debugging'],
      insights: ['Practice simple recursion first', 'Debugging skills need improvement'],
      type: 'daily'
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    studyDuration: '',
    subjects: [] as string[],
    mood: 'neutral' as const,
    type: 'daily' as const
  });

  const generateAIInsights = (entry: any) => {
    // Simulate AI processing
    const aiSummary = `AI-generated summary: Student worked on ${entry.subjects.join(', ')} for ${entry.studyDuration} minutes with ${entry.mood} results.`;
    const aiReflection = 'AI suggests focusing on consistent practice and breaking down complex problems into smaller, manageable parts. Consider reviewing foundational concepts when struggling with advanced topics.';
    const keyTopics = entry.content.split(' ').filter((word: string) => word.length > 6).slice(0, 3);
    const insights = ['Regular practice improves retention', 'Active learning strategies are effective'];

    return { aiSummary, aiReflection, keyTopics, insights };
  };

  const createNewEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and content fields.",
        variant: "destructive"
      });
      return;
    }

    const aiInsights = generateAIInsights(newEntry);
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString().split('T')[0],
      studyDuration: parseInt(newEntry.studyDuration) || 0,
      subjects: newEntry.subjects,
      mood: newEntry.mood,
      type: newEntry.type,
      ...aiInsights
    };

    setJournalEntries(prev => [entry, ...prev]);
    setNewEntry({
      title: '',
      content: '',
      studyDuration: '',
      subjects: [],
      mood: 'neutral',
      type: 'daily'
    });
    setShowNewEntry(false);

    toast({
      title: "Journal Entry Created! ✨",
      description: "AI insights have been generated for your entry.",
    });
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'bg-success text-success-foreground';
      case 'good': return 'bg-primary text-primary-foreground';
      case 'neutral': return 'bg-muted text-muted-foreground';
      case 'challenging': return 'bg-warning text-warning-foreground';
      case 'difficult': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Calendar className="h-4 w-4" />;
      case 'weekly': return <BookOpen className="h-4 w-4" />;
      case 'reflection': return <Brain className="h-4 w-4" />;
      case 'goal-setting': return <FileText className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredEntries = journalEntries.filter(entry => {
    const matchesType = filterType === 'all' || entry.type === filterType;
    const matchesSearch = searchQuery === '' || 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">

      <main className="container mx-auto px-4 py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Study Journal
            </h1>
            <p className="text-muted-foreground">AI-powered reflection and learning insights</p>
          </div>
          
          <Button onClick={() => setShowNewEntry(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search journal entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entries</SelectItem>
              <SelectItem value="daily">Daily Entries</SelectItem>
              <SelectItem value="weekly">Weekly Reviews</SelectItem>
              <SelectItem value="reflection">Reflections</SelectItem>
              <SelectItem value="goal-setting">Goal Setting</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={() => setViewMode(viewMode === 'list' ? 'detail' : 'list')}
            className="gap-2"
          >
            {viewMode === 'list' ? <Eye className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
            {viewMode === 'list' ? 'Detail View' : 'List View'}
          </Button>
        </div>

        {/* New Entry Form */}
        {showNewEntry && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Create New Journal Entry
              </CardTitle>
              <CardDescription>
                Write about your study session and let AI generate insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Entry Title</label>
                  <Input
                    placeholder="e.g., Calculus Integration Breakthrough"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Entry Type</label>
                  <Select value={newEntry.type} onValueChange={(value: any) => setNewEntry(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Entry</SelectItem>
                      <SelectItem value="weekly">Weekly Review</SelectItem>
                      <SelectItem value="reflection">Reflection</SelectItem>
                      <SelectItem value="goal-setting">Goal Setting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Study Duration (minutes)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 120"
                    value={newEntry.studyDuration}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, studyDuration: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mood</label>
                  <Select value={newEntry.mood} onValueChange={(value: any) => setNewEntry(prev => ({ ...prev, mood: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="challenging">Challenging</SelectItem>
                      <SelectItem value="difficult">Difficult</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Journal Content</label>
                <Textarea
                  placeholder="Describe your study session, what you learned, challenges you faced, and any insights you gained..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={createNewEntry} className="gap-2">
                  <Brain className="h-4 w-4" />
                  Create with AI Insights
                </Button>
                <Button variant="outline" onClick={() => setShowNewEntry(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Journal Entries */}
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      {getTypeIcon(entry.type)}
                      {entry.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(entry.date).toLocaleDateString()}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {entry.studyDuration} min
                      </Badge>
                      <Badge className={getMoodColor(entry.mood)}>
                        {entry.mood}
                      </Badge>
                      {entry.subjects.map(subject => (
                        <Badge key={subject} variant="secondary">{subject}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEntry(entry)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Your Reflection</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">{entry.content}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Summary
                    </h4>
                    <p className="text-sm text-muted-foreground">{entry.aiSummary}</p>
                  </div>

                  <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                    <h4 className="font-semibold text-sm text-secondary mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      AI Reflection
                    </h4>
                    <p className="text-sm text-muted-foreground">{entry.aiReflection}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {entry.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">AI Insights</h4>
                    <div className="space-y-1">
                      {entry.insights.map((insight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Journal Entries Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start your learning journey by creating your first journal entry.'
                }
              </p>
              {!searchQuery && filterType === 'all' && (
                <Button onClick={() => setShowNewEntry(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create First Entry
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </div>
  );
};

export default StudyJournal;