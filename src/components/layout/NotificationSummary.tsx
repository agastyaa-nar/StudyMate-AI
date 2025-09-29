import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Trophy, 
  Clock, 
  BarChart3, 
  Brain, 
  Users, 
  BookOpen, 
  Target,
  LayoutDashboard,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Link } from 'react-router-dom';

const NotificationSummary = () => {
  const { notifications, unreadCount, getUnreadNotificationsByFeature } = useNotifications();

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'dashboard':
        return <LayoutDashboard className="h-4 w-4" />;
      case 'planner':
        return <Target className="h-4 w-4" />;
      case 'analytics':
        return <BarChart3 className="h-4 w-4" />;
      case 'achievements':
        return <Trophy className="h-4 w-4" />;
      case 'journal':
        return <BookOpen className="h-4 w-4" />;
      case 'flashcards':
        return <Brain className="h-4 w-4" />;
      case 'groups':
        return <Users className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getFeatureName = (feature: string) => {
    switch (feature) {
      case 'dashboard':
        return 'Dashboard';
      case 'planner':
        return 'Study Planner';
      case 'analytics':
        return 'Analytics';
      case 'achievements':
        return 'Achievements';
      case 'journal':
        return 'Study Journal';
      case 'flashcards':
        return 'Flashcards';
      case 'groups':
        return 'Study Groups';
      default:
        return feature;
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="h-3 w-3 text-yellow-500" />;
      case 'reminder':
        return <Clock className="h-3 w-3 text-blue-500" />;
      case 'update':
        return <BarChart3 className="h-3 w-3 text-purple-500" />;
      case 'success':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-3 w-3 text-orange-500" />;
      default:
        return <Bell className="h-3 w-3 text-gray-500" />;
    }
  };

  const recentNotifications = notifications.slice(0, 3);
  const featuresWithNotifications = ['dashboard', 'planner', 'analytics', 'achievements', 'journal', 'flashcards', 'groups']
    .map(feature => ({
      feature,
      count: getUnreadNotificationsByFeature(feature).length
    }))
    .filter(item => item.count > 0);

  if (unreadCount === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-green-50 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">All caught up!</h3>
            <p className="text-sm text-gray-500">No new notifications</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {unreadCount} new
          </Badge>
        </div>
        <Link to="/notifications">
          <Button variant="ghost" size="sm" className="text-blue-600">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Features with notifications */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {featuresWithNotifications.map(({ feature, count }) => (
          <Link key={feature} to={`/${feature === 'dashboard' ? '' : feature}`}>
            <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-2">
                {getFeatureIcon(feature)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getFeatureName(feature)}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {count} new
                  </Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent notifications */}
      <Card className="p-4">
        <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
        <ScrollArea className="max-h-64 pr-2">
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      {getFeatureName(notification.feature)}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default NotificationSummary;
