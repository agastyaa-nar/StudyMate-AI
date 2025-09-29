import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import ModernNavbar from "@/components/layout/ModernNavbar";
import MainSidebar from "@/components/layout/MainSidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import FloatingActionButton from "@/components/layout/FloatingActionButton";
import KeyboardShortcuts from "@/components/layout/KeyboardShortcuts";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import StudyJournal from "./pages/StudyJournal";
import Flashcards from "./pages/Flashcards";
import StudyGroups from "./pages/StudyGroups";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false);
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-background">
      <KeyboardShortcuts />
      <ModernNavbar 
        onToggleMainSidebar={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
        onToggleAISidebar={() => setIsAISidebarOpen(!isAISidebarOpen)}   // ✅ tambahkan ini
        todayProgress={{ hours: 4.2, target: 6.0 }}
      />
      <MainSidebar 
        isOpen={isMainSidebarOpen} 
        onClose={() => setIsMainSidebarOpen(false)}
        todayProgress={{ hours: 4.2, target: 6.0 }}
      />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <Sidebar 
        isOpen={isAISidebarOpen} 
        onClose={() => setIsAISidebarOpen(false)} 
      />
      <FloatingActionButton />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthWrapper>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/planner" element={<StudyPlanner />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/journal" element={<StudyJournal />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/groups" element={<StudyGroups />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
