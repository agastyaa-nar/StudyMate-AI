import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement' | 'reminder' | 'update';
  title: string;
  message: string;
  feature: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initialize with sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'achievement',
        title: '🎉 Streak Milestone!',
        message: 'You\'ve maintained a 7-day study streak! Keep it up!',
        feature: 'achievements',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actionUrl: '/achievements',
        icon: '🏆'
      },
      {
        id: '2',
        type: 'reminder',
        title: '📚 Study Session Reminder',
        message: 'Your scheduled study session for Mathematics starts in 15 minutes.',
        feature: 'planner',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        actionUrl: '/planner',
        icon: '⏰'
      },
      {
        id: '3',
        type: 'update',
        title: '📊 New Analytics Available',
        message: 'Your weekly study report is ready. Check your progress insights!',
        feature: 'analytics',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        read: false,
        actionUrl: '/analytics',
        icon: '📈'
      },
      {
        id: '4',
        type: 'info',
        title: '🧠 Flashcard Review',
        message: 'You have 12 flashcards ready for review. Don\'t forget to practice!',
        feature: 'flashcards',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        read: true,
        actionUrl: '/flashcards',
        icon: '💡'
      },
      {
        id: '5',
        type: 'success',
        title: '✅ Study Goal Completed',
        message: 'Congratulations! You\'ve completed your daily study goal of 6 hours.',
        feature: 'dashboard',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: true,
        actionUrl: '/',
        icon: '🎯'
      },
      {
        id: '6',
        type: 'warning',
        title: '⚠️ Study Group Invitation',
        message: 'You have 2 pending invitations to join study groups.',
        feature: 'groups',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: false,
        actionUrl: '/groups',
        icon: '👥'
      }
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      return prev.filter(n => n.id !== notificationId);
    });
  };

  const getNotificationsByFeature = (feature: string) => {
    return notifications.filter(n => n.feature === feature);
  };

  const getUnreadNotificationsByFeature = (feature: string) => {
    return notifications.filter(n => n.feature === feature && !n.read);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
    getNotificationsByFeature,
    getUnreadNotificationsByFeature
  };
};
