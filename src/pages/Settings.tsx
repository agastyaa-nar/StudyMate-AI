import { useState } from 'react';
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sun, Moon, Monitor, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Shield, 
  Save,
  Check,
  Database
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      studyReminders: true,
      achievementAlerts: true,
      weeklyReports: false
    },
    appearance: {
      theme: 'system',
      compactMode: false,
      showProgress: true
    },
    privacy: {
      profileVisibility: 'public',
      showActivity: true,
      allowMessages: true
    },
    aiAssistant: {
      autoAnalysis: true,
      smartRecommendations: true,
      patternDetection: false
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getThemeIcon = (themeValue: string) => {
    switch (themeValue) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Check className="h-3 w-3 mr-1" />
              Saved
            </Badge>
          )}
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how StudyMate AI looks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label>Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-32">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {getThemeIcon(theme || "system")}
                    <span className="capitalize">{theme || "System"}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <Sun className="h-4 w-4 mr-2" /> Light
                </SelectItem>
                <SelectItem value="dark">
                  <Moon className="h-4 w-4 mr-2" /> Dark
                </SelectItem>
                <SelectItem value="system">
                  <Monitor className="h-4 w-4 mr-2" /> System
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, [key]: checked }
                  }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            AI Assistant
          </CardTitle>
          <CardDescription>
            Configure how AI helps you study
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(preferences.aiAssistant).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({
                    ...prev,
                    aiAssistant: { ...prev.aiAssistant, [key]: checked }
                  }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>
            Control your privacy and data sharing preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Profile Visibility</Label>
            <div className="flex gap-2">
              {['public', 'friends', 'private'].map((option) => (
                <Button
                  key={option}
                  variant={preferences.privacy.profileVisibility === option ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => 
                    setPreferences(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, profileVisibility: option }
                    }))
                  }
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
