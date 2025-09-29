import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { 
  Popover,
  PopoverContent, 
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Trophy, 
  BookOpen, 
  Brain,
  Users,
  Search,
  Menu,
  X,
  ChevronDown,
  Zap,
  Clock,
  TrendingUp,
  Star,
  Plus,
  Settings,
  User,
  LogOut,
  GraduationCap,
  MessageCircle,
  Info,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationBell from './NotificationBell';

interface ModernNavbarProps {
  onToggleMainSidebar?: () => void; 
  onToggleAISidebar?: () => void;   
  todayProgress?: {
    hours: number;
    target: number;
  };
}

const ModernNavbar = ({ 
  onToggleMainSidebar, 
  onToggleAISidebar,
  todayProgress = { hours: 4.2, target: 6.0 } 
}: ModernNavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickActions = [
    { title: 'Add Study Session', icon: Plus, action: () => navigate('/planner') },
    { title: 'View Analytics', icon: TrendingUp, action: () => navigate('/analytics') },
    { title: 'Create Flashcard', icon: Brain, action: () => navigate('/flashcards') },
    { title: 'Join Study Group', icon: Users, action: () => navigate('/groups') }
  ];

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

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b shadow-sm' 
        : 'bg-background/80 backdrop-blur-sm border-b'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Main Sidebar Toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleMainSidebar}
            className="flex items-center gap-2"
          >
            <Menu className="h-4 w-4" />
            <span className="hidden sm:inline">Menu</span>
          </Button>

          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyMate AI
              </h1>
              <p className="text-xs text-muted-foreground">Intelligent Learning Platform</p>
            </div>
          </div>

          

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span className="text-muted-foreground">Search features...</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search features..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No features found.</CommandEmpty>
                    <CommandGroup heading="Quick Actions">
                      {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                          <CommandItem
                            key={index}
                            onSelect={() => {
                              action.action();
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center gap-3 p-3"
                          >
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span>{action.title}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Progress Indicator - Compact */}
            <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-muted/50 rounded-lg">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <div className="text-xs">
                <span className="font-medium">{todayProgress.hours}</span>
                <span className="text-muted-foreground">/{todayProgress.target}h</span>
              </div>
              <div className="w-12 bg-muted rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(todayProgress.hours / todayProgress.target) * 100}%` }}
                />
              </div>
            </div>

            {/* Notifications */}
            <NotificationBell />

            {/* AI Chat - Compact */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggleAISidebar}
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">AI</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative p-0 rounded-full h-8 w-8">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {getUserInitials()}
                  </div>
                </Button>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">
                      {user?.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/about')}>
                  <Info className="mr-2 h-4 w-4" />
                  <span>About</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernNavbar;
