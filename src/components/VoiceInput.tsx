import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

export const VoiceInput = ({ onTranscription, disabled = false }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported(
      'MediaRecorder' in window &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    );

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });
      
      streamRef.current = stream;
      
      // Set up audio analysis for visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyseAudio();
      
      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        // Clean up
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording Started 🎤",
        description: "Speak clearly into your microphone",
      });
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  const analyseAudio = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateLevel = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      setAudioLevel(Math.min(100, (average / 255) * 100));
      
      if (isRecording) {
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      // Simulate speech-to-text processing
      // In a real implementation, you would send this to a speech recognition service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock transcription result
      const mockTranscriptions = [
        "I studied calculus for 2 hours today and worked on integration problems. The session was challenging but I made good progress on understanding substitution methods.",
        "Had a productive physics study session focusing on quantum mechanics. Spent 90 minutes reviewing wave functions and probability distributions.",
        "Chemistry organic reactions session went well. Practiced naming compounds and understanding reaction mechanisms for about 1.5 hours.",
        "Computer science data structures study. Implemented binary trees and practiced traversal algorithms. Very satisfying when the code finally worked correctly."
      ];
      
      const transcription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      
      onTranscription(transcription);
      
      toast({
        title: "Transcription Complete ✨",
        description: "Your voice recording has been converted to text",
      });
      
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Processing Error",
        description: "Could not process audio recording",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <MicOff className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Voice input is not supported in your browser
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled || isProcessing}
          size="lg"
          variant={isRecording ? "destructive" : "default"}
          className="gap-2 relative overflow-hidden"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : isRecording ? (
            <>
              <Square className="h-4 w-4" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Start Voice Input
            </>
          )}
        </Button>
      </div>

      {(isRecording || isProcessing) && (
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Badge variant={isRecording ? "destructive" : "default"}>
              {isRecording ? "Recording" : "Processing"}
            </Badge>
            {isRecording && (
              <Badge variant="outline">
                {formatTime(recordingTime)}
              </Badge>
            )}
          </div>
          
          {isRecording && (
            <div className="w-48 mx-auto">
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-primary rounded-full transition-all duration-150 ${
                      audioLevel > (i * 10) ? 'h-6' : 'h-2'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Audio level: {Math.round(audioLevel)}%
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="text-xs text-muted-foreground">
              Converting speech to text...
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-muted-foreground text-center max-w-xs">
        Click to start voice recording. Speak clearly about your study session.
      </div>
    </div>
  );
};