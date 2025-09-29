import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Search, 
  Settings, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Trophy,
  Crown,
  UserPlus,
  MoreHorizontal,
  Clock,
  Target,
  Brain
} from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  subject: string;
  memberCount: number;
  maxMembers: number;
  isPrivate: boolean;
  isOwner: boolean;
  lastActivity: string;
  studyGoal: string;
  progress: number;
  members: Member[];
  upcomingSessions: Session[];
}

interface Member {
  id: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  studyHours: number;
  streak: number;
  isOnline: boolean;
}

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'study' | 'quiz' | 'discussion';
}

const StudyGroups = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('my-groups');

  // Mock data - replace with actual data from your backend
  const myGroups: Group[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      description: 'Master calculus and linear algebra together',
      subject: 'Mathematics',
      memberCount: 8,
      maxMembers: 12,
      isPrivate: false,
      isOwner: true,
      lastActivity: '2 hours ago',
      studyGoal: 'Complete Calculus II by end of semester',
      progress: 75,
      members: [
        { id: '1', name: 'You', avatar: '', role: 'owner', studyHours: 45, streak: 12, isOnline: true },
        { id: '2', name: 'Sarah Chen', avatar: '', role: 'admin', studyHours: 38, streak: 8, isOnline: true },
        { id: '3', name: 'Mike Johnson', avatar: '', role: 'member', studyHours: 32, streak: 5, isOnline: false },
        { id: '4', name: 'Emma Wilson', avatar: '', role: 'member', studyHours: 28, streak: 3, isOnline: true },
      ],
      upcomingSessions: [
        { id: '1', title: 'Integration Techniques', date: '2024-01-15', time: '14:00', duration: '2h', type: 'study' },
        { id: '2', title: 'Practice Quiz', date: '2024-01-17', time: '16:00', duration: '1h', type: 'quiz' },
      ]
    },
    {
      id: '2',
      name: 'Computer Science Study Group',
      description: 'Data structures and algorithms study group',
      subject: 'Computer Science',
      memberCount: 15,
      maxMembers: 20,
      isPrivate: true,
      isOwner: false,
      lastActivity: '1 day ago',
      studyGoal: 'Prepare for technical interviews',
      progress: 60,
      members: [
        { id: '5', name: 'Alex Rodriguez', avatar: '', role: 'owner', studyHours: 52, streak: 15, isOnline: false },
        { id: '6', name: 'You', avatar: '', role: 'member', studyHours: 40, streak: 12, isOnline: true },
        { id: '7', name: 'Lisa Park', avatar: '', role: 'admin', studyHours: 48, streak: 10, isOnline: true },
      ],
      upcomingSessions: [
        { id: '3', title: 'Binary Trees Discussion', date: '2024-01-16', time: '19:00', duration: '1.5h', type: 'discussion' },
      ]
    }
  ];

  const publicGroups: Group[] = [
    {
      id: '3',
      name: 'Physics Study Circle',
      description: 'Quantum mechanics and thermodynamics',
      subject: 'Physics',
      memberCount: 6,
      maxMembers: 15,
      isPrivate: false,
      isOwner: false,
      lastActivity: '3 hours ago',
      studyGoal: 'Master quantum mechanics concepts',
      progress: 40,
      members: [],
      upcomingSessions: []
    },
    {
      id: '4',
      name: 'Language Learning Exchange',
      description: 'Practice Spanish and French together',
      subject: 'Languages',
      memberCount: 12,
      maxMembers: 25,
      isPrivate: false,
      isOwner: false,
      lastActivity: '5 hours ago',
      studyGoal: 'Achieve conversational fluency',
      progress: 55,
      members: [],
      upcomingSessions: []
    }
  ];

  const filteredGroups = (activeTab === 'my-groups' ? myGroups : publicGroups).filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="h-3 w-3 text-yellow-500" />;
      case 'admin': return <Settings className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'quiz': return <Brain className="h-4 w-4 text-green-500" />;
      case 'discussion': return <MessageCircle className="h-4 w-4 text-purple-500" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              Study Groups
            </h1>
            <p className="text-muted-foreground mt-1">
              Collaborate, learn, and achieve your study goals together
            </p>
          </div>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Study Group</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Group Name</label>
                    <Input placeholder="Enter group name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="e.g., Mathematics, Computer Science" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Describe your study group" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Group</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
            <TabsTrigger value="public-groups">Public Groups ({publicGroups.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups" className="space-y-4">
            {filteredGroups.length === 0 ? (
              <Card className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No groups found</h3>
                <p className="text-muted-foreground">Create your first study group to get started!</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGroups.map((group) => (
                  <Card key={group.id} className="p-6 shadow-card hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      {/* Group Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{group.name}</h3>
                            {group.isPrivate && <Badge variant="secondary">Private</Badge>}
                            {group.isOwner && <Badge variant="default">Owner</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {group.memberCount}/{group.maxMembers} members
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {group.lastActivity}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            Study Goal
                          </span>
                          <span className="font-medium">{group.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${group.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">{group.studyGoal}</p>
                      </div>

                      {/* Members */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Members</h4>
                        <div className="flex flex-wrap gap-2">
                          {group.members.slice(0, 4).map((member) => (
                            <div key={member.id} className="flex items-center gap-2 bg-muted/50 rounded-full px-2 py-1">
                              <div className="relative">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                {member.isOnline && (
                                  <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-green-500 rounded-full border border-background"></div>
                                )}
                              </div>
                              <span className="text-xs font-medium">{member.name}</span>
                              {getRoleIcon(member.role)}
                            </div>
                          ))}
                          {group.members.length > 4 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              +{group.members.length - 4} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Upcoming Sessions */}
                      {group.upcomingSessions.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Upcoming Sessions</h4>
                          <div className="space-y-1">
                            {group.upcomingSessions.slice(0, 2).map((session) => (
                              <div key={session.id} className="flex items-center gap-2 text-xs bg-muted/30 rounded px-2 py-1">
                                {getSessionIcon(session.type)}
                                <span className="font-medium">{session.title}</span>
                                <span className="text-muted-foreground">
                                  {session.date} at {session.time}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="public-groups" className="space-y-4">
            {filteredGroups.length === 0 ? (
              <Card className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No public groups found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGroups.map((group) => (
                  <Card key={group.id} className="p-6 shadow-card hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      {/* Group Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{group.name}</h3>
                            {group.isPrivate && <Badge variant="secondary">Private</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {group.memberCount}/{group.maxMembers} members
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {group.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            Study Goal
                          </span>
                          <span className="font-medium">{group.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${group.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">{group.studyGoal}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <UserPlus className="h-4 w-4 mr-1" />
                          Join Group
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
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

export default StudyGroups;
