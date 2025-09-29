import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  Plus, 
  Shuffle, 
  RotateCcw, 
  Check, 
  X, 
  Star,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Eye,
  Trophy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastery: number;
  lastReviewed: string;
  created: string;
  tags: string[];
  hint?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Flashcards = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('flashcards');
  const [studyMode, setStudyMode] = useState<'browse' | 'study' | 'quiz'>('browse');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      question: 'What is the derivative of sin(x)?',
      answer: 'cos(x)',
      subject: 'Mathematics',
      difficulty: 'easy',
      mastery: 85,
      lastReviewed: '2024-11-20',
      created: '2024-11-10',
      tags: ['calculus', 'derivatives', 'trigonometry'],
      hint: 'Think about the basic trigonometric derivatives'
    },
    {
      id: '2',
      question: 'Explain the concept of quantum superposition',
      answer: 'Quantum superposition is the principle that quantum systems can exist in multiple states simultaneously until measured. For example, an electron can be in multiple energy states at once.',
      subject: 'Physics',
      difficulty: 'hard',
      mastery: 45,
      lastReviewed: '2024-11-19',
      created: '2024-11-08',
      tags: ['quantum mechanics', 'superposition', 'wave function']
    },
    {
      id: '3',
      question: 'What is Big O notation?',
      answer: 'Big O notation describes the upper bound of an algorithm\'s time or space complexity in the worst case, expressing how the runtime grows relative to input size.',
      subject: 'Computer Science',
      difficulty: 'medium',
      mastery: 70,
      lastReviewed: '2024-11-21',
      created: '2024-11-15',
      tags: ['algorithms', 'complexity', 'analysis']
    },
    {
      id: '4',
      question: 'What is the molecular formula for glucose?',
      answer: 'C₆H₁₂O₆',
      subject: 'Chemistry',
      difficulty: 'easy',
      mastery: 95,
      lastReviewed: '2024-11-18',
      created: '2024-11-12',
      tags: ['organic chemistry', 'carbohydrates', 'biochemistry']
    }
  ]);

  const [quizQuestions] = useState<QuizQuestion[]>([
    {
      id: '1',
      question: 'Which of the following is the correct formula for the area of a circle?',
      options: ['πr²', '2πr', 'πd', 'r²'],
      correctAnswer: 0,
      explanation: 'The area of a circle is π times the radius squared (πr²).',
      subject: 'Mathematics',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'What is the speed of light in vacuum?',
      options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'],
      correctAnswer: 0,
      explanation: 'The speed of light in vacuum is approximately 3 × 10⁸ meters per second.',
      subject: 'Physics',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'Which data structure follows LIFO (Last In, First Out) principle?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 1,
      explanation: 'A stack follows the LIFO principle where the last element added is the first one to be removed.',
      subject: 'Computer Science',
      difficulty: 'easy'
    }
  ]);

  const [newCard, setNewCard] = useState({
    question: '',
    answer: '',
    subject: '',
    difficulty: 'medium' as const,
    tags: '',
    hint: ''
  });

  const filteredCards = selectedSubject === 'all' 
    ? flashcards 
    : flashcards.filter(card => card.subject === selectedSubject);

  const subjects = Array.from(new Set(flashcards.map(card => card.subject)));

  const createFlashcard = () => {
    if (!newCard.question || !newCard.answer) {
      toast({
        title: "Missing Information",
        description: "Please fill in both question and answer fields.",
        variant: "destructive"
      });
      return;
    }

    const card: Flashcard = {
      id: Date.now().toString(),
      question: newCard.question,
      answer: newCard.answer,
      subject: newCard.subject || 'General',
      difficulty: newCard.difficulty,
      mastery: 0,
      lastReviewed: new Date().toISOString().split('T')[0],
      created: new Date().toISOString().split('T')[0],
      tags: newCard.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      hint: newCard.hint || undefined
    };

    setFlashcards(prev => [card, ...prev]);
    setNewCard({
      question: '',
      answer: '',
      subject: '',
      difficulty: 'medium',
      tags: '',
      hint: ''
    });
    setShowCreateCard(false);

    toast({
      title: "Flashcard Created! 🎯",
      description: "Your new flashcard has been added to your collection.",
    });
  };

  const generateAIFlashcards = () => {
    toast({
      title: "AI Flashcards Generated! 🧠",
      description: "5 new flashcards have been created based on your recent study topics.",
    });

    // Simulate AI-generated flashcards
    const aiCards: Flashcard[] = [
      {
        id: Date.now() + '1',
        question: 'What is the fundamental theorem of calculus?',
        answer: 'The fundamental theorem of calculus connects differentiation and integration, stating that they are inverse operations.',
        subject: 'Mathematics',
        difficulty: 'medium',
        mastery: 0,
        lastReviewed: new Date().toISOString().split('T')[0],
        created: new Date().toISOString().split('T')[0],
        tags: ['calculus', 'fundamental theorem', 'integration']
      },
      {
        id: Date.now() + '2',
        question: 'Explain Newton\'s second law of motion',
        answer: 'F = ma - The force acting on an object equals its mass times its acceleration.',
        subject: 'Physics',
        difficulty: 'easy',
        mastery: 0,
        lastReviewed: new Date().toISOString().split('T')[0],
        created: new Date().toISOString().split('T')[0],
        tags: ['newton', 'force', 'motion']
      }
    ];

    setFlashcards(prev => [...aiCards, ...prev]);
  };

  const updateMastery = (cardId: string, correct: boolean) => {
    setFlashcards(prev => prev.map(card => {
      if (card.id === cardId) {
        const change = correct ? 10 : -5;
        return {
          ...card,
          mastery: Math.max(0, Math.min(100, card.mastery + change)),
          lastReviewed: new Date().toISOString().split('T')[0]
        };
      }
      return card;
    }));
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    setShowAnswer(false);
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFlashcards(prev => {
      const otherCards = prev.filter(card => !filteredCards.includes(card));
      return [...shuffled, ...otherCards];
    });
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const startQuiz = () => {
    setCurrentQuizIndex(0);
    setQuizAnswers([]);
    setQuizComplete(false);
    setStudyMode('quiz');
  };

  const submitQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const getQuizScore = () => {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quizQuestions.length, percentage: Math.round((correct / quizQuestions.length) * 100) };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-success';
    if (mastery >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">

      <main className="container mx-auto px-4 py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Flashcards & Quizzes
            </h1>
            <p className="text-muted-foreground">AI-powered knowledge integration and self-testing</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateAIFlashcards} className="gap-2">
              <Brain className="h-4 w-4" />
              Generate AI Cards
            </Button>
            <Button onClick={() => setShowCreateCard(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Card
            </Button>
          </div>
        </div>

        {/* Study Mode Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button 
              variant={studyMode === 'browse' ? 'default' : 'outline'}
              onClick={() => setStudyMode('browse')}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Browse
            </Button>
            <Button 
              variant={studyMode === 'study' ? 'default' : 'outline'}
              onClick={() => setStudyMode('study')}
              className="gap-2"
            >
              <Brain className="h-4 w-4" />
              Study Mode
            </Button>
            <Button 
              variant={studyMode === 'quiz' ? 'default' : 'outline'}
              onClick={startQuiz}
              className="gap-2"
            >
              <Target className="h-4 w-4" />
              Quiz Mode
            </Button>
          </div>

          {studyMode !== 'quiz' && (
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Create Card Form */}
        {showCreateCard && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Create New Flashcard
              </CardTitle>
              <CardDescription>Add a new flashcard to your collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="e.g., Mathematics"
                    value={newCard.subject}
                    onChange={(e) => setNewCard(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={newCard.difficulty} onValueChange={(value: any) => setNewCard(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Question</label>
                <Textarea
                  placeholder="What is your question?"
                  value={newCard.question}
                  onChange={(e) => setNewCard(prev => ({ ...prev, question: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  placeholder="What is the answer?"
                  value={newCard.answer}
                  onChange={(e) => setNewCard(prev => ({ ...prev, answer: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    placeholder="e.g., calculus, derivatives, math"
                    value={newCard.tags}
                    onChange={(e) => setNewCard(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Hint (optional)</label>
                  <Input
                    placeholder="A helpful hint for the answer"
                    value={newCard.hint}
                    onChange={(e) => setNewCard(prev => ({ ...prev, hint: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={createFlashcard}>Create Flashcard</Button>
                <Button variant="outline" onClick={() => setShowCreateCard(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Browse Mode */}
        {studyMode === 'browse' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg line-clamp-2">{card.question}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{card.subject}</Badge>
                        <Badge variant="outline" className={getDifficultyColor(card.difficulty)}>
                          {card.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getMasteryColor(card.mastery)}`}>
                        {card.mastery}%
                      </div>
                      <div className="text-xs text-muted-foreground">mastery</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{card.answer}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{card.mastery}%</span>
                    </div>
                    <Progress value={card.mastery} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {card.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <span>Last reviewed: {new Date(card.lastReviewed).toLocaleDateString()}</span>
                    <Star className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Study Mode */}
        {studyMode === 'study' && filteredCards.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={shuffleCards} className="gap-2">
                  <Shuffle className="h-4 w-4" />
                  Shuffle
                </Button>
                <span className="text-sm text-muted-foreground">
                  Card {currentCardIndex + 1} of {filteredCards.length}
                </span>
              </div>
              
              <Progress value={((currentCardIndex + 1) / filteredCards.length) * 100} className="w-32 h-2" />
            </div>

            <Card className="shadow-elevated min-h-[400px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{filteredCards[currentCardIndex].subject}</Badge>
                    <Badge variant="outline" className={getDifficultyColor(filteredCards[currentCardIndex].difficulty)}>
                      {filteredCards[currentCardIndex].difficulty}
                    </Badge>
                  </div>
                  <div className={`text-lg font-bold ${getMasteryColor(filteredCards[currentCardIndex].mastery)}`}>
                    {filteredCards[currentCardIndex].mastery}% mastery
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    {showAnswer ? 'Answer' : 'Question'}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {showAnswer 
                      ? filteredCards[currentCardIndex].answer 
                      : filteredCards[currentCardIndex].question
                    }
                  </p>
                  
                  {!showAnswer && filteredCards[currentCardIndex].hint && (
                    <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-accent">
                        💡 Hint: {filteredCards[currentCardIndex].hint}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  {!showAnswer ? (
                    <Button onClick={() => setShowAnswer(true)} className="gap-2">
                      <Eye className="h-4 w-4" />
                      Show Answer
                    </Button>
                  ) : (
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          updateMastery(filteredCards[currentCardIndex].id, false);
                          nextCard();
                        }}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Incorrect
                      </Button>
                      <Button 
                        onClick={() => {
                          updateMastery(filteredCards[currentCardIndex].id, true);
                          nextCard();
                        }}
                        className="gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Correct
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => {
                    setCurrentCardIndex(prev => prev === 0 ? filteredCards.length - 1 : prev - 1);
                    setShowAnswer(false);
                  }}>
                    ← Previous
                  </Button>
                  <Button variant="ghost" onClick={nextCard}>
                    Next →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quiz Mode */}
        {studyMode === 'quiz' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!quizComplete ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Quiz Mode</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuizIndex + 1} of {quizQuestions.length}
                    </span>
                    <Progress value={((currentQuizIndex + 1) / quizQuestions.length) * 100} className="w-32 h-2" />
                  </div>
                </div>

                <Card className="shadow-elevated">
                  <CardHeader>
                    <CardTitle>{quizQuestions[currentQuizIndex].question}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{quizQuestions[currentQuizIndex].subject}</Badge>
                      <Badge variant="outline" className={getDifficultyColor(quizQuestions[currentQuizIndex].difficulty)}>
                        {quizQuestions[currentQuizIndex].difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {quizQuestions[currentQuizIndex].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left p-4 h-auto"
                          onClick={() => submitQuizAnswer(index)}
                        >
                          <span className="mr-3 text-primary font-bold">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-warning" />
                    Quiz Complete!
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {getQuizScore().percentage}%
                    </div>
                    <p className="text-muted-foreground">
                      You got {getQuizScore().correct} out of {getQuizScore().total} questions correct
                    </p>
                  </div>

                  <div className="space-y-3">
                    {quizQuestions.map((question, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                            quizAnswers[index] === question.correctAnswer 
                              ? 'bg-success text-success-foreground' 
                              : 'bg-destructive text-destructive-foreground'
                          }`}>
                            {quizAnswers[index] === question.correctAnswer ? '✓' : '✗'}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-2">{question.question}</p>
                            <p className="text-sm text-muted-foreground mb-2">
                              Your answer: {question.options[quizAnswers[index]]}
                            </p>
                            {quizAnswers[index] !== question.correctAnswer && (
                              <p className="text-sm text-success mb-2">
                                Correct answer: {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={startQuiz} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Retake Quiz
                    </Button>
                    <Button variant="outline" onClick={() => setStudyMode('browse')}>
                      Back to Cards
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {filteredCards.length === 0 && studyMode !== 'quiz' && (
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Flashcards Found</h3>
              <p className="text-muted-foreground mb-4">
                {selectedSubject !== 'all' 
                  ? `No flashcards found for ${selectedSubject}. Try selecting a different subject.`
                  : 'Create your first flashcard to start studying.'
                }
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setShowCreateCard(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Flashcard
                </Button>
                <Button variant="outline" onClick={generateAIFlashcards} className="gap-2">
                  <Brain className="h-4 w-4" />
                  Generate AI Cards
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </div>
  );
};

export default Flashcards;