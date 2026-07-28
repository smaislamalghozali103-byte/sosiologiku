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

export interface PdfHighlight {
  id: string;
  pdfId: string;
  textSnippet: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
  timestamp: string;
}

export interface PdfStickyNote {
  id: string;
  pdfId: string;
  comment: string;
  author: string;
  timestamp: string;
  selectedText?: string;
}

// Administrasi Guru Interfaces
export interface LessonPlan {
  id: string;
  title: string;
  grade: GradeLevel;
  chapter: string;
  cpText: string;
  tpText: string;
  atpText: string;
  duration: string;
  activities: string;
  assessmentMethod: string;
  createdDate: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  notes?: string;
}

export interface StudentGradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  nisn: string;
  className: string;
  formatif: number;
  sumatif: number;
  proyek: number;
  finalScore: number;
  kktp: number;
  status: 'Tuntas' | 'Remedi' | 'Pengayaan';
}

export interface TeachingJournal {
  id: string;
  date: string;
  timeSlot: string;
  className: string;
  topic: string;
  attendanceSummary: string;
  notes: string;
  assignment?: string;
}

export interface StudentLogRecord {
  id: string;
  studentName: string;
  className: string;
  date: string;
  category: 'Prestasi' | 'Disiplin' | 'Bimbingan BK' | 'Catatan Khusus';
  description: string;
  parentNotified: boolean;
}

export interface QuestionBankItem {
  id: string;
  grade: GradeLevel;
  topic: string;
  question: string;
  options?: string[];
  type: 'Pilihan Ganda' | 'Essay';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
}

export interface SchoolClass {
  id: string;
  name: string;
  academicYear: string;
  teacherInCharge: string;
}

export interface StudentItem {
  id: string;
  name: string;
  nisn: string;
  className: string;
}

export interface CustomChapter extends Chapter {
  grade: GradeLevel;
  isCustom?: boolean;
  author?: string;
  createdAt?: string;
}


