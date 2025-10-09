// src/components/StudyLogInput.tsx - Simplified and Functional
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudyLogs } from '@/hooks/useStudyLogs';
import { useSubjects } from '@/hooks/useSubjects';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2, CheckCircle } from 'lucide-react';

export function StudyLogInput() {
  const { subjects } = useSubjects();
  const { createLog } = useStudyLogs();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        title: 'Missing Information',
        description: 'Please select a subject and enter study hours.',
        variant: 'destructive',
      });
      return;
    }

    if (parseFloat(formData.hours) <= 0) {
      toast({
        title: 'Invalid Hours',
        description: 'Study hours must be greater than 0.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await createLog({
        subject_id: formData.subject_id,
        date: formData.date,
        hours: parseFloat(formData.hours),
        efficiency: formData.efficiency ? parseInt(formData.efficiency) : null,
        notes: formData.notes || null,
      });

      const selectedSubject = subjects.find(s => s.id === formData.subject_id);
      
      toast({
        title: 'Study Session Logged! 🎉',
        description: `${formData.hours}h logged for ${selectedSubject?.name || 'Selected Subject'}`,
      });

      setSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          subject_id: '',
          date: new Date().toISOString().split('T')[0],
          hours: '',
          efficiency: '',
          notes: '',
        });
        setSuccess(false);
      }, 2000);

    } catch (error: any) {
      toast({
        title: 'Failed to Log Session',
        description: 'Please try again. If the problem persists, contact support.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject *</label>
            <Select 
              value={formData.subject_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, subject_id: value }))}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        {subject.name}
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-subjects" disabled>
                    No subjects available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              disabled={loading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Hours *</label>
            <Input
              type="number"
              step="0.25"
              min="0.25"
              max="12"
              placeholder="2.5"
              value={formData.hours}
              onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
              disabled={loading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Efficiency</label>
            <Input
              type="number"
              min="1"
              max="10"
              placeholder="8"
              value={formData.efficiency}
              onChange={(e) => setFormData(prev => ({ ...prev, efficiency: e.target.value }))}
              disabled={loading}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
          <Textarea
            placeholder="What did you study? Any key takeaways or challenges?"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            disabled={loading}
            rows={3}
            className="w-full"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full sm:w-auto" 
          disabled={loading || success}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging Session...
            </>
          ) : success ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Session Logged!
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Log Study Session
            </>
          )}
        </Button>
      </form>
    </div>
  );
}