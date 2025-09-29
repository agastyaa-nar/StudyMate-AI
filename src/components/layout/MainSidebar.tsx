import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Trophy, 
  BookOpen, 
  Brain,
  Users,
  Settings,
  User,
  Info,
  HelpCircle,
  X,
  ChevronLeft,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';

interface MainSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  todayProgress?: {
    hours: number;
    target: number;
  };
}

const MainSidebar = ({ isOpen, onClose, todayProgress = { hours: 4.2, target: 6.0 } }: MainSidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const { getUnreadNotificationsByFeature } = useNotifications();

  // Get notification counts for each feature
  const getNotificationBadge = (feature: string) => {
    const unreadCount = getUnreadNotificationsByFeature(feature).length;
    if (unreadCount === 0) return null;
    return unreadCount > 9 ? '9+' : unreadCount.toString();
  };

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      description: 'Overview and quick stats',
      badge: getNotificationBadge('dashboard'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Study Planner',
      href: '/planner',
      icon: Target,
      description: 'AI-powered study plans',
      badge: getNotificationBadge('planner') || '3',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Detailed insights',
      badge: getNotificationBadge('analytics'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      description: 'Gamification & streaks',
      badge: getNotificationBadge('achievements') || 'NEW',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Study Journal',
      href: '/journal',
      icon: BookOpen,
      description: 'AI reflections',
      badge: getNotificationBadge('journal'),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Flashcards',
      href: '/flashcards',
      icon: Brain,
      description: 'Knowledge integration',
      badge: getNotificationBadge('flashcards') || '12',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Study Groups',
      href: '/groups',
      icon: Users,
      description: 'Collaboration',
      badge: getNotificationBadge('groups'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-80 bg-background border-r shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">StudyMate AI</h2>
                <p className="text-xs text-muted-foreground">Navigation</p>
              </div>
            </div>
            {/* FIXED: Removed lg:hidden to show button on all screen sizes */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="p-4 border-b">
          <Card className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Today's Progress</span>
                  <span className="text-muted-foreground">
                    {todayProgress.hours}/{todayProgress.target}h
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(todayProgress.hours / todayProgress.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link key={item.href} to={item.href} onClick={onClose}>
                  <Button
                    variant={active ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-3 h-auto p-3 ${
                      active 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      active ? 'bg-white/20' : item.bgColor
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        active ? 'text-white' : item.color
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge 
                            variant={item.badge === 'NEW' ? 'default' : 'secondary'} 
                            className={`text-xs ${
                              active ? 'bg-white text-blue-600' : ''
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="p-4 border-t">
          <div className="space-y-3">
            {/* User Profile */}
            <Link to="/profile" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  {getUserInitials()}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">
                    {user?.user_metadata?.full_name || 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    View Profile
                  </div>
                </div>
              </Button>
            </Link>

            <Separator />

            {/* Quick Actions */}
            <div className="space-y-1">
              <Link to="/settings" onClick={onClose}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Link to="/about" onClick={onClose}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Info className="h-4 w-4" />
                  About
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSidebar;