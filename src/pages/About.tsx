import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Heart,
  Code,
  Users,
  Award,
  Calendar,
  Globe,
  MessageCircle,
  Star,
  Instagram
} from 'lucide-react';

const About = () => {
  const creatorInfo = {
    name: "Dhanar Agastya Rakalangi",
    role: "Full Stack Developer",
    email: "agastyadhanar@gmail.com",
    phone: "+62 857-5545-0076",
    location: "Surabaya, Indonesia",
    github: "https://github.com/agastyaa-nar",
    linkedin: "https://www.linkedin.com/in/dhanaragastya/",
    Instagram: "https://twitter.com/dhanar_aditya",
    bio: "Passionate developer with 1 years of experience in web development, and educational technology. Dedicated to creating innovative solutions that enhance learning experiences.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AI/ML", "Supabase", "PostgreSQL"],
    joinDate: "January 2024"
  };

  const projectInfo = {
    name: "StudyMate AI",
    version: "1.0.0",
    description: "An intelligent learning platform powered by AI to help students optimize their study habits and achieve academic success.",
    features: [
      "AI-powered study planning",
      "Intelligent analytics and insights",
      "Gamified learning experience",
      "Collaborative study groups",
      "Smart flashcard system",
      "Progress tracking and achievements"
    ],
    techStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "IBM Granite AI",
      "Lucide React"
    ]
  };

  const teamMembers = [
    {
      name: "Dhanar Agastya Rakalangi",
      role: "Lead Developer & Founder",
      avatar: "DA",
      description: "Full-stack developer with expertise in AI integration and educational technology."
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About StudyMate AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          An intelligent learning platform designed to revolutionize how students study, 
          learn, and achieve their academic goals through AI-powered insights and personalized experiences.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Star className="h-3 w-3 mr-1" />
            Version {projectInfo.version}
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Calendar className="h-3 w-3 mr-1" />
            Launched {projectInfo.joinDate}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{projectInfo.description}</p>
              
              <div>
                <h4 className="font-semibold mb-2">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {projectInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {projectInfo.techStack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Meet the Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <p className="text-sm">{member.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Get in touch for support, feedback, or collaboration opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{creatorInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{creatorInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{creatorInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <p className="text-sm text-muted-foreground">study-mate-ai</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Social Media & Links</h4>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Creator Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Creator Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  DA
                </div>
                <h3 className="font-semibold">{creatorInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{creatorInfo.role}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-1">
                  {creatorInfo.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Project Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Version</span>
                <Badge variant="outline">{projectInfo.version}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Launched</span>
                <span className="text-sm text-muted-foreground">{projectInfo.joinDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Users</span>
                <span className="text-sm text-muted-foreground">1,000+</span>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Report Bug
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Give Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t">
        <p className="text-sm text-muted-foreground">
          Made with <Heart className="h-4 w-4 inline text-red-500" /> by {creatorInfo.name} • 
          StudyMate AI © 2025 • All rights reserved
        </p>
      </div>
    </div>
  );
};

export default About;
