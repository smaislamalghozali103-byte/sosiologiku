export type GradeLevel = 10 | 11 | 12;

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyConcepts: string[];
  content: string;
  summary: string;
  readingTime: string;
}

export interface GradeCurriculum {
  grade: GradeLevel;
  title: string;
  subtitle: string;
  badgeColor: string;
  chapters: Chapter[];
}

export interface PdfModule {
  id: string;
  title: string;
  grade: GradeLevel;
  chapterTitle: string;
  fileSize: string;
  uploadDate: string;
  url: string;
  summary: string;
  author: string;
  parsedContent?: string;
  keyConcepts?: string[];
  isParsed?: boolean;
}

export interface QuizQuestion {
  id: string;
  grade: GradeLevel;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DiscussionReply {
  id: string;
  author: string;
  role: 'Siswa' | 'Guru';
  content: string;
  timestamp: string;
}

export interface DiscussionPost {
  id: string;
  author: string;
  avatar: string;
  role: 'Siswa' | 'Guru';
  timestamp: string;
  title: string;
  content: string;
  grade: GradeLevel;
  likes: number;
  replies: DiscussionReply[];
}

export interface UserStats {
  completedChapters: string[];
  quizScores: Record<string, number>;
  studyStreak: number;
  totalReadingMinutes: number;
}
