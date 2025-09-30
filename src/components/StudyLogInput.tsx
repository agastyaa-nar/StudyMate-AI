// src/components/StudyLogInput.tsx - Updated with Supabase
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudyLogs } from '@/hooks/useStudyLogs';
import { useSubjects } from '@/hooks/useSubjects';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2 } from 'lucide-react';

export function StudyLogInput() {
  const { subjects } = useSubjects();
  const { createLog } = useStudyLogs();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject_id: '',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    efficiency: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject_id || !formData.hours) {
      toast({
        title: 'Missing information',
        description: 'Please select a subject and enter study hours.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await createLog({
        subject_id: formData.subject_id,
        date: formData.date,
        hours: parseFloat(formData.hours),
        efficiency: formData.efficiency ? parseInt(formData.efficiency) : null,
        notes: formData.notes || null,
      });

      toast({
        title: 'Study log added! 📚',
        description: `${formData.hours} hours recorded for ${subjects.find(s => s.id === formData.subject_id)?.name}`,
      });

      // Reset form
      setFormData({
        subject_id: '',
        date: new Date().toISOString().split('T')[0],
        hours: '',
        efficiency: '',
        notes: '',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to add study log',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Log Study Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select 
                value={formData.subject_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, subject_id: value }))}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Hours</label>
              <Input
                type="number"
                step="0.5"
                min="0"
                max="24"
                placeholder="2.5"
                value={formData.hours}
                onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Efficiency (Optional)</label>
            <Input
              type="number"
              min="0"
              max="100"
              placeholder="85"
              value={formData.efficiency}
              onChange={(e) => setFormData(prev => ({ ...prev, efficiency: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Textarea
              placeholder="What did you study today?"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Study Log
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}