import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Trophy, 
  BookOpen, 
  Brain,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

interface NavigationProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Navigation = ({ collapsed = false, onToggleCollapse }: NavigationProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      description: 'Overview and quick stats',
      badge: null
    },
    {
      title: 'Study Planner',
      href: '/planner',
      icon: Target,
      description: 'AI-powered study plans',
      badge: '3' // Active plans
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Detailed insights',
      badge: null
    },
    {
      title: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      description: 'Gamification & streaks',
      badge: 'NEW'
    },
    {
      title: 'Study Journal',
      href: '/journal',
      icon: BookOpen,
      description: 'AI reflections',
      badge: null
    },
    {
      title: 'Flashcards',
      href: '/flashcards',
      icon: Brain,
      description: 'Knowledge integration',
      badge: '12'
    },
    {
      title: 'Study Groups',
      href: '/groups',
      icon: Users,
      description: 'Collaboration',
      badge: null
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-background border-r sticky top-0 h-screen overflow-y-auto`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-lg">Study Tracker</h2>
              <p className="text-xs text-muted-foreground">AI-Powered Learning</p>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={active ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 h-auto p-3 ${
                    collapsed ? 'px-3' : 'px-3'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge 
                            variant={item.badge === 'NEW' ? 'default' : 'secondary'} 
                            className="text-xs px-1.5 py-0.5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats (when not collapsed) */}
        {!collapsed && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-sm mb-3">Today's Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Study Hours</span>
                <span className="font-medium">4.2 / 6.0</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[70%] transition-all duration-300"></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Streak</span>
                <span className="font-medium">12 days</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Cards Reviewed</span>
                <span className="font-medium">8 / 15</span>
              </div>
            </div>
          </div>
        )}

        {/* AI Tip (when not collapsed) */}
        {!collapsed && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-start gap-2">
              <Brain className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium text-primary">AI Tip</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your focus is 23% higher in the morning. Schedule challenging topics before 11 AM.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;