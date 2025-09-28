import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Flame, 
  Target, 
  Brain, 
  Star, 
  Award, 
  Zap, 
  Calendar,
  BookOpen,
  Clock,
  TrendingUp,
  Medal,
  Crown,
  Sparkles
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'streak' | 'hours' | 'subjects' | 'efficiency' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: string;
  points: number;
}

interface Streak {
  current: number;
  longest: number;
  type: 'daily' | 'weekly' | 'monthly';
}

const Achievements = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const streaks: Record<string, Streak> = {
    daily: { current: 12, longest: 15, type: 'daily' },
    weekly: { current: 3, longest: 8, type: 'weekly' },
    monthly: { current: 1, longest: 3, type: 'monthly' }
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Study Warrior',
      description: 'Study for 7 consecutive days',
      icon: <Flame className="h-6 w-6" />,
      category: 'streak',
      rarity: 'common',
      progress: 12,
      maxProgress: 7,
      unlocked: true,
      unlockedDate: '2024-11-14',
      points: 100
    },
    {
      id: '2',
      title: 'Marathon Learner',
      description: 'Complete 50 hours of study time',
      icon: <Clock className="h-6 w-6" />,
      category: 'hours',
      rarity: 'rare',
      progress: 47,
      maxProgress: 50,
      unlocked: false,
      points: 250
    },
    {
      id: '3',
      title: 'Subject Master',
      description: 'Study 5 different subjects in one week',
      icon: <BookOpen className="h-6 w-6" />,
      category: 'subjects',
      rarity: 'common',
      progress: 4,
      maxProgress: 5,
      unlocked: false,
      points: 150
    },
    {
      id: '4',
      title: 'Efficiency Expert',
      description: 'Maintain 90% efficiency for a week',
      icon: <Zap className="h-6 w-6" />,
      category: 'efficiency',
      rarity: 'epic',
      progress: 85,
      maxProgress: 90,
      unlocked: false,
      points: 500
    },
    {
      id: '5',
      title: 'Night Owl',
      description: 'Study after 10 PM for 5 days',
      icon: <Star className="h-6 w-6" />,
      category: 'special',
      rarity: 'rare',
      progress: 2,
      maxProgress: 5,
      unlocked: false,
      points: 200
    },
    {
      id: '6',
      title: 'Early Bird',
      description: 'Study before 7 AM for 5 days',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'special',
      rarity: 'rare',
      progress: 0,
      maxProgress: 5,
      unlocked: false,
      points: 200
    },
    {
      id: '7',
      title: 'Study Legend',
      description: 'Maintain a 30-day study streak',
      icon: <Crown className="h-6 w-6" />,
      category: 'streak',
      rarity: 'legendary',
      progress: 12,
      maxProgress: 30,
      unlocked: false,
      points: 1000
    },
    {
      id: '8',
      title: 'Focus Master',
      description: 'Complete 10 uninterrupted study sessions',
      icon: <Target className="h-6 w-6" />,
      category: 'efficiency',
      rarity: 'epic',
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      points: 400
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-muted text-muted-foreground';
      case 'rare': return 'border-primary text-primary';
      case 'epic': return 'border-accent text-accent';
      case 'legendary': return 'border-warning text-warning bg-warning/5';
      default: return 'border-muted text-muted-foreground';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'rare': return 'bg-primary text-primary-foreground';
      case 'epic': return 'bg-accent text-accent-foreground';
      case 'legendary': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

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
              <Trophy className="h-8 w-8 text-warning" />
              Achievements & Gamification
            </h1>
            <p className="text-muted-foreground">Track your learning milestones and celebrate success</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{totalPoints}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Medal className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{unlockedCount}</p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Flame className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{streaks.daily.current}</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{streaks.daily.longest}</p>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button 
                variant={selectedCategory === 'streak' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('streak')}
              >
                <Flame className="h-4 w-4 mr-1" />
                Streaks
              </Button>
              <Button 
                variant={selectedCategory === 'hours' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('hours')}
              >
                <Clock className="h-4 w-4 mr-1" />
                Hours
              </Button>
              <Button 
                variant={selectedCategory === 'subjects' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('subjects')}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Subjects
              </Button>
              <Button 
                variant={selectedCategory === 'efficiency' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('efficiency')}
              >
                <Zap className="h-4 w-4 mr-1" />
                Efficiency
              </Button>
              <Button 
                variant={selectedCategory === 'special' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('special')}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Special
              </Button>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`shadow-card transition-all duration-300 ${
                    achievement.unlocked ? 'border-primary/50 bg-primary/5' : 'opacity-75'
                  } ${getRarityColor(achievement.rarity)}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {achievement.title}
                            {achievement.unlocked && <Award className="h-4 w-4 text-warning" />}
                          </CardTitle>
                          <Badge variant="secondary" className={getRarityBadgeColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-warning">{achievement.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.min(achievement.progress, achievement.maxProgress)} / {achievement.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(Math.min(achievement.progress, achievement.maxProgress) / achievement.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-xs text-success mt-3 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="streaks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(streaks).map(([type, streak]) => (
                <Card key={type} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 capitalize">
                      <Flame className="h-5 w-5 text-destructive" />
                      {type} Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="p-6 bg-gradient-primary/10 rounded-lg border border-primary/20">
                        <p className="text-3xl font-bold text-primary">{streak.current}</p>
                        <p className="text-sm text-muted-foreground">Current Streak</p>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Personal Best</span>
                        <span className="font-semibold">{streak.longest} {type === 'daily' ? 'days' : type === 'weekly' ? 'weeks' : 'months'}</span>
                      </div>
                      
                      <Progress 
                        value={(streak.current / streak.longest) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Streak Calendar */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Study Streak Calendar
                </CardTitle>
                <CardDescription>Visual representation of your daily study consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-xs font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  
                  {Array.from({ length: 35 }, (_, i) => {
                    const hasStudied = Math.random() > 0.3; // Mock data
                    const isToday = i === 20; // Mock today
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded flex items-center justify-center text-xs border ${
                          hasStudied 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-muted border-muted'
                        } ${isToday ? 'ring-2 ring-accent' : ''}`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded"></div>
                    <span>Study Day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded"></div>
                    <span>No Study</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded ring-2 ring-accent"></div>
                    <span>Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-warning" />
                  Weekly Leaderboard
                </CardTitle>
                <CardDescription>See how you rank among other students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Alex Johnson', hours: 42.5, points: 2850, avatar: 'AJ' },
                    { rank: 2, name: 'You', hours: 35.2, points: 2100, avatar: 'YU', isUser: true },
                    { rank: 3, name: 'Sarah Chen', hours: 33.8, points: 1950, avatar: 'SC' },
                    { rank: 4, name: 'Mike Rodriguez', hours: 29.1, points: 1720, avatar: 'MR' },
                    { rank: 5, name: 'Emma Thompson', hours: 27.6, points: 1580, avatar: 'ET' }
                  ].map((user) => (
                    <div 
                      key={user.rank} 
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        user.isUser ? 'bg-primary/10 border-primary/20' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1 ? 'bg-warning text-warning-foreground' :
                          user.rank === 2 ? 'bg-primary text-primary-foreground' :
                          user.rank === 3 ? 'bg-accent text-accent-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.rank}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                          {user.avatar}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.hours}h this week</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-warning">{user.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </div>
  );
};

export default Achievements;