import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Target, 
  Brain, 
  Users, 
  BookOpen,
  BarChart3,
  Zap,
  X,
  Bell,
  Trophy,
  Clock
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { getUnreadNotificationsByFeature } = useNotifications();

  const getNotificationBadge = (feature: string) => {
    const count = getUnreadNotificationsByFeature(feature).length;
    return count > 0 ? count.toString() : null;
  };

  const quickActions = [
    {
      title: 'New Study Session',
      description: 'Log your study time',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => navigate('/planner'),
      badge: getNotificationBadge('planner') || 'Popular',
      badgeType: getNotificationBadge('planner') ? 'notification' : 'info'
    },
    {
      title: 'Create Flashcard',
      description: 'Add new knowledge',
      icon: Brain,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      action: () => navigate('/flashcards'),
      badge: getNotificationBadge('flashcards'),
      badgeType: 'notification'
    },
    {
      title: 'Join Study Group',
      description: 'Collaborate with peers',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => navigate('/groups'),
      badge: getNotificationBadge('groups'),
      badgeType: 'notification'
    },
    {
      title: 'Write Journal',
      description: 'Reflect on learning',
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      action: () => navigate('/journal'),
      badge: getNotificationBadge('journal'),
      badgeType: 'notification'
    },
    {
      title: 'View Analytics',
      description: 'Check your progress',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => navigate('/analytics'),
      badge: getNotificationBadge('analytics'),
      badgeType: 'notification'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick Actions Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index}
                className="p-3 w-64 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-background/95 backdrop-blur-sm border shadow-lg"
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <Icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{action.title}</span>
                      {action.badge && (
                        <Badge 
                          variant={action.badgeType === 'notification' ? 'default' : 'secondary'} 
                          className={`text-xs ${
                            action.badgeType === 'notification' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
        size="lg"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Plus className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20" />
      )}
    </div>
  );
};

export default FloatingActionButton;
