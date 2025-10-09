// src/components/SubjectProgress.tsx - Simplified and Functional
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useSubjects } from '@/hooks/useSubjects';
import { useStudyLogs } from '@/hooks/useStudyLogs';
import { Plus, Loader2, BookOpen } from 'lucide-react';
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
  const { subjects, createSubject, loading } = useSubjects();
  const { logs } = useStudyLogs();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3b82f6',
  });

  // Calculate total hours per subject from study logs
  const getSubjectHours = (subjectId: string) => {
    return logs
      .filter(log => log.subject_id === subjectId)
      .reduce((total, log) => total + (log.hours || 0), 0);
  };

  const handleCreateSubject = async () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Subject Name Required',
        description: 'Please enter a subject name.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createSubject({
        name: formData.name.trim(),
        color: formData.color,
      });

      toast({
        title: 'Subject Added! 📚',
        description: `${formData.name} has been added to your subjects.`,
      });

      setFormData({ name: '', color: '#3b82f6' });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Failed to Add Subject',
        description: 'Please try again. If the problem persists, contact support.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Your Subjects</h3>
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
                <label className="text-sm font-medium text-gray-700">Subject Name</label>
                <Input
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Color</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: formData.color }}
                  />
                </div>
              </div>
              <Button onClick={handleCreateSubject} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Subjects Yet</h3>
          <p className="text-gray-600 mb-4">Add your first subject to start tracking your study progress.</p>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Subject
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {subjects.map((subject) => {
            const totalHours = getSubjectHours(subject.id);
            const weeklyTarget = 10; // Default weekly target
            const progress = (totalHours / weeklyTarget) * 100;

            return (
              <div key={subject.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <h4 className="font-medium text-gray-900">{subject.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{totalHours.toFixed(1)}h</p>
                    <p className="text-xs text-gray-500">Total Study Time</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Weekly Progress</span>
                    <span>{Math.min(progress, 100).toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={Math.min(progress, 100)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{totalHours.toFixed(1)}h studied</span>
                    <span>{weeklyTarget}h weekly target</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}