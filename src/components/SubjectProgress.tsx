// src/components/SubjectProgress.tsx - Updated with Supabase
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useSubjects } from '@/hooks/useSubjects';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function SubjectProgress() {
  const { subjects, createSubject, updateSubject, deleteSubject, loading } = useSubjects();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3b82f6',
    target_hours: '',
  });

  const handleCreateSubject = async () => {
    if (!formData.name || !formData.target_hours) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createSubject({
        name: formData.name,
        color: formData.color,
        target_hours: parseFloat(formData.target_hours),
      });

      toast({
        title: 'Subject created! 📖',
        description: `${formData.name} has been added to your subjects.`,
      });

      setFormData({ name: '', color: '#3b82f6', target_hours: '' });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Failed to create subject',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSubject = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await deleteSubject(id);
      toast({
        title: 'Subject deleted',
        description: `${name} has been removed.`,
      });
    } catch (error: any) {
      toast({
        title: 'Failed to delete subject',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Subjects</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Name</label>
                <Input
                  placeholder="e.g., Mathematics"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Hours</label>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="20"
                  value={formData.target_hours}
                  onChange={(e) => setFormData(prev => ({ ...prev, target_hours: e.target.value }))}
                />
              </div>
              <Button onClick={handleCreateSubject} className="w-full">
                Create Subject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {subjects.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No subjects yet. Add your first subject to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => {
            const progress = subject.target_hours > 0 
              ? (subject.completed_hours / subject.target_hours) * 100 
              : 0;

            return (
              <Card key={subject.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSubject(subject.id, subject.name)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {subject.completed_hours.toFixed(1)}h / {subject.target_hours}h
                      </span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">
                      {progress.toFixed(0)}% Complete
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}