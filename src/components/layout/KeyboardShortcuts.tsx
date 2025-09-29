import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const KeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.contentEditable === 'true'
      ) {
        return;
      }

      // Check for Cmd/Ctrl + K for search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        // Focus search input (this would need to be implemented in the navbar)
        toast({
          title: "Search",
          description: "Use the search bar in the navigation to find features",
        });
        return;
      }

      // Check for Cmd/Ctrl + number keys for quick navigation
      if ((event.metaKey || event.ctrlKey) && event.key >= '1' && event.key <= '7') {
        event.preventDefault();
        const routes = [
          '/',           // 1 - Dashboard
          '/planner',    // 2 - Study Planner
          '/analytics',  // 3 - Analytics
          '/achievements', // 4 - Achievements
          '/journal',    // 5 - Study Journal
          '/flashcards', // 6 - Flashcards
          '/groups'      // 7 - Study Groups
        ];
        
        const routeIndex = parseInt(event.key) - 1;
        if (routes[routeIndex]) {
          navigate(routes[routeIndex]);
          toast({
            title: "Quick Navigation",
            description: `Navigated to ${routes[routeIndex] === '/' ? 'Dashboard' : routes[routeIndex].slice(1)}`,
          });
        }
        return;
      }

      // Check for Escape key to close modals/sidebars
      if (event.key === 'Escape') {
        // This would need to be implemented with context or props
        // For now, just show a toast
        toast({
          title: "Escape",
          description: "Press Escape to close modals and sidebars",
        });
        return;
      }

      // Check for 'h' key for help
      if (event.key === 'h' || event.key === 'H') {
        event.preventDefault();
        toast({
          title: "Keyboard Shortcuts",
          description: "⌘K: Search | ⌘1-7: Quick Navigation | H: Help | Esc: Close",
        });
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate, toast]);

  return null; // This component doesn't render anything
};

export default KeyboardShortcuts;
