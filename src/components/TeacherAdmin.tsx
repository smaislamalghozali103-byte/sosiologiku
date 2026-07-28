import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Award, 
  UserCheck, 
  BookOpen, 
  BarChart3, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Save, 
  ShieldCheck, 
  Cloud, 
  RefreshCw, 
  Send, 
  Users, 
  FileSpreadsheet, 
  Sparkles, 
  Check, 
  Sliders, 
  Bell, 
  ChevronRight, 
  Layers,
  HelpCircle,
  TrendingUp,
  GraduationCap,
  MessageSquare,
  Presentation,
  Tv,
  PenTool,
  Video,
  Share2,
  QrCode,
  WifiOff,
  Copy,
  FileCheck,
  Palette,
  RotateCcw,
  Maximize2,
  Play,
  BarChart2,
  Globe,
  Image as ImageIcon,
  ExternalLink,
  FileCode,
  Eraser,
  Volume2,
  Link2,
  Radio,
  Smartphone,
  User,
  Heart,
  Feather,
  Quote,
  MapPin,
  Compass,
  Star,
  Bookmark,
  ListOrdered
} from 'lucide-react';
import { 
  LessonPlan, 
  AttendanceRecord, 
  StudentGradeRecord, 
  TeachingJournal, 
  StudentLogRecord, 
  QuestionBankItem,
  GradeLevel,
  SchoolClass,
  StudentItem,
  CustomChapter
} from '../types';

export const TeacherAdmin: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'manage-classes' | 'manage-materials' | 'cp-official' | 'atp-official' | 'teaching-mode' | 'teacher-bio' | 'planning' | 'attendance' | 'grading' | 'journal' | 'reporting' | 'student-log' | 'security'
  >('manage-classes');

  // Selected Class Filter
  const [selectedClass, setSelectedClass] = useState<string>('X IPS 1');

  // --- CRUD 1. MANAJEMEN KELAS STATE ---
  const [classList, setClassList] = useState<SchoolClass[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_admin_classes');
      return saved ? JSON.parse(saved) : [
        { id: 'c-1', name: 'X IPS 1', academicYear: '2026/2027', teacherInCharge: 'Drs. Supriyadi, M.Pd' },
        { id: 'c-2', name: 'X IPS 2', academicYear: '2026/2027', teacherInCharge: 'Dra. Siti Aminah' },
        { id: 'c-3', name: 'XI IPS 1', academicYear: '2026/2027', teacherInCharge: 'Ahmad Nur, S.Pd' },
        { id: 'c-4', name: 'XI IPS 2', academicYear: '2026/2027', teacherInCharge: 'Rina Kartika, M.Si' },
        { id: 'c-5', name: 'XII IPS 1', academicYear: '2026/2027', teacherInCharge: 'Budi Santoso, S.Pd' }
      ];
    } catch {
      return [];
    }
  });

  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);
  const [inputClassName, setInputClassName] = useState('');
  const [inputClassYear, setInputClassYear] = useState('2026/2027');
  const [inputClassTeacher, setInputClassTeacher] = useState('');

  // --- CRUD 2. MANAJEMEN SISWA & COPY-PASTE ROSTER STATE ---
  const [studentList, setStudentList] = useState<StudentItem[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_admin_students');
      return saved ? JSON.parse(saved) : [
        { id: 's-1', name: 'Ahmad Fauzi', nisn: '0054231001', className: 'X IPS 1' },
        { id: 's-2', name: 'Anisa Rahmawati', nisn: '0054231002', className: 'X IPS 1' },
        { id: 's-3', name: 'Bagas Prasetyo', nisn: '0054231003', className: 'X IPS 1' },
        { id: 's-4', name: 'Citra Dewi', nisn: '0054231004', className: 'X IPS 1' },
        { id: 's-5', name: 'Doni Gunawan', nisn: '0054231005', className: 'X IPS 1' },
        { id: 's-6', name: 'Eka Putri', nisn: '0054231006', className: 'X IPS 1' },
        { id: 's-7', name: 'Fikri Haikal', nisn: '0054231007', className: 'X IPS 1' },
        { id: 's-8', name: 'Gita Lestari', nisn: '0054231008', className: 'X IPS 1' }
      ];
    } catch {
      return [];
    }
  });

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);
  const [inputStudentName, setInputStudentName] = useState('');
  const [inputStudentNisn, setInputStudentNisn] = useState('');
  const [inputStudentClass, setInputStudentClass] = useState('X IPS 1');

  // Copy-paste batch import
  const [batchPasteText, setBatchPasteText] = useState('');
  const [isBatchImportOpen, setIsBatchImportOpen] = useState(false);
  const [searchStudentQuery, setSearchStudentQuery] = useState('');

  // --- CRUD 3. MENULIS & COPY-PASTE MATERI PEMBELAJARAN GURU STATE ---
  const [customMaterials, setCustomMaterials] = useState<CustomChapter[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_custom_chapters');
      return saved ? JSON.parse(saved) : [
        {
          id: 'cust-1',
          grade: 10,
          title: 'Bab Khusus Guru: Sosiologi Lingkungan & Ekologi Sosial',
          subtitle: 'Menganalisis Krisis Lingkungan Hidup dengan Lensa Sosiologis',
          description: 'Bahan ajar tambahan buatan guru mengenai dampak industrialisasi terhadap kearifan lokal masyarakat.',
          keyConcepts: ['Ekologi Sosial', 'Krisis Lingkungan', 'Kearifan Lokal', 'Keadilan Lingkungan'],
          content: `Ekologi sosial mengkaji hubungan timbal balik antara struktur sosial manusia dengan ekosistem alam.

Masalah lingkungan hidup seperti pencemaran limbah, deforestasi, dan perubahan iklim tidak hanya merupakan fenomena alam semata, melainkan buah dari pola produksi, konsumsi, dan perilaku sosial masyarakat modern.

1. Lensa Sosiologi Lingkungan:
Memandang fenomena kerusakan alam sebagai dampak ketimpangan sosial dan kapitalisme lingkungan.

2. Solusi Berbasis Masyarakat:
Pemberdayaan kearifan lokal (local wisdom) dan gerakan sosial hijau (green movement) untuk menjaga kelestarian lingkungan hidup.`,
          summary: 'Materi pengayaan mengenai hubungan struktur masyarakat dengan lingkungan dan isu ekologi sosial.',
          readingTime: '10 menit',
          isCustom: true,
          author: 'Tim Guru Sosiologi SMA',
          createdAt: '27 Jul 2026'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<CustomChapter | null>(null);
  const [matTitle, setMatTitle] = useState('');
  const [matSubtitle, setMatSubtitle] = useState('');
  const [matGrade, setMatGrade] = useState<GradeLevel>(10);
  const [matKeyConcepts, setMatKeyConcepts] = useState('');
  const [matSummary, setMatSummary] = useState('');
  const [matContent, setMatContent] = useState('');
  const [matReadingTime, setMatReadingTime] = useState('10 menit');
  const [filterMaterialGrade, setFilterMaterialGrade] = useState<number | 'all'>('all');

  // --- 1. PLANNING DATA ---
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_admin_plans');
      return saved ? JSON.parse(saved) : [
        {
          id: 'lp-1',
          title: 'Modul Ajar Sosiologi - Hakikat dan Objek Kajian Sosiologi',
          grade: 10,
          chapter: 'Bab 1: Hakikat dan Objek Sosiologi',
          cpText: 'Peserta didik mampu memahami hakikat ilmu sosiologi, objek kajian, serta fungsi sosiologi dalam mengkaji fenomena sosial di masyarakat.',
          tpText: 'Menganalisis perbedaan sosiologi dengan ilmu sosial lainnya dan mengidentifikasi contoh realitas sosial setempat.',
          atpText: '1. Orientasi Masalah -> 2. Diskusi Kelompok Kelayakan Data -> 3. Penyusunan Makalah Observasi -> 4. Evaluasi.',
          duration: '3 Pertemuan x 2 JP (6 JP)',
          activities: 'Problem Based Learning (PBL) dengan studi kasus fenomena tawuran dan solidaritas sosial remaja.',
          assessmentMethod: 'Formatif (Observasi & Lembar Kerja) + Sumatif (Tes Tertulis)',
          createdDate: '12 Jul 2026'
        },
        {
          id: 'lp-2',
          title: 'Modul Ajar Sosiologi - Interaksi dan Tindakan Sosial',
          grade: 10,
          chapter: 'Bab 2: Interaksi Sosial',
          cpText: 'Peserta didik memahami syarat, faktor pendorong, dan bentuk-bentuk interaksi sosial asosiatif serta disosiatif.',
          tpText: 'Menjelaskan konsep tindakan sosial Max Weber dan mengelompokkan tindakan sosial dalam masyarakat sekitar.',
          atpText: '1. Pengamatan Lingkungan Sekolah -> 2. Pemetaan Jenis Interaksi -> 3. Presentasi Hasil Pengamatan.',
          duration: '2 Pertemuan x 2 JP (4 JP)',
          activities: 'Role playing (simulasi akomodasi konflik sosial) dan observasi media sosial.',
          assessmentMethod: 'Penilaian Proyek Media Sosial + Kuis Interaktif',
          createdDate: '20 Jul 2026'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newPlanGrade, setNewPlanGrade] = useState<GradeLevel>(10);
  const [newPlanChapter, setNewPlanChapter] = useState('');
  const [newPlanCP, setNewPlanCP] = useState('');
  const [newPlanTP, setNewPlanTP] = useState('');
  const [newPlanATP, setNewPlanATP] = useState('');
  const [newPlanDuration, setNewPlanDuration] = useState('2 JP');
  const [newPlanActivities, setNewPlanActivities] = useState('');

  // Prota & Promes state
  const [activePlanningView, setActivePlanningView] = useState<'rpp' | 'cpatp' | 'prota'>('rpp');

  // --- 2. ATTENDANCE DATA ---
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_admin_attendance');
      return saved ? JSON.parse(saved) : [
        { id: 'att-1', studentId: 's-1', studentName: 'Ahmad Fauzi', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Hadir', notes: '' },
        { id: 'att-2', studentId: 's-2', studentName: 'Anisa Rahmawati', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Hadir', notes: '' },
        { id: 'att-3', studentId: 's-3', studentName: 'Bagas Prasetyo', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Sakit', notes: 'Surat dokter terlampir' },
        { id: 'att-4', studentId: 's-4', studentName: 'Citra Dewi', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Hadir', notes: '' },
        { id: 'att-5', studentId: 's-5', studentName: 'Doni Gunawan', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Izin', notes: 'Acara keluarga' },
        { id: 'att-6', studentId: 's-6', studentName: 'Eka Putri', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Hadir', notes: '' },
        { id: 'att-7', studentId: 's-7', studentName: 'Fikri Haikal', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Alpa', notes: 'Tanpa keterangan' },
        { id: 'att-8', studentId: 's-8', studentName: 'Gita Lestari', className: 'X IPS 1', date: new Date().toISOString().split('T')[0], status: 'Hadir', notes: '' }
      ];
    } catch {
      return [];
    }
  });

  // --- 3. GRADING DATA ---
  const [studentGrades, setStudentGrades] = useState<StudentGradeRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_admin_grades');
      return saved ? JSON.parse(saved) : [
        { id: 'g-1', studentId: 's-1', studentName: 'Ahmad Fauzi', nisn: '0054231001', className: 'X IPS 1', formatif: 88, sumatif: 85, proyek: 90, finalScore: 87, kktp: 75, status: 'Tuntas' },
        { id: 'g-2', studentId: 's-2', studentName: 'Anisa Rahmawati', nisn: '0054231002', className: 'X IPS 1', formatif: 92, sumatif: 94, proyek: 95, finalScore: 93, kktp: 75, status: 'Pengayaan' },
        { id: 'g-3', studentId: 's-3', studentName: 'Bagas Prasetyo', nisn: '0054231003', className: 'X IPS 1', formatif: 68, sumatif: 65, proyek: 70, finalScore: 67, kktp: 75, status: 'Remedi' },
        { id: 'g-4', studentId: 's-4', studentName: 'Citra Dewi', nisn: '0054231004', className: 'X IPS 1', formatif: 80, sumatif: 82, proyek: 85, finalScore: 82, kktp: 75, status: 'Tuntas' },
        { id: 'g-5', studentId: 's-5', studentName: 'Doni Gunawan', nisn: '0054231005', className: 'X IPS 1', formatif: 74, sumatif: 70, proyek: 72, finalScore: 72, kktp: 75, status: 'Remedi' }
      ];
    } catch {
      return [];
    }
  });

  const [kktpThreshold, setKktpThreshold] = useState<number>(75);
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>([
    { id: 'qb-1', grade: 10, topic: 'Hakikat Sosiologi', question: 'Siapakah tokoh yang pertama kali mencetuskan istilah Sosiologi dalam bukunya Cours de Philosophie Positive?', options: ['Karl Marx', 'Auguste Comte', 'Emile Durkheim', 'Max Weber'], type: 'Pilihan Ganda', difficulty: 'Mudah' },
    { id: 'qb-2', grade: 10, topic: 'Interaksi Sosial', question: 'Jelaskan perbedaan antara asimilasi dan akulturasi beserta contoh nyata di Indonesia!', type: 'Essay', difficulty: 'Sedang' },
    { id: 'qb-3', grade: 11, topic: 'Kelompok Sosial', question: 'Jelaskan ciri-ciri paguyuban (gemeinschaft) menurut Ferdinand Tonnies!', type: 'Essay', difficulty: 'Sedang' }
  ]);

  // --- 4. TEACHING JOURNAL DATA ---
  const [teachingJournals, setTeachingJournals] = useState<TeachingJournal[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_admin_journals');
      return saved ? JSON.parse(saved) : [
        {
          id: 'j-1',
          date: '2026-07-27',
          timeSlot: '07:00 - 08:30 (Jam 1-2)',
          className: 'X IPS 1',
          topic: 'Ciri-ciri Sosiologi sebagai Ilmu Empiris dan Kumulatif',
          attendanceSummary: 'Hadir: 32, Sakit: 1, Izin: 1, Alpa: 1',
          notes: 'Siswa aktif berdiskusi mengenai observasi fenomena sosial di lingkungan sekolah. Diskusi berjalan sangat kondusif.',
          assignment: 'Mencatat 3 contoh realitas sosial di sekitar rumah.'
        },
        {
          id: 'j-2',
          date: '2026-07-26',
          timeSlot: '09:00 - 10:30 (Jam 3-4)',
          className: 'XI IPS 2',
          topic: 'Pembentukan Kelompok Sosial dan Partikularisme',
          attendanceSummary: 'Hadir: 34, Sakit: 0, Izin: 1, Alpa: 0',
          notes: 'LCD proyektor sempat bermasalah 10 menit, namun dapat diatasi dengan metode presentasi poster fisik.',
          assignment: 'Membaca Bab 2 tentang Konflik Sosial.'
        }
      ];
    } catch {
      return [];
    }
  });

  const [newJournalTopic, setNewJournalTopic] = useState('');
  const [newJournalSlot, setNewJournalSlot] = useState('07:00 - 08:30');
  const [newJournalNotes, setNewJournalNotes] = useState('');
  const [newJournalAssignment, setNewJournalAssignment] = useState('');

  // --- 5. STUDENT LOG / BEHAVIOR ---
  const [studentLogs, setStudentLogs] = useState<StudentLogRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_admin_logs');
      return saved ? JSON.parse(saved) : [
        { id: 'l-1', studentName: 'Anisa Rahmawati', className: 'X IPS 1', date: '25 Jul 2026', category: 'Prestasi', description: 'Meraih Juara 1 Lomba Esai Sosiologi Tingkat Kabupaten.', parentNotified: true },
        { id: 'l-2', studentName: 'Fikri Haikal', className: 'X IPS 1', date: '27 Jul 2026', category: 'Disiplin', description: 'Terlambat masuk kelas 20 menit tanpa alasan sah.', parentNotified: false },
        { id: 'l-3', studentName: 'Bagas Prasetyo', className: 'X IPS 1', date: '22 Jul 2026', category: 'Bimbingan BK', description: 'Konseling mengenai motivasi belajar pasca sakit parah.', parentNotified: true }
      ];
    } catch {
      return [];
    }
  });

  const [newLogStudent, setNewLogStudent] = useState('');
  const [newLogCategory, setNewLogCategory] = useState<'Prestasi' | 'Disiplin' | 'Bimbingan BK' | 'Catatan Khusus'>('Prestasi');
  const [newLogDesc, setNewLogDesc] = useState('');

  // --- 6. SECURITY & BACKUP STATE ---
  const [lastSyncTime, setLastSyncTime] = useState<string>('27 Jul 2026, 17:15 WIB');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [cloudBackupEnabled, setCloudBackupEnabled] = useState<boolean>(true);

  // --- 7. CAPAIAN PEMBELAJARAN BSKAP 32/2024 STATE ---
  const [cpSearchTerm, setCpSearchTerm] = useState('');
  const [cpActiveSection, setCpActiveSection] = useState<'all' | 'rasional' | 'tujuan' | 'karakteristik' | 'faseE'>('all');
  const [cpCopied, setCpCopied] = useState(false);

  // --- 8. TEACHING CONTENT & MEDIA (MODA MENGAJAR & PRESENTASI) STATE ---
  const [teachingSubTab, setTeachingSubTab] = useState<'projector' | 'whiteboard' | 'library' | 'sharing'>('projector');

  // Slide & Projector State
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [isPollActive, setIsPollActive] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('Menurut Anda, apakah pembentukan norma sosial bersifat statis atau dinamis?');
  const [pollOptions, setPollOptions] = useState([
    { id: 'a', text: 'Statis - tidak pernah berubah', votes: 3 },
    { id: 'b', text: 'Dinamis - menyesuaikan perkembangan zaman', votes: 24 },
    { id: 'c', text: 'Hanya berubah saat terjadi konflik', votes: 5 },
    { id: 'd', text: 'Ragu-ragu / Belum tahu', votes: 1 },
  ]);
  const [pollTotalVotes, setPollTotalVotes] = useState(33);

  // Presentation Slides
  const [presentationSlides] = useState([
    {
      id: 1,
      title: 'Bab 1: Fungsi Sosiologi Dalam Mengkaji Masyarakat',
      subtitle: 'Fase E - SMA / MA Sosiologi (IPS)',
      type: 'title',
      content: 'Pengenalan Sosiologi sebagai Ilmu Pengetahuan Sosial yang Kritis, Analitis, dan Solutif.',
      bullets: [
        'Definisi Sosiologi menurut Para Ahli (Auguste Comte, Emile Durkheim, Soerjono Soekanto)',
        'Ciri-Ciri Sosiologi sebagai Ilmu: Empiris, Teoritis, Kumulatif, dan Non-Etis',
        'Objek Kajian Sosiologi: Masyarakat, Interaksi Sosial, dan Gejala Sosial'
      ]
    },
    {
      id: 2,
      title: '4 Ciri Utama Sosiologi Sebagai Ilmu Pengetahuan',
      subtitle: 'Prinsip Dasar Berpikir Sosiologis',
      type: 'concept',
      content: 'Sosiologi berdiri di atas landasan metodologi ilmiah berikut:',
      bullets: [
        '1. Empiris: Didasarkan pada observasi fakta di lapangan, bukan dugaan.',
        '2. Teoritis: Menyusun abstraksi dari hasil observasi untuk menjelaskan sebab-akibat.',
        '3. Kumulatif: Teori dibentuk atas dasar teori yang sudah ada sebelumnya.',
        '4. Non-Etis: Tidak menilai baik/buruk suatu fakta sosial, melainkan menjelaskan alasannya.'
      ]
    },
    {
      id: 3,
      title: 'Realitas Sosial & Gejala Sosial Di Masyarakat',
      subtitle: 'Studi Kasus Interaksi Manusia',
      type: 'quiz-trigger',
      content: 'Gejala sosial terjadi karena adanya perubahan sosial dan perbedaan kebudayaan dalam kelompok masyarakat.',
      bullets: [
        'Status dan Peran Individu dalam Kelompok Sosial',
        'Ragam Gejala Sosial di Masyarakat Multikultural',
        'Dampak Globalisasi terhadap Nilai dan Norma Sosial'
      ]
    },
    {
      id: 4,
      title: 'Rangkuman & Aksi Nyata Peserta Didik',
      subtitle: 'Keterampilan Proses Sosiologi',
      type: 'summary',
      content: 'Mengamati, Menanya, Mengumpulkan Informasi, Menganalisis, dan Mengomunikasikan Simpulan.',
      bullets: [
        'Tugas Inkuiri Mandiri: Amati 1 gejala sosial di lingkungan tempat tinggal Anda',
        'Susun laporan analisis berdasarkan konsep fungsi sosiologi',
        'Presentasikan hasil analisis dalam bentuk poster/infografis digital'
      ]
    }
  ]);

  // Whiteboard Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wbTool, setWbTool] = useState<'pencil' | 'eraser'>('pencil');
  const [wbColor, setWbColor] = useState('#4f46e5');
  const [wbLineWidth, setWbLineWidth] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);
  const [wbSavedAlert, setWbSavedAlert] = useState(false);

  // Digital Resource Library State
  const [mediaList, setMediaList] = useState([
    {
      id: 'm-1',
      title: 'Video Pembelajaran: Fungsi Sosiologi di Masyarakat',
      type: 'video' as const,
      category: 'Sosiologi Dasar',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Penjelasan animasi menarik tentang peran sosiologi sebagai pengkaji gejala sosial.',
      addedDate: '24 Jul 2026'
    },
    {
      id: 'm-2',
      title: 'Audio Podcast: Menghadapi Masyarakat Multikultural',
      type: 'audio' as const,
      category: 'Ragam Gejala Sosial',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      description: 'Diskusi interaktif seputar pluralisme, toleransi, dan integrasi sosial.',
      addedDate: '20 Jul 2026'
    },
    {
      id: 'm-3',
      title: 'Modul Digital PDF: Panduan Penelitian Inkuiri Sosiologi',
      type: 'doc' as const,
      category: 'Keterampilan Proses',
      url: 'https://bskap.kemdikbud.go.id/',
      description: 'Pedoman langkah-langkah penelitian observasi dan studi lapangan Fase E.',
      addedDate: '15 Jul 2026'
    }
  ]);

  const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaType, setNewMediaType] = useState<'video' | 'audio' | 'doc'>('video');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaDesc, setNewMediaDesc] = useState('');

  // Student Share & Offline Access State
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  const [shareCopySuccess, setShareCopySuccess] = useState(false);

  // Whiteboard drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = wbTool === 'eraser' ? '#ffffff' : wbColor;
    ctx.lineWidth = wbTool === 'eraser' ? wbLineWidth * 4 : wbLineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearWhiteboard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // --- 9. BIOGRAFI INTERAKTIF GURU STATE (Liyas Syarifudin, M.Pd.) ---
  const [bioSubTab, setBioSubTab] = useState<'overview' | 'timeline' | 'family' | 'teaching' | 'works' | 'quiz'>('overview');
  const [selectedBioMilestone, setSelectedBioMilestone] = useState<number | null>(null);
  const [selectedWritingCategory, setSelectedWritingCategory] = useState<'all' | 'puisi' | 'artikel' | 'novel'>('all');
  const [readingPieceModal, setReadingPieceModal] = useState<{ title: string; category: string; content: string } | null>(null);

  // Interactive Bio Quiz State
  const [bioQuizAnswers, setBioQuizAnswers] = useState<{ [qId: number]: string }>({});
  const [bioQuizSubmitted, setBioQuizSubmitted] = useState(false);
  const [bioQuizScore, setBioQuizScore] = useState(0);
  const [bioCardCopied, setBioCardCopied] = useState(false);

  // Sample literary works by Liyas Syarifudin
  const literaryWorks = [
    {
      id: 1,
      title: 'Langkah di Lembah Al Ghozali',
      category: 'puisi',
      year: '2021',
      summary: 'Untaian bait refleksi tentang pengabdian mendidik generasi di pondok modern.',
      content: `Di bawah naungan lembah Al Ghozali,\nJejak langkah tak pernah ragu meniti.\nMendidik jiwa dengan cermin ilahi,\nMeninggalkan warisan yang tak kan mati.\n\nSetiap bait kata dan tuturan ilmu,\nAdalah cahaya penuntun kalbu.\nMeski zaman berubah dan berlalu,\nTulisan jujur abadi selalu.`
    },
    {
      id: 2,
      title: 'Pendidikan Sosiologi & Generasi Berkarakter Pancasila',
      category: 'artikel',
      year: '2023',
      summary: 'Artikel opini ilmiah tentang pentingnya inkuiri sosial bagi peserta didik Fase E.',
      content: `Pendidikan Ilmu Pengetahuan Sosial (IPS) tidak hanya sekadar menghafal teori sosiologis. Esensi utamanya terletak pada pengembangan keterampilan berpikir kritis, analitis, dan solutif di tengah fenomena kemajemukan masyarakat.\n\nMelalui pendekatan inkuiri, peserta didik diajak mengamati gejala sosial di sekitarnya, menumbuhkan komitmen empati, serta menghasilkan aksi nyata bagi kemajuan bangsa.`
    },
    {
      id: 3,
      title: 'Jejak Pena Pengabdi',
      category: 'novel',
      year: '2024',
      summary: 'Novel fiksi inspiratif bertema perjuangan seorang pendidik di tanah Pasundan.',
      content: `Kisah perjalanan seorang pendidik yang melintasi berbagai dinamika ruang dan waktu. Dari bangku madrasah di Bogor, riak perjuangan di kampus, hingga menemukan muara pengabdian sejati di Pondok Modern Al Ghozali.\n\nSetiap bab menyuguhkan hikmah tentang keteguhan cita-cita dan kehangatan keluarga.`
    }
  ];

  // --- 10. ATP SOSIOLOGI FASE E STATE & DATA ---
  const [atpSubTab, setAtpSubTab] = useState<'table' | 'info' | 'profil' | 'rasional'>('table');
  const [atpSearchQuery, setAtpSearchQuery] = useState('');
  const [atpSelectedTopic, setAtpSelectedTopic] = useState('all');
  const [expandedAtpCode, setExpandedAtpCode] = useState<string | null>('10.1');
  const [atpCopiedCode, setAtpCopiedCode] = useState<string | null>(null);
  const [glosariumSearch, setGlosariumSearch] = useState('');

  const officialAtpList = [
    {
      code: '10.1',
      faseE: 'Menjelaskan fungsi sosiologi sebagai ilmu untuk mengkaji kehidupan masyarakat dengan berbagai perspektif kajian teori sosiologi dan pendapat diri peserta didik serta melakukan identifikasi berbagai ragam gejala sosial dilingkungan sekitar melalui metode ilmiah.',
      keyword: 'Menjelaskan fungsi sosiologi sebagai ilmu dalam mengkaji ragam gejala sosial',
      topic: 'Fungsi Sosiologi untuk mengenali gejala sosial di masyarakat',
      indicators: [
        'Menjelaskan fungsi sosiologi untuk mengkaji gejala sosial di masyarakat',
        'Mengemukakan sifat dan hakekat sosiologi sebagai ilmu dalam mengkaji masyarakat',
        'Mengidentifikasi ragam gejala sosial dalam kehidupan masyarakat melalui metode ilmiah',
        'Menyampaikan hasil pengamatan dalam diskusi kelas mengenai ragam gejala sosial sebagai bagian dari kajian sosiologi'
      ]
    },
    {
      code: '10.2',
      faseE: 'Menjelaskan konsep identitas diri dalam berbagai konteks dan memberikan contoh nyata penerapannya dalam kehidupan sosial bermasyarakat serta membuat laporan pemetaan identitas diri sebagai entitas dalam kehidupan bermasyarakat.',
      keyword: 'Menjelaskan identitas diri dalam berbagai konteks',
      topic: 'Identitas Diri dalam Kehidupan Masyarakat',
      indicators: [
        'Menjelaskan konsep identitas diri dalam berbagai konteks',
        'Menyajikan contoh penerapan identitas diri dalam kehidupan dari berbagai sumber pengamatan',
        'Menerapkan konsep identitas diri dalam kehidupan nyata di masyarakat',
        'Menyusun laporan pemetaan penerapan identitas diri dalam berbagai konteks',
        'Menyajikan pemetaan penerapan identitas diri dalam bentuk presentasi hasil kerja individual'
      ]
    },
    {
      code: '10.3',
      faseE: 'Menjelaskan konsep tindakan sosial dan menyimpulkannya sebagai bagian dari proses hubungan dengan orang lain dalam kehidupan sosial bermasyarakat serta melakukan studi penelitian lapangan tentang berbagai fenomena tindakan sosial yang terjadi di masyarakat.',
      keyword: 'Menjelaskan tindakan sosial sebagai bagian hubungan dengan orang lain',
      topic: 'Tindakan Sosial Sebagai Realitas',
      indicators: [
        'Menjelaskan konsep tindakan dari berbagai perspektif teori sosiologi',
        'Mengemukakan pendapat pribadi tentang tindakan sosial sebagai bagian proses hubungan dengan orang lain',
        'Menemukan berbagai fenomena tindakan sosial yang aktual ini terjadi melalui pengamatan lapangan',
        'Menyusun laporan hasil pengamatan terkait fenomena tindakan sosial',
        'Mengkomunikasikan pendapat secara individu berdasarkan hasil pengamatan mengenai fenomena tindakan sosial'
      ]
    },
    {
      code: '10.4',
      faseE: 'Mengidentifikasi bentuk hubungan sosial yang terjadi dalam kehidupan masyarakat melalui pengamatan serta melaporkan hasil pengamatan secara ilmiah.',
      keyword: 'Mengidentifikasi hubungan sosial secara spesifik sesuai dengan kontek kehidupan nyata',
      topic: 'Hubungan Sosial',
      indicators: [
        'Menjelaskan konsep hubungan sosial di masyarakat sebagai realitas sosial',
        'Mendeskripsikan faktor-faktor dan syarat terjadinya hubungan sosial',
        'Mengidentifikasi bentuk-bentuk hubungan sosial sesuai dengan hasil pengamatan',
        'Menyajikan hasil pengamatan dalam bentuk project mandiri'
      ]
    },
    {
      code: '10.5',
      faseE: 'Menganalisis peran lembaga sosial dalam kehidupan sosial masyarakat dan menghubungkannya dalam upaya menciptakan keteraturan dan tertib sosial serta melakukan studi investigasi berbagai peran lembaga sosial dalam kehidupan sosial secara nyata.',
      keyword: 'Menganalisis peran lembaga sosial dilingkungan masyarakat',
      topic: 'Peran Lembaga Sosial',
      indicators: [
        'Menjelaskan konsep lembaga sosial dari berbagai sumber',
        'Menganalisis peran lembaga sosial berdasarkan fakta dalam kehidupan masyarakat',
        'Menganalisis hubungan berbagai peran lembaga sosial dalam menciptakan keteraturan dan ketertiban di masyarakat',
        'Menganalisis dan mendiskusikan peran lembaga sosial di masyarakat sekitar sesuai dengan hasil investigasi lapangan',
        'Mempresentasikan hasil temuan lapangan secara berkelompok melalui diskusi'
      ]
    },
    {
      code: '10.6',
      faseE: 'Menganalisis ragam gejala sosial sebagai dinamika dalam kehidupan masyarakat mutikutural dan mengevaluasinya dengan berdasarkan pada fakta-fakta sosial yang aktual terjadi di masyarakat.',
      keyword: 'Menganalisis ragam gejala sosial dalam masyarakat multikutural',
      topic: 'Ragam Gejala Sosial dalam Masyarakat Multikultural',
      indicators: [
        'Memahami hekekat gelaja sosial dari berbagai sumber literatur',
        'Menganalisis adanya ragam gejala sosial dalam masyarakat multikultural berdasarkan konteks kehidupan nyata',
        'Menganalisis kecenderungan gejala sosial di masyarakat sebagai akibat dari hubungan sosial dari perspektif empiris',
        'Mengevaluasi dan mengajukan pendapat secara kritsi terhadap dinamika kehidupan sosial masyakarat multikultural'
      ]
    },
    {
      code: '10.7',
      faseE: 'Merumuskan dampak keragaman gejala sosial yang terjadi dilingkungan sekitar sebagai topik penelitian yang relevan dan melakukan penelitian sosial deskripstif yang sesuai dengan metodologi ilmiah.',
      keyword: 'Melakukan penelitian sosial dengan topik keragaman gejala sosial yang terjadi di masyarakat',
      topic: 'Metode Penelitian Sosial',
      indicators: [
        'Menentukan topik penelitian tentang dampak keragaman gejala sosial yang terjadi di masyarakat',
        'Menyusun rancangan penelitian sosial dengan pendekatan deskriptif',
        'Menyusun instrument penelitan dalam bentuk wawancara, kuesioner dan observasi serta kajian dokumen',
        'Mengumpulkan data dengan instrument penelitian yang telah dirancang',
        'Mengolah dan menganalisis data penelitian sosial',
        'Menyusun laporan penelitian sesuai dengan sistematika ilmiah',
        'Mengkomunikasi hasil penelitian dalam diskusi ilmiah'
      ]
    }
  ];

  const officialGlosarium = [
    { term: 'Masyarakat', def: 'Satu kesatuan hidup manusia yang berinteraksi menurut sistem adat istiadat, konvensi dan aturan hukum tertentu yang bersifat terus menerus dan terikat oleh perasaan bersama.' },
    { term: 'Hubungan sosial', def: 'Kegiatan interaksi sosial masyarakat yang melakukan tindakan untuk memberi informasi dan mempengaruhi satu sama lainnya, hubungan ini bisa stabil jika dilakukan dengan kesadaran serta toleransi.' },
    { term: 'Gejala sosial', def: 'Suatu fenomena yang ditandai dengan timbulnya permasalahan sosial yang mempengaruhi dan dipengaruhi oleh tingkah laku setiap individu di dalam lingkungan kehidupannya.' },
    { term: 'Tindakan sosial', def: 'Tindakan yang bersifat subjektif dalam segala perilaku manusia. Ciri utama dari perilaku dalam tindakan sosial adalah pemaknaan yang bersifat subjektif, mampu mempengaruhi orang lain dan menerima pengaruh.' },
    { term: 'Lembaga sosial', def: 'Seperangkat aturan yang mengatur rangkaian tata cara dan prosedur dalam melakukan hubungan antar manusia saat mereka menjalani kehidupan bermasyarakat.' },
    { term: 'Masyarakat multikultural', def: 'Masyarakat yang terdiri dari berbagai macam suku yang masing-masing punya struktur budaya yang berbeda-beda dan hidup bersama secara sederajat.' },
    { term: 'Keteraturan sosial', def: 'Kondisi kehidupan yang aman, tentram, dan tertib dari perilaku yang merugikan masyarakat.' },
    { term: 'Tertib sosial', def: 'Kondisi kehidupan masyarakat yang aman, dinamis, dan teratur sebagai hasil hubungan yang selaras antara tindakan, nilai, dan norma.' },
    { term: 'Konteks', def: 'Bagian suatu uraian atau kalimat yang dapat mendukung atau menambah kejelasan makna situasi yang ada hubungannya dengan suatu kejadian.' },
    { term: 'Eksplorasi', def: 'Penjelajahan lapangan dengan tujuan memperoleh pengetahuan lebih banyak dan fakta sosial yang sesungguhnya.' },
    { term: 'Metodologi ilmiah', def: 'Suatu prosedur atau tata cara sistematis yang digunakan para ilmuwan untuk memecahkan masalah-masalah yang dihadapi.' },
    { term: 'Identitas diri', def: 'Kesadaran individu untuk menempatkan diri dan memberi arti pada dirinya sebagai seorang pribadi yang unik.' },
    { term: 'Penelitian sosial', def: 'Penyelidikan-penyelidikan yang dirancang untuk menambah khazanah ilmu pengetahuan sosial melalui metodologi ilmiah.' },
    { term: 'Entitas', def: 'Sesuatu yang memiliki keberadaan yang unik dan berbeda, walaupun tidak harus dalam bentuk fisik.' }
  ];

  // Persistence triggers
  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_admin_plans', JSON.stringify(lessonPlans));
    } catch {}
  }, [lessonPlans]);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_admin_attendance', JSON.stringify(attendanceRecords));
    } catch {}
  }, [attendanceRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_admin_grades', JSON.stringify(studentGrades));
    } catch {}
  }, [studentGrades]);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_admin_journals', JSON.stringify(teachingJournals));
    } catch {}
  }, [teachingJournals]);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_admin_logs', JSON.stringify(studentLogs));
    } catch {}
  }, [studentLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_admin_classes', JSON.stringify(classList));
    } catch {}
  }, [classList]);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_admin_students', JSON.stringify(studentList));
    } catch {}
  }, [studentList]);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_custom_chapters', JSON.stringify(customMaterials));
    } catch {}
  }, [customMaterials]);

  // --- HANDLERS FOR CRUD KELAS ---
  const handleOpenAddClassModal = () => {
    setEditingClass(null);
    setInputClassName('');
    setInputClassYear('2026/2027');
    setInputClassTeacher('');
    setIsClassModalOpen(true);
  };

  const handleOpenEditClassModal = (cls: SchoolClass) => {
    setEditingClass(cls);
    setInputClassName(cls.name);
    setInputClassYear(cls.academicYear);
    setInputClassTeacher(cls.teacherInCharge);
    setIsClassModalOpen(true);
  };

  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputClassName.trim()) return;

    if (editingClass) {
      const oldName = editingClass.name;
      const newName = inputClassName.trim();

      setClassList(classList.map(c => c.id === editingClass.id ? {
        ...c,
        name: newName,
        academicYear: inputClassYear,
        teacherInCharge: inputClassTeacher || 'Guru Pengampu'
      } : c));

      if (oldName !== newName) {
        setStudentList(studentList.map(s => s.className === oldName ? { ...s, className: newName } : s));
        setAttendanceRecords(attendanceRecords.map(a => a.className === oldName ? { ...a, className: newName } : a));
        setStudentGrades(studentGrades.map(g => g.className === oldName ? { ...g, className: newName } : g));
        if (selectedClass === oldName) setSelectedClass(newName);
      }
    } else {
      const newClass: SchoolClass = {
        id: `class-${Date.now()}`,
        name: inputClassName.trim(),
        academicYear: inputClassYear || '2026/2027',
        teacherInCharge: inputClassTeacher || 'Guru Pengampu'
      };
      setClassList([...classList, newClass]);
      setSelectedClass(newClass.name);
    }

    setIsClassModalOpen(false);
    setEditingClass(null);
    setInputClassName('');
    setInputClassTeacher('');
  };

  const handleDeleteClass = (id: string, className: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kelas "${className}"? Data siswa di kelas ini akan ikut terhapus.`)) {
      setClassList(classList.filter(c => c.id !== id));
      setStudentList(studentList.filter(s => s.className !== className));
      if (selectedClass === className) {
        const remaining = classList.filter(c => c.id !== id);
        if (remaining.length > 0) setSelectedClass(remaining[0].name);
      }
    }
  };

  // --- HANDLERS FOR CRUD SISWA & COPY-PASTE ---
  const handleOpenAddStudentModal = () => {
    setEditingStudent(null);
    setInputStudentName('');
    setInputStudentNisn('');
    setInputStudentClass(selectedClass);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudentModal = (student: StudentItem) => {
    setEditingStudent(student);
    setInputStudentName(student.name);
    setInputStudentNisn(student.nisn);
    setInputStudentClass(student.className);
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputStudentName.trim()) return;

    if (editingStudent) {
      setStudentList(studentList.map(s => s.id === editingStudent.id ? {
        ...s,
        name: inputStudentName.trim(),
        nisn: inputStudentNisn.trim() || s.nisn,
        className: inputStudentClass
      } : s));

      // Update name in attendance & grades
      setAttendanceRecords(attendanceRecords.map(a => a.studentId === editingStudent.id ? { ...a, studentName: inputStudentName.trim(), className: inputStudentClass } : a));
      setStudentGrades(studentGrades.map(g => g.studentId === editingStudent.id ? { ...g, studentName: inputStudentName.trim(), className: inputStudentClass } : g));
    } else {
      const newStudent: StudentItem = {
        id: `s-${Date.now()}`,
        name: inputStudentName.trim(),
        nisn: inputStudentNisn.trim() || `005${Math.floor(1000000 + Math.random() * 9000000)}`,
        className: inputStudentClass || selectedClass
      };
      setStudentList([...studentList, newStudent]);

      const todayStr = new Date().toISOString().split('T')[0];
      setAttendanceRecords(prev => [
        ...prev,
        {
          id: `att-${Date.now()}`,
          studentId: newStudent.id,
          studentName: newStudent.name,
          className: newStudent.className,
          date: todayStr,
          status: 'Hadir',
          notes: ''
        }
      ]);

      setStudentGrades(prev => [
        ...prev,
        {
          id: `g-${Date.now()}`,
          studentId: newStudent.id,
          studentName: newStudent.name,
          nisn: newStudent.nisn,
          className: newStudent.className,
          formatif: 80,
          sumatif: 80,
          proyek: 80,
          finalScore: 80,
          kktp: kktpThreshold,
          status: 'Tuntas'
        }
      ]);
    }

    setIsStudentModalOpen(false);
    setEditingStudent(null);
    setInputStudentName('');
    setInputStudentNisn('');
  };

  // Batch Copy-Paste Import
  const handleBatchImportStudents = () => {
    if (!batchPasteText.trim()) return;

    const rawLines = batchPasteText.split(/\r?\n|,/);
    const newStudents: StudentItem[] = [];
    const todayStr = new Date().toISOString().split('T')[0];

    let count = 0;
    rawLines.forEach((line) => {
      let cleaned = line.replace(/^[0-9]+[\.\)\-]\s*/, '').trim();
      if (cleaned.length > 1) {
        count++;
        const generatedId = `s-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const generatedNisn = `005${Math.floor(1000000 + Math.random() * 9000000)}`;
        const studentObj: StudentItem = {
          id: generatedId,
          name: cleaned,
          nisn: generatedNisn,
          className: selectedClass
        };
        newStudents.push(studentObj);
      }
    });

    if (newStudents.length > 0) {
      setStudentList(prev => [...prev, ...newStudents]);

      const newAtt = newStudents.map(s => ({
        id: `att-${s.id}`,
        studentId: s.id,
        studentName: s.name,
        className: s.className,
        date: todayStr,
        status: 'Hadir' as const,
        notes: ''
      }));

      const newGrades = newStudents.map(s => ({
        id: `g-${s.id}`,
        studentId: s.id,
        studentName: s.name,
        nisn: s.nisn,
        className: s.className,
        formatif: 80,
        sumatif: 80,
        proyek: 80,
        finalScore: 80,
        kktp: kktpThreshold,
        status: 'Tuntas' as const
      }));

      setAttendanceRecords(prev => [...prev, ...newAtt]);
      setStudentGrades(prev => [...prev, ...newGrades]);

      alert(`✅ Berhasil mengimpor ${count} siswa baru ke kelas "${selectedClass}"!`);
      setBatchPasteText('');
      setIsBatchImportOpen(false);
    } else {
      alert("⚠️ Tidak ada nama siswa yang terdeteksi dari teks yang disalin.");
    }
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus siswa "${name}"?`)) {
      setStudentList(studentList.filter(s => s.id !== id));
      setAttendanceRecords(attendanceRecords.filter(a => a.studentId !== id));
      setStudentGrades(studentGrades.filter(g => g.studentId !== id));
    }
  };

  // --- HANDLERS FOR CRUD MATERI PEMBELAJARAN ---
  const handleOpenAddMaterialModal = () => {
    setEditingMaterial(null);
    setMatTitle('');
    setMatSubtitle('');
    setMatGrade(10);
    setMatKeyConcepts('');
    setMatSummary('');
    setMatContent('');
    setMatReadingTime('10 menit');
    setIsMaterialModalOpen(true);
  };

  const handleOpenEditMaterialModal = (mat: CustomChapter) => {
    setEditingMaterial(mat);
    setMatTitle(mat.title);
    setMatSubtitle(mat.subtitle || '');
    setMatGrade(mat.grade || 10);
    setMatKeyConcepts(mat.keyConcepts ? mat.keyConcepts.join(', ') : '');
    setMatSummary(mat.summary || '');
    setMatContent(mat.content);
    setMatReadingTime(mat.readingTime || '10 menit');
    setIsMaterialModalOpen(true);
  };

  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim() || !matContent.trim()) return;

    const keyArray = matKeyConcepts
      ? matKeyConcepts.split(',').map(k => k.trim()).filter(Boolean)
      : ['Sosiologi', 'Bahan Ajar Guru'];

    if (editingMaterial) {
      setCustomMaterials(customMaterials.map(m => m.id === editingMaterial.id ? {
        ...m,
        title: matTitle.trim(),
        subtitle: matSubtitle.trim() || 'Materi Tambahan Guru',
        grade: matGrade,
        keyConcepts: keyArray,
        description: matSummary.trim() || matContent.substring(0, 120) + '...',
        content: matContent,
        summary: matSummary.trim() || matContent.substring(0, 150) + '...',
        readingTime: matReadingTime || '10 menit'
      } : m));
    } else {
      const newMat: CustomChapter = {
        id: `cust-${Date.now()}`,
        grade: matGrade,
        title: matTitle.trim(),
        subtitle: matSubtitle.trim() || 'Materi Tambahan Guru',
        description: matSummary.trim() || matContent.substring(0, 120) + '...',
        keyConcepts: keyArray,
        content: matContent,
        summary: matSummary.trim() || matContent.substring(0, 150) + '...',
        readingTime: matReadingTime || '10 menit',
        isCustom: true,
        author: 'Guru Pengampu Sosiologi',
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      setCustomMaterials([newMat, ...customMaterials]);
    }

    setIsMaterialModalOpen(false);
    setEditingMaterial(null);
    setMatTitle('');
    setMatSubtitle('');
    setMatKeyConcepts('');
    setMatSummary('');
    setMatContent('');
  };

  const handleDeleteMaterial = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?`)) {
      setCustomMaterials(customMaterials.filter(m => m.id !== id));
    }
  };

  // Handlers
  const handleAddLessonPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanTitle || !newPlanChapter) return;
    const plan: LessonPlan = {
      id: `lp-${Date.now()}`,
      title: newPlanTitle,
      grade: newPlanGrade,
      chapter: newPlanChapter,
      cpText: newPlanCP || 'Capaian Pembelajaran disesuaikan Kurikulum Merdeka.',
      tpText: newPlanTP || 'Tujuan Pembelajaran utama.',
      atpText: newPlanATP || '1. Pendahuluan -> 2. Inti -> 3. Penutup',
      duration: newPlanDuration,
      activities: newPlanActivities || 'Diskusi interaktif dan presentasi.',
      assessmentMethod: 'Formatif & Sumatif',
      createdDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setLessonPlans([plan, ...lessonPlans]);
    setIsPlanModalOpen(false);
    setNewPlanTitle('');
    setNewPlanChapter('');
    setNewPlanCP('');
    setNewPlanTP('');
    setNewPlanATP('');
    setNewPlanActivities('');
  };

  const handleUpdateAttendance = (id: string, status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa') => {
    setAttendanceRecords(attendanceRecords.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleGradeChange = (id: string, field: 'formatif' | 'sumatif' | 'proyek', value: number) => {
    setStudentGrades(studentGrades.map(g => {
      if (g.id === id) {
        const formatif = field === 'formatif' ? value : g.formatif;
        const sumatif = field === 'sumatif' ? value : g.sumatif;
        const proyek = field === 'proyek' ? value : g.proyek;
        // Calculation: 40% Formatif + 40% Sumatif + 20% Proyek
        const finalScore = Math.round((formatif * 0.4) + (sumatif * 0.4) + (proyek * 0.2));
        let status: 'Tuntas' | 'Remedi' | 'Pengayaan' = 'Tuntas';
        if (finalScore >= kktpThreshold + 10) status = 'Pengayaan';
        else if (finalScore < kktpThreshold) status = 'Remedi';
        
        return {
          ...g,
          formatif,
          sumatif,
          proyek,
          finalScore,
          status
        };
      }
      return g;
    }));
  };

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalTopic) return;
    const j: TeachingJournal = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timeSlot: newJournalSlot,
      className: selectedClass,
      topic: newJournalTopic,
      attendanceSummary: `Hadir: ${attendanceRecords.filter(a => a.status === 'Hadir').length}, Sakit: ${attendanceRecords.filter(a => a.status === 'Sakit').length}, Izin: ${attendanceRecords.filter(a => a.status === 'Izin').length}, Alpa: ${attendanceRecords.filter(a => a.status === 'Alpa').length}`,
      notes: newJournalNotes || 'KBM berjalan lancar sesuai RPP/Modul Ajar.',
      assignment: newJournalAssignment || undefined
    };
    setTeachingJournals([j, ...teachingJournals]);
    setNewJournalTopic('');
    setNewJournalNotes('');
    setNewJournalAssignment('');
  };

  const handleAddStudentLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogStudent || !newLogDesc) return;
    const log: StudentLogRecord = {
      id: `l-${Date.now()}`,
      studentName: newLogStudent,
      className: selectedClass,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: newLogCategory,
      description: newLogDesc,
      parentNotified: false
    };
    setStudentLogs([log, ...studentLogs]);
    setNewLogStudent('');
    setNewLogDesc('');
  };

  const handleToggleParentNotified = (id: string) => {
    setStudentLogs(studentLogs.map(l => l.id === id ? { ...l, parentNotified: !l.parentNotified } : l));
  };

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB');
      alert("✅ Sinkronisasi data Administrasi Guru ke Awan (Cloud Backup & Dapodik API) berhasil!");
    }, 1200);
  };

  // Printable Report Generation
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                Portal Administrasi Guru SMA
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Terintegrasi Dapodik
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Aplikasi Administrasi & KBM Guru
            </h1>
            <p className="text-slate-300 text-xs lg:text-sm max-w-2xl leading-relaxed">
              Pusat kendali perencanaan pembelajaran, presensi siswa, pengolahan nilai KKTP, jurnal mengajar harian, serta pelaporan e-Rapor otomatis.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setActiveSubTab('teacher-bio')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-lg transition-all flex items-center gap-2 hover:scale-105"
            >
              <User className="w-4 h-4" />
              <span>👨‍🏫 Biografi Guru Interaktif</span>
            </button>

            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2 hover:scale-105"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron Data'}</span>
            </button>

            <button
              onClick={handlePrintReport}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Cetak Dokumen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Module Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'manage-classes', label: '🏫 Kelola Kelas & Siswa', icon: Users },
          { id: 'manage-materials', label: '✍️ Tulis & Kelola Materi', icon: BookOpen },
          { id: 'cp-official', label: '📜 CP BSKAP 32/2024', icon: GraduationCap },
          { id: 'atp-official', label: '📋 ATP Sosiologi Fase E', icon: ListOrdered },
          { id: 'teaching-mode', label: '🖥️ Moda Mengajar & Media', icon: Presentation },
          { id: 'teacher-bio', label: '👨‍🏫 Biografi Guru Interaktif', icon: User },
          { id: 'planning', label: '1. Perencanaan (Modul/RPP)', icon: FileText },
          { id: 'attendance', label: '2. Presensi Siswa', icon: UserCheck },
          { id: 'grading', label: '3. Penilaian & KKTP', icon: BarChart3 },
          { id: 'journal', label: '4. Jurnal Mengajar', icon: BookOpen },
          { id: 'reporting', label: '5. E-Rapor & Laporan', icon: FileSpreadsheet },
          { id: 'student-log', label: '6. Catatan Perilaku & BK', icon: Award },
          { id: 'security', label: '7. Keamanan & Cloud', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Class Selector Filter Bar */}
      <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" /> Pilih Kelas Aktif:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {classList.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedClass === cls.name ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 shadow-xs' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cls.name}
              </button>
            ))}
            <button
              onClick={handleOpenAddClassModal}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1"
              title="Tambah Kelas Baru"
            >
              <Plus className="w-3.5 h-3.5" /> Kelas Baru
            </button>
          </div>
        </div>

        <div className="text-xs font-medium text-slate-500">
          Status Cloud: <span className="text-emerald-600 font-bold">● Terhubung (Terakhir sync: {lastSyncTime})</span>
        </div>
      </div>

      {/* MODULE 0A: KELOLA KELAS & SISWA (CRUD KELAS, SISWA & COPY-PASTE IMPORT) */}
      {activeSubTab === 'manage-classes' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Section 1: CRUD Kelas */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Modul Administrasi Kelas
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" /> Kelola Daftar Kelas (CRUD Kelas)
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Tambah, edit nama kelas, tentukan wali kelas, atau hapus kelas yang terdaftar.
                </p>
              </div>

              <button
                onClick={handleOpenAddClassModal}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Kelas Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {classList.map((cls) => {
                const count = studentList.filter(s => s.className === cls.name).length;
                const isSelected = selectedClass === cls.name;
                return (
                  <div
                    key={cls.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-50/80 to-slate-50 border-indigo-300 shadow-md ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                          TA {cls.academicYear}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 mt-1">{cls.name}</h3>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {count} Siswa
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium mb-4 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      Wali Kelas: <span className="font-bold text-slate-800">{cls.teacherInCharge}</span>
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 gap-2">
                      <button
                        onClick={() => setSelectedClass(cls.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ Kelas Aktif' : 'Pilih Kelas'}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditClassModal(cls)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                          title="Edit Class"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClass(cls.id, cls.name)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Class"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: CRUD Siswa & Copy-Paste Roster */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Siswa Kelas: {selectedClass}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Total: {studentList.filter(s => s.className === selectedClass).length} Siswa
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600" /> Daftar Siswa & Fitur Copy-Paste
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Atur nama siswa per kelas, atau salin-tempel langsung seluruh nama siswa dari Excel/Word/WA.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsBatchImportOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md transition-all flex items-center gap-2 hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>⚡ Copy-Paste Banyak Nama</span>
                </button>

                <button
                  onClick={handleOpenAddStudentModal}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Siswa Satu per Satu</span>
                </button>
              </div>
            </div>

            {/* Quick Search */}
            <div className="flex items-center justify-between gap-4 flex-wrap bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchStudentQuery}
                  onChange={(e) => setSearchStudentQuery(e.target.value)}
                  placeholder={`Cari siswa di kelas ${selectedClass}...`}
                  className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Menampilkan <span className="font-bold text-slate-800">
                  {studentList.filter(s => s.className === selectedClass && s.name.toLowerCase().includes(searchStudentQuery.toLowerCase())).length}
                </span> dari {studentList.filter(s => s.className === selectedClass).length} siswa
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">NISN</th>
                    <th className="py-3 px-4">Nama Lengkap Siswa</th>
                    <th className="py-3 px-4">Kelas</th>
                    <th className="py-3 px-4 text-right">Aksi (Edit / Hapus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {studentList
                    .filter(s => s.className === selectedClass && (
                      !searchStudentQuery || s.name.toLowerCase().includes(searchStudentQuery.toLowerCase()) || s.nisn.includes(searchStudentQuery)
                    ))
                    .map((student, idx) => (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 font-mono text-slate-600 font-semibold">{student.nisn}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{student.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-100">
                            {student.className}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditStudentModal(student)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 font-bold transition-colors flex items-center gap-1 text-[11px]"
                            >
                              <Edit3 className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id, student.name)}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-colors flex items-center gap-1 text-[11px]"
                            >
                              <Trash2 className="w-3 h-3" /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {studentList.filter(s => s.className === selectedClass).length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400">
                        <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        <p className="font-bold text-slate-600 text-sm">Belum Ada Siswa Terdaftar di {selectedClass}</p>
                        <p className="text-xs mt-1">Gunakan tombol <strong>"⚡ Copy-Paste Banyak Nama"</strong> untuk memasukkan seluruh nama siswa dalam hitungan detik.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 0B: MANAJEMEN MATERI PEMBELAJARAN GURU (CRUD MATERI / COPY-PASTE MATERI) */}
      {activeSubTab === 'manage-materials' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Modul Konten Pembelajaran Guru
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" /> Tulis & Kelola Materi Sosiologi (CRUD Materi)
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Tulis atau salin-tempel (copy-paste) materi, rangkuman, dan modul ajar langsung. Otomatis tampil di Ruang Baca Siswa & Audio TTS.
                </p>
              </div>

              <button
                onClick={handleOpenAddMaterialModal}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start md:self-auto hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>✍️ Tulis / Copy-Paste Materi Baru</span>
              </button>
            </div>

            {/* Filter Grade */}
            <div className="flex items-center justify-between gap-4 flex-wrap bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Tingkat:</span>
                <button
                  onClick={() => setFilterMaterialGrade('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterMaterialGrade === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  Semua Tingkat
                </button>
                <button
                  onClick={() => setFilterMaterialGrade(10)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterMaterialGrade === 10 ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  Kelas 10
                </button>
                <button
                  onClick={() => setFilterMaterialGrade(11)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterMaterialGrade === 11 ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  Kelas 11
                </button>
                <button
                  onClick={() => setFilterMaterialGrade(12)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterMaterialGrade === 12 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  Kelas 12
                </button>
              </div>

              <div className="text-xs font-medium text-slate-500">
                Materi Khusus Buatan Guru: <span className="font-bold text-indigo-700">{customMaterials.length} Bab</span>
              </div>
            </div>

            {/* Materials List Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {customMaterials
                .filter(m => filterMaterialGrade === 'all' || m.grade === filterMaterialGrade)
                .map((mat) => (
                  <div key={mat.id} className="bg-white rounded-2xl p-6 border border-indigo-200 shadow-xs space-y-4 hover:shadow-md transition-shadow relative">
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold">
                            [Materi Guru] Kelas {mat.grade}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{mat.createdAt || 'Baru'}</span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900">{mat.title}</h3>
                        <p className="text-xs text-slate-500 font-medium">{mat.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenEditMaterialModal(mat)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                          title="Edit Materi"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMaterial(mat.id, mat.title)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Hapus Materi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700 leading-relaxed font-normal whitespace-pre-wrap max-h-36 overflow-y-auto">
                        {mat.content}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {mat.keyConcepts?.map((kc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                            #{kc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <span className="text-slate-500 text-[11px] font-medium">
                        Penulis: <strong className="text-slate-700">{mat.author || 'Guru Sosiologi'}</strong>
                      </span>

                      <span className="text-indigo-600 font-bold flex items-center gap-1 text-[11px]">
                        <Clock className="w-3.5 h-3.5" /> Estimasi {mat.readingTime}
                      </span>
                    </div>
                  </div>
                ))}

              {customMaterials.length === 0 && (
                <div className="lg:col-span-2 py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <BookOpen className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                  <p className="font-bold text-slate-700">Belum Ada Materi Pembelajaran Khusus Guru</p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                    Klik tombol di bawah ini untuk langsung menulis atau melakukan copy-paste materi modul dari dokumen Anda.
                  </p>
                  <button
                    onClick={handleOpenAddMaterialModal}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                  >
                    ✍️ Tulis & Copy-Paste Materi Pertama
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 0C: CAPAIAN PEMBELAJARAN RESMI BSKAP NO. 32 TAHUN 2024 */}
      {activeSubTab === 'cp-official' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
            {/* Header Document Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400 text-slate-950 border border-amber-300 inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Dokumen Resmi Kurikulum Merdeka
                </span>
                <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight">
                  CAPAIAN PEMBELAJARAN (CP) MATA PELAJARAN IPS
                </h2>
                <p className="text-xs text-slate-300 font-medium">
                  Berdasarkan <strong>Keputusan Kepala BSKAP Kemendikbudristek Nomor: 032/H/KR/2024</strong> (Fase E - SMA / MA / Program Paket C).
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap shrink-0 z-10">
                <button
                  onClick={() => {
                    const cpText = `CAPAIAN PEMBELAJARAN MATA PELAJARAN : ILMU PENGETAHUAN SOSIAL (Keputusan BSKAP Nomor : 32 Tahun 2024)\n\nA. RASIONAL\nIndonesia merupakan bangsa dengan sumber daya manusia yang besar dan sumber daya alam yang melimpah...\n\nB. TUJUAN\n1. Memahami konsep-konsep...\n2. Memiliki keterampilan berpikir kritis...\n3. Memiliki komitmen nilai sosial...\n4. Menunjukkan hasil pemahaman konsep...\n\nC. KARAKTERISTIK\nMata pelajaran IPS pada Fase E mencakup Sosiologi, Antropologi, Geografi, Ekonomi, dan Sejarah...\n\nD. CAPAIAN PEMBELAJARAN FASE E\nPemahaman Konsep & Keterampilan Proses...`;
                    navigator.clipboard.writeText(cpText);
                    setCpCopied(true);
                    setTimeout(() => setCpCopied(false), 3000);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 hover:scale-105"
                >
                  {cpCopied ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
                  <span>{cpCopied ? 'Tersalin ke Clipboard!' : '📋 Salin Teks CP Lengkap'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSubTab('planning');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>⚡ Gunakan di Modul Ajar/RPP</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bagian CP:</span>
                {[
                  { id: 'all', label: 'Semua Bagian' },
                  { id: 'rasional', label: 'A. Rasional' },
                  { id: 'tujuan', label: 'B. Tujuan' },
                  { id: 'karakteristik', label: 'C. Karakteristik' },
                  { id: 'faseE', label: 'D. CP Fase E' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setCpActiveSection(sec.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      cpActiveSection === sec.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={cpSearchTerm}
                  onChange={(e) => setCpSearchTerm(e.target.value)}
                  placeholder="Cari kata kunci CP (e.g. sosiologi, inkuiri)..."
                  className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-slate-800 leading-relaxed text-xs">
              {/* SECTION A: RASIONAL */}
              {(cpActiveSection === 'all' || cpActiveSection === 'rasional') && (
                <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-black text-indigo-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" /> A. RASIONAL MATA PELAJARAN IPS
                  </h3>
                  <p className="text-justify font-normal leading-relaxed text-slate-700">
                    Indonesia merupakan bangsa dengan sumber daya manusia yang besar dan sumber daya alam yang melimpah, kaya dengan budaya, suku bangsa, bahasa, serta terdiri dari berbagai agama dan kepercayaan. Secara geografis letak Indonesia sangat strategis, sehingga menjadikan Indonesia sebagai bangsa yang sangat diperhitungakan secara geopolitik dalam kancah internasional.
                  </p>
                  <p className="text-justify font-normal leading-relaxed text-slate-700">
                    Indonesia di tahun-tahun mendatang akan mengalami bonus demografi, yaitu jumlah penduduk usia produktif (berusia 15-64 tahun) lebih besar dibandingkan penduduk usia tidak produktif (berusia di bawah 15 tahun dan di atas 64 tahun). Keadaan ini membutuhkan solusi rasional serta terukur secara ilmiah, sehingga bonus demografi akan menjadi sumber kekuatan bangsa. Sumber daya manusia Indonesia terutama yang berusia produktif perlu memiliki kemampuan-kemampuan yang mendukungnya berkontribusi di masyarakat. Indonesia perlu menghasilkan sumber daya manusia yang mampu mengelola dan menjaga sumber daya alam untuk kesejahteraan bangsa berdasarkan ilmu pengetahuan dan teknologi dan prinsip keadilan sosial.
                  </p>
                  <p className="text-justify font-normal leading-relaxed text-slate-700 bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 font-medium">
                    Pendidikan Ilmu Pengetahuan Sosial (IPS) memiliki peran penting dalam hal ini. Oleh karena itu pembelajaran IPS diharapkan lebih menggali keterampilan berpikir melalui pengembangan kompetensi dalam elemen keterampilan proses yang berpusat pada peserta didik. Pendidikan Ilmu Pengetahuan Sosial (IPS) memiliki peran penting dalam hal ini. Dengan pendekatan pembelajaran inkuiri yang berpusat pada peserta didik, mata pelajaran IPS menjadi sarana untuk meningkatkan pengetahuan dan keterampilan terkait kehidupan masyarakat dengan lingkungannya. Termasuk di dalamnya membangun komitmen dan kesadaran terhadap nilai-nilai sosial dan kemanusiaan yang akan menjadi modal untuk berkolaborasi dalam masyarakat yang majemuk, baik di tingkat lokal, nasional maupun global dengan tetap berpegang teguh kepada nilai-nilai Pancasila sebagai kepribadian bangsa.
                  </p>
                </div>
              )}

              {/* SECTION B: TUJUAN */}
              {(cpActiveSection === 'all' || cpActiveSection === 'tujuan') && (
                <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-black text-indigo-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Award className="w-4 h-4 text-indigo-600" /> B. TUJUAN MATA PELAJARAN IPS
                  </h3>
                  <p className="font-normal text-slate-700">
                    Tujuan mata pelajaran IPS adalah peserta didik memahami konsep-konsep yang berkaitan dengan kehidupan masyarakat serta memiliki keterampilan berpikir kritis, analitis, kreatif, adaptif, dan solutif di tengah perkembangan global. Tujuan mata pelajaran IPS secara terperinci adalah:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-black text-[10px]">Poin 1</span>
                      <p className="font-bold text-slate-900">Memahami Konsep Ruang & Waktu</p>
                      <p className="text-slate-600 text-[11px]">Memahami konsep-konsep yang berkaitan dengan kehidupan manusia dalam ruang dan waktu meliputi bidang sosial, budaya, dan ekonomi.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[10px]">Poin 2</span>
                      <p className="font-bold text-slate-900">Keterampilan Berpikir & Kolaborasi</p>
                      <p className="text-slate-600 text-[11px]">Memiliki keterampilan dalam berpikir kritis, berkomunikasi, membangkitkan kreativitas, dan berkolaborasi dalam masyarakat global.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-[10px]">Poin 3</span>
                      <p className="font-bold text-slate-900">Komitmen & Nilai Kemanusiaan</p>
                      <p className="text-slate-600 text-[11px]">Memiliki komitmen dan kesadaran terhadap nilai-nilai sosial kemanusiaan dan lingkungan untuk menumbuhkan kecintaan terhadap bangsa dan negara.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px]">Poin 4</span>
                      <p className="font-bold text-slate-900">Aksi Nyata & Karya Sosial</p>
                      <p className="text-slate-600 text-[11px]">Menunjukkan hasil pemahaman konsep pengetahuan dan mengasah keterampilan melalui karya atau aksi sosial yang bermanfaat.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION C: KARAKTERISTIK */}
              {(cpActiveSection === 'all' || cpActiveSection === 'karakteristik') && (
                <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-black text-indigo-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Sliders className="w-4 h-4 text-indigo-600" /> C. KARAKTERISTIK MATA PELAJARAN IPS (FASE E)
                  </h3>
                  <p className="text-justify font-normal leading-relaxed text-slate-700">
                    Karakteristik mata pelajaran IPS pada Fase E adalah mata pelajaran dengan berbagai muatan, seperti Sosiologi, Antropologi, Geografi, Ekonomi, dan Sejarah. Mata pelajaran IPS mempelajari kehidupan manusia dalam lingkup sosial, budaya, dan ekonomi di masyarakat serta dalam konteks perubahan ruang dan waktu.
                  </p>
                  <p className="text-justify font-normal leading-relaxed text-slate-700">
                    Mata Pelajaran IPS pada Fase E dapat diajarkan tersendiri melalui mata pelajaran Sosiologi, Antropologi, Geografi, Ekonomi, dan Sejarah ataupun terpadu. Materi IPS yang diajarkan terpadu pada Fase E dilaksanakan dengan <strong>unit of inquiry</strong>, yaitu sebuah projek untuk menyelesaikan sebuah masalah atau isu sosial dari berbagai sudut pandang baik itu Sosiologi, Antropologi, Geografi, Ekonomi, dan Sejarah.
                  </p>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 mt-3">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-200/80 text-slate-900 font-bold border-b border-slate-300">
                          <th className="py-2.5 px-4 w-1/4">Elemen</th>
                          <th className="py-2.5 px-4">Deskripsi Elemen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        <tr>
                          <td className="py-3 px-4 font-extrabold text-indigo-900 align-top">Pemahaman Konsep</td>
                          <td className="py-3 px-4 leading-relaxed text-slate-700">
                            Mata pelajaran IPS diawali dengan pemahaman terhadap materi meliputi definisi dan konsep yang dikaitkan dengan peristiwa dan fenomena manusia pada bidang sosial, ekonomi, budaya, dan lingkungan. Pemahaman konsep difokuskan pada materi yang digunakan untuk menjawab pertanyaan kunci. Mengarahkan peserta didik untuk dapat mendefinisikan, menafsirkan, dan merumuskan konsep atau teori dengan bahasa mereka sendiri.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-extrabold text-emerald-900 align-top">Keterampilan Proses</td>
                          <td className="py-3 px-4 leading-relaxed text-slate-700">
                            Pendekatan keterampilan proses fokus pada proses belajar, aktivitas, dan kreativitas peserta didik dalam memperoleh pengetahuan, nilai, dan sikap, serta mengaplikasikannya. Keterampilan proses meliputi kegiatan <strong>mengamati, menanya, mengumpulkan informasi, mengorganisasikan, menarik kesimpulan, mengomunikasikan, merefleksikan, dan merencanakan projek lanjutan</strong>.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SECTION D: CAPAIAN PEMBELAJARAN FASE E */}
              {(cpActiveSection === 'all' || cpActiveSection === 'faseE') && (
                <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <h3 className="text-sm font-black text-indigo-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" /> D. CAPAIAN PEMBELAJARAN FASE E (KELAS X SMA/MA/PROGRAM PAKET C)
                  </h3>
                  <p className="text-justify font-medium leading-relaxed text-slate-800 bg-amber-50 p-4 rounded-xl border border-amber-200">
                    Pada akhir Fase E, peserta didik memahami konsep dasar berbagai bidang ilmu sosial sebagai ilmu yang mengkaji manusia dan lingkungannya untuk memberikan landasan berpikir kritis, analitis, kreatif, adaptif, dan solutif dalam merespons peristiwa dan fenomena sosial, budaya, dan ekonomi yang terjadi di masyarakat dalam lingkup lokal, nasional, dan global.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-2xs space-y-3">
                      <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                        <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-[11px]">
                          Elemen: Pemahaman Konsep (Sosiologi & IPS)
                        </span>
                      </div>
                      <ul className="space-y-2 text-slate-700 font-medium list-disc list-inside leading-relaxed">
                        <li><strong>Peserta didik mampu memahami fungsi sosiologi</strong> sebagai ilmu yang secara kritis, analitis, kreatif, dan solutif mengkaji masyarakat.</li>
                        <li><strong>Peserta didik mampu memahami status dan peran individu</strong> dalam kelompok sosial dan memahami berbagai ragam gejala sosial yang ada di dalam masyarakat.</li>
                        <li><strong>Peserta didik mampu memahami keragaman manusia dan budayanya</strong> sebagai bagian dari masyarakat multikultural.</li>
                        <li>Peserta didik memahami hakikat ilmu ekonomi sebagai ilmu yang mempelajari upaya manusia dalam memenuhi kebutuhan hidupnya.</li>
                        <li>Peserta didik memahami lembaga serta produk keuangan bank dan nonbank.</li>
                        <li>Peserta didik memahami konsep dasar Geografi, peta, SIG, dan fenomena geosfer.</li>
                        <li>Peserta didik memahami konsep dasar ilmu sejarah dan penelitian sejarah.</li>
                      </ul>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-3">
                      <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-[11px]">
                          Elemen: Keterampilan Proses
                        </span>
                      </div>
                      <p className="font-bold text-slate-900">Peserta didik mampu:</p>
                      <ul className="space-y-2 text-slate-700 font-medium list-disc list-inside leading-relaxed">
                        <li><strong>Mengamati</strong> fenomena kehidupan manusia dalam dimensi ruang dan waktu secara sistematis serta menemukan persamaan dan perbedaannya dan potensinya.</li>
                        <li><strong>Membuat pertanyaan</strong> secara mandiri untuk menggali informasi tentang fenomena kehidupan manusia secara sistematis.</li>
                        <li><strong>Mengumpulkan informasi</strong> dari sumber primer dan/atau sekunder, melakukan observasi, dan mendokumentasikannya.</li>
                        <li><strong>Menarik simpulan</strong> berdasarkan informasi yang diperoleh dari sumber primer/sekunder, hasil observasi dan dokumentasi.</li>
                        <li><strong>Mengomunikasikan hasil analisis</strong> informasi dalam bentuk media digital dan/atau nondigital.</li>
                        <li><strong>Merefleksikan hasil analisis</strong> serta menyusun rencana tindak lanjut projek kolaboratif.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 0D: FITUR MANAJEMEN & PENYAMPAIAN MATERI AI (TEACHING CONTENT & MEDIA) */}
      {activeSubTab === 'teaching-mode' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Sub-navigation for Teaching Content */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'projector', label: '📺 Slide Presentasi & Live Poll', icon: Tv },
              { id: 'whiteboard', label: '🎨 Papan Tulis Digital (Canvas)', icon: PenTool },
              { id: 'library', label: '📚 Pustaka Media & Modul Video', icon: Video },
              { id: 'sharing', label: '📲 Akses Siswa & Mode Luring', icon: Share2 },
            ].map((st) => {
              const Icon = st.icon;
              const isActive = teachingSubTab === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setTeachingSubTab(st.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* SUBTAB 1: PROJECTOR MODE & LIVE POLL */}
          {teachingSubTab === 'projector' && (
            <div className="bg-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    <Tv className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      Moda Proyektor & Presentasi Interaktif Sosiologi
                    </h2>
                    <p className="text-xs text-slate-400">
                      Tampilkan slide materi pembelajaran langsung ke proyektor/layar kelas & pemicu kuis cepat.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPollModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>⚡ Picu Kuis Cepat / Live Poll</span>
                  </button>
                </div>
              </div>

              {/* Slide Viewer Frame */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 min-h-[360px] flex flex-col justify-between relative shadow-inner">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Slide {activeSlideIndex + 1} dari {presentationSlides.length}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Kelas {selectedClass}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-amber-400 tracking-tight">
                      {presentationSlides[activeSlideIndex].title}
                    </h3>
                    <p className="text-xs font-bold text-slate-400">
                      {presentationSlides[activeSlideIndex].subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-normal bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    {presentationSlides[activeSlideIndex].content}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-300 font-medium">
                    {presentationSlides[activeSlideIndex].bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Slide Controls */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4 flex-wrap">
                  <button
                    disabled={activeSlideIndex === 0}
                    onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white transition-all"
                  >
                    ← Slide Sebelumnya
                  </button>

                  <div className="flex items-center gap-1.5">
                    {presentationSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          activeSlideIndex === idx ? 'bg-amber-400 w-6' : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={activeSlideIndex === presentationSlides.length - 1}
                    onClick={() => setActiveSlideIndex(prev => Math.min(presentationSlides.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-bold text-white transition-all"
                  >
                    Slide Selanjutnya →
                  </button>
                </div>
              </div>

              {/* Live Poll Active Result Banner */}
              {isPollActive && (
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 p-6 rounded-2xl border border-indigo-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-indigo-800/50 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Live Poll / Kuis Interaktif Sesi Mengajar</span>
                    </div>
                    <span className="text-xs text-indigo-300 font-bold">{pollTotalVotes} Siswa Menjawab</span>
                  </div>

                  <p className="text-sm font-bold text-white">{pollQuestion}</p>

                  <div className="space-y-2 text-xs">
                    {pollOptions.map((opt) => {
                      const pct = Math.round((opt.votes / pollTotalVotes) * 100) || 0;
                      return (
                        <div key={opt.id} className="space-y-1">
                          <div className="flex justify-between font-medium text-slate-300">
                            <span>{opt.text}</span>
                            <span className="font-bold text-amber-400">{pct}% ({opt.votes} suara)</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUBTAB 2: PAPAN TULIS DIGITAL (WHITEBOARD CANVAS) */}
          {teachingSubTab === 'whiteboard' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-indigo-600" /> Papan Tulis Digital (Whiteboard Canvas Sesi Mengajar)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Coret-coret rumus, gambar diagram sosiologi, atau beri catatan visual langsung saat mengajar di kelas.
                  </p>
                </div>

                {/* Whiteboard Toolbar Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setWbTool('pencil')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        wbTool === 'pencil' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      <PenTool className="w-3.5 h-3.5" /> Pensil
                    </button>
                    <button
                      onClick={() => setWbTool('eraser')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        wbTool === 'eraser' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      <Eraser className="w-3.5 h-3.5" /> Penghapus
                    </button>
                  </div>

                  {/* Color Palette */}
                  <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1.5 rounded-xl border border-slate-200">
                    {['#4f46e5', '#dc2626', '#059669', '#d97706', '#0f172a'].map((c) => (
                      <button
                        key={c}
                        onClick={() => { setWbColor(c); setWbTool('pencil'); }}
                        style={{ backgroundColor: c }}
                        className={`w-5 h-5 rounded-full transition-transform ${wbColor === c ? 'scale-125 ring-2 ring-indigo-500' : 'hover:scale-110'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={clearWhiteboard}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    Bersihkan Papan
                  </button>

                  <button
                    onClick={() => {
                      setWbSavedAlert(true);
                      setTimeout(() => setWbSavedAlert(false), 3500);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Bagikan ke Siswa
                  </button>
                </div>
              </div>

              {wbSavedAlert && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Coretan Papan Tulis Berhasil Disimpan & Otomatis Terkirim ke Aplikasi Siswa ({selectedClass})!</span>
                </div>
              )}

              {/* HTML5 Canvas Element */}
              <div className="border-2 border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-white">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={420}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-[420px] cursor-crosshair touch-none"
                />
              </div>
            </div>
          )}

          {/* SUBTAB 3: PUSTAKA MEDIA & MODUL DIGITAL */}
          {teachingSubTab === 'library' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Video className="w-5 h-5 text-indigo-600" /> Pustaka Media & Modul Pembelajaran Digital
                  </h2>
                  <p className="text-xs text-slate-500">
                    Kumpulan video YouTube, rekaman audio podcast, dan file modul PDF pendukung materi Sosiologi.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddMediaModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Tambah Media Pembelajaran
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaList.map((med) => (
                  <div key={med.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                          {med.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{med.addedDate}</span>
                      </div>

                      <h3 className="font-extrabold text-sm text-slate-900">{med.title}</h3>
                      <p className="text-xs text-slate-600 font-medium">{med.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      {med.type === 'video' ? (
                        <a
                          href={med.url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4 fill-white" /> Putar Video YouTube
                        </a>
                      ) : med.type === 'audio' ? (
                        <audio controls src={med.url} className="w-full h-8" />
                      ) : (
                        <a
                          href={med.url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4 text-indigo-300" /> Unduh Dokumen PDF
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 4: AKSES SISWA & MODE LURING */}
          {teachingSubTab === 'sharing' && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-indigo-600" /> Akses Pembagian Materi & Mode Akses Luring (Offline)
                </h2>
                <p className="text-xs text-slate-500">
                  Bagikan rangkuman materi hari ini via QR Code / Link ke HP siswa, dan aktifkan mode luring saat koneksi internet kelas lemah.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* QR Code Sharing Box */}
                <div className="bg-gradient-to-br from-indigo-50 to-slate-50 p-6 rounded-2xl border border-indigo-200 text-center space-y-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-600 text-white">
                    Pindai QR Code di Kelas
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">QR Code Akses Rangkuman Materi Siswa</h3>
                  
                  <div className="bg-white p-4 rounded-2xl border border-slate-300 w-44 h-44 mx-auto flex flex-col items-center justify-center shadow-md">
                    <QrCode className="w-32 h-32 text-indigo-950" />
                  </div>

                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Arahkan kamera smartphone siswa ke QR Code di atas untuk langsung membuka slide & rangkuman materi kelas <strong>{selectedClass}</strong>.
                  </p>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://sosiologi.app/share/materi-${selectedClass.toLowerCase().replace(/\s+/g, '-')}`);
                      setShareCopySuccess(true);
                      setTimeout(() => setShareCopySuccess(false), 3000);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-md inline-flex items-center gap-2"
                  >
                    {shareCopySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{shareCopySuccess ? 'Link Teraplikasi Tersalin!' : 'Salin Tautan Akses Siswa'}</span>
                  </button>
                </div>

                {/* Offline Access Mode Control */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <WifiOff className="w-3.5 h-3.5" /> Mode Akses Luring (Offline)
                      </span>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isOfflineMode}
                          onChange={(e) => setIsOfflineMode(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <h3 className="text-base font-extrabold text-white">Penyimpanan Kas Luring Aplikasi</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Saat Mode Akses Luring aktif, seluruh slide presentasi, coretan papan tulis, dan materi lokal tersimpan otomatis di memori browser. Anda dapat terus mengajar dengan lancar di dalam kelas tanpa bergantung pada koneksi internet.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Status Memori Lokal:</span>
                      <strong className="text-emerald-400">🟢 Siap Luring (100% Tersimpan)</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Total Ukuran Berkas:</span>
                      <strong className="text-white">12.4 MB</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 0D-2: ALUR DAN TUJUAN PEMBELAJARAN (ATP) RESMI */}
      {activeSubTab === 'atp-official' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner ATP */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-black uppercase tracking-wider">
                    Dokumen Kurikulum Merdeka Resmi
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold">
                    Fase E (Kelas X SMA)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">
                    44 JP / 15 Minggu (3 JP/Minggu)
                  </span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                  Alur dan Tujuan Pembelajaran (ATP) Sosiologi
                </h2>

                <p className="text-xs lg:text-sm text-slate-300 font-medium">
                  SMA ISLAM AL-GHOZALI • Penyusun: <strong>Liyas Syarifudin, S.Pd.I., M.Pd.</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    const textContent = `ALUR DAN TUJUAN PEMBELAJARAN (ATP) SOSIOLOGI FASE E KELAS 10\nSMA ISLAM AL-GHOZALI\nPenyusun: Liyas Syarifudin, S.Pd.I, M.Pd.\nAlokasi Waktu: 44 JP / 15 Minggu / 3 JP per minggu\n\n` +
                      officialAtpList.map(item => `[${item.code}] ${item.topic}\nFase E: ${item.faseE}\nKata Kunci: ${item.keyword}\nIndikator Penilaian:\n` + item.indicators.map((ind, i) => `  ${i+1}. ${ind}`).join('\n')).join('\n\n');
                    navigator.clipboard.writeText(textContent);
                    setAtpCopiedCode('all');
                    setTimeout(() => setAtpCopiedCode(null), 3000);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 hover:scale-105"
                >
                  {atpCopiedCode === 'all' ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                  <span>{atpCopiedCode === 'all' ? 'Teks ATP Tersalin!' : '📋 Salin Seluruh ATP'}</span>
                </button>

                <button
                  onClick={handlePrintReport}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Dokumen ATP</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Penyusun</span>
                <strong className="text-amber-300">Liyas Syarifudin, M.Pd.</strong>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Satuan Pendidikan</span>
                <strong className="text-white">SMA ISLAM AL-GHOZALI</strong>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Mata Pelajaran & Fase</span>
                <strong className="text-emerald-400">Sosiologi • Fase E (Kelas 10)</strong>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Alokasi</span>
                <strong className="text-indigo-300">44 JP (15 Minggu / 3 JP)</strong>
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar inside ATP */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'table', label: '📊 Tabel Alur Tujuan Pembelajaran (10.1 - 10.7)', icon: ListOrdered },
              { id: 'info', label: 'ℹ️ Informasi Umum & Elemen Capaian', icon: GraduationCap },
              { id: 'profil', label: '🇮🇩 Profil Pelajar Pancasila & Glosarium', icon: Sparkles },
              { id: 'rasional', label: '💡 Rasional & Catatan Penggunaan', icon: HelpCircle },
            ].map((st) => {
              const Icon = st.icon;
              const isActive = atpSubTab === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setAtpSubTab(st.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* ATP TAB 1: TABEL ALUR TUJUAN PEMBELAJARAN */}
          {atpSubTab === 'table' && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-indigo-600" /> Rincian Tujuan Pembelajaran & Indikator Penilaian
                  </h3>
                  <p className="text-xs text-slate-500">
                    7 Alur Pembelajaran utama sosiologi Fase E beserta indikator asesmen autentik.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Cari kata kunci / topik ATP..."
                      value={atpSearchQuery}
                      onChange={(e) => setAtpSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-56"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (expandedAtpCode) setExpandedAtpCode(null);
                      else setExpandedAtpCode('10.1');
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                  >
                    {expandedAtpCode ? 'Tutup Semua Rincian' : 'Buka Semua Rincian'}
                  </button>
                </div>
              </div>

              {/* List of 10.1 - 10.7 */}
              <div className="space-y-4">
                {officialAtpList
                  .filter((item) => {
                    if (!atpSearchQuery) return true;
                    const q = atpSearchQuery.toLowerCase();
                    return (
                      item.code.toLowerCase().includes(q) ||
                      item.topic.toLowerCase().includes(q) ||
                      item.faseE.toLowerCase().includes(q) ||
                      item.keyword.toLowerCase().includes(q) ||
                      item.indicators.some(ind => ind.toLowerCase().includes(q))
                    );
                  })
                  .map((item) => {
                    const isExpanded = expandedAtpCode === item.code || expandedAtpCode === 'all';
                    return (
                      <div
                        key={item.code}
                        className={`rounded-2xl border transition-all ${
                          isExpanded ? 'border-indigo-300 bg-indigo-50/20 shadow-xs' : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                        }`}
                      >
                        {/* Header Row */}
                        <div
                          onClick={() => setExpandedAtpCode(isExpanded ? null : item.code)}
                          className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs shrink-0 shadow-xs">
                              {item.code}
                            </span>
                            <div>
                              <h4 className="font-extrabold text-sm text-slate-900">{item.topic}</h4>
                              <p className="text-xs text-slate-500 font-medium">Kata Kunci: <span className="text-indigo-700 font-bold">{item.keyword}</span></p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                              {item.indicators.length} Indikator Penilaian
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const text = `[ATP ${item.code}] ${item.topic}\nFase E: ${item.faseE}\nIndikator:\n` + item.indicators.map((ind, i) => `${i+1}. ${ind}`).join('\n');
                                navigator.clipboard.writeText(text);
                                setAtpCopiedCode(item.code);
                                setTimeout(() => setAtpCopiedCode(null), 2500);
                              }}
                              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold"
                              title="Salin ATP ini"
                            >
                              {atpCopiedCode === item.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 border-t border-slate-200/60 space-y-4 animate-fadeIn">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Capaian Pembelajaran (Fase E)</span>
                              <p className="text-xs text-slate-800 font-medium leading-relaxed">{item.faseE}</p>
                            </div>

                            <div className="space-y-2">
                              <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Indikator Penilaian & Asesmen:
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {item.indicators.map((ind, idx) => (
                                  <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span className="font-medium leading-normal">{ind}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ATP TAB 2: INFORMASI UMUM & ELEMEN */}
          {atpSubTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informasi Umum Card */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" /> 1. Informasi Umum Mata Pelajaran
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold">Penyusun Document:</span>
                    <strong className="text-slate-900">Liyas Syarifudin, S.Pd.I., M.Pd.</strong>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold">Nama Sekolah:</span>
                    <strong className="text-slate-900">SMA ISLAM AL-GHOZALI</strong>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold">Mata Pelajaran:</span>
                    <strong className="text-indigo-600 font-black">Sosiologi</strong>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold">Fase / Kelas:</span>
                    <strong className="text-emerald-700 font-extrabold">Fase E / Kelas X (Sepuluh)</strong>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold">Total Alokasi Jam:</span>
                    <strong className="text-amber-800 font-extrabold">44 JP / 15 Minggu / 3 JP per minggu</strong>
                  </div>
                </div>
              </div>

              {/* 2. Elemen / Kompetensi */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" /> 2. Elemen & Kompetensi Utama
                </h3>

                <div className="space-y-4">
                  <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 space-y-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-[10px] uppercase">
                      Pemahaman Konsep
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Pada akhir fase ini, peserta didik mampu memahami fungsi sosiologi sebagai ilmu yang secara kritis mengkaji masyarakat. Di samping itu peserta didik mampu mengenal identitas diri, menjelaskan tindakan sosial, menjelaskan hubungan sosial, menjelaskan peran lembaga sosial dalam mewujudkan tertib sosial, dan memahami berbagai ragam gejala sosial yang ada di masyarakat multikultural melalui konsep-konsep dasar sosiologi.
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px] uppercase">
                      Keterampilan Proses
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Pada akhir fase ini, peserta didik mampu melakukan penelitian sosial sederhana dengan memilih metode yang tepat untuk mengamati, menanya, mengumpulkan informasi, mengorganisasikan informasi, menarik kesimpulan, dan mengomunikasikan hasil penelitian tentang berbagai keragaman gejala sosial dengan konsep dasar sosiologi. Peserta didik mampu merefleksikan dan merencanakan projek lanjutan secara kolaboratif.
                    </p>
                  </div>
                </div>
              </div>

              {/* Capaian Pembelajaran Pertahun Card (Full Width) */}
              <div className="lg:col-span-2 bg-slate-900 text-white rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-xl space-y-4">
                <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> 3. Capaian Pembelajaran Pertahun (Fase E)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-amber-300">A. Elemen Pemahaman Konsep</h4>
                    <p className="text-slate-300 leading-relaxed text-justify">
                      Merupakan kemampuan seseorang untuk mengerti atau memahami sesuatu dan dapat melihatnya dalam berbagai dimensi. Seseorang dikatakan memahami suatu hal apabila ia dapat memberikan penjelasan dan meniru hal tersebut dengan menggunakan kata-katanya sendiri. Seseorang dikatakan memahami konsep jika ia dapat mengaitkan konsep tersebut ke dalam pengetahuan yang dimilikinya.
                    </p>
                    <p className="text-slate-400 italic">
                      Peserta didik tidak hanya sekedar tahu dan hafal tentang definisi konsep Sosiologi, tetapi dia juga tahu bagaimana dan mengapa suatu realita dan gejala sosial dapat terjadi secara komprehensif dan bermakna.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-emerald-400">B. Elemen Keterampilan Proses</h4>
                    <p className="text-slate-300 leading-relaxed text-justify">
                      Merupakan kegiatan pembelajaran yang melibatkan secara maksimal seluruh kemampuan peserta didik untuk mencari dan menyelidiki suatu fenomena secara sistematis, kritis, analitis, dan logis. Keterampilan proses menuntut adanya keterlibatan intelektual dan kesadaran sosial.
                    </p>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">7 Sub Elemen Keterampilan Proses:</span>
                      <ol className="list-decimal list-inside text-[11px] text-slate-300 space-y-0.5">
                        <li>Mengamati</li>
                        <li>Menanya</li>
                        <li>Mengumpulkan Informasi</li>
                        <li>Mengorganisasikan Informasi</li>
                        <li>Menarik Kesimpulan</li>
                        <li>Mengomunikasikan</li>
                        <li>Merefleksikan & Merencanakan Projek Lanjutan Kolaboratif</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ATP TAB 3: PROFIL PELAJAR PANCASILA & GLOSARIUM */}
          {atpSubTab === 'profil' && (
            <div className="space-y-6">
              {/* Profil Pelajar Pancasila Card */}
              <div className="bg-gradient-to-br from-amber-50 via-white to-indigo-50 rounded-3xl p-6 lg:p-8 border border-amber-200 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-amber-100 pb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" /> 6. Integrasi Profil Pelajar Pancasila
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[10px] uppercase">
                      Bernalar Kritis
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Menjelaskan alasan untuk mendukung pemikirannya dan memikirkan pandangan yang mungkin berlawanan dengan pemikirannya serta mengubah pemikirannya jika diperlukan. Menganalisis dan mengevaluasi penalaran dalam mencari solusi.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-black text-[10px] uppercase">
                      Berkebinekaan Global
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Menganalisis berbagai pengaruh keanggotaan diri terhadap pembentukan identitas diri. Mengidentifikasi dan mendeskripsikan keragaman sosial di sekitarnya serta peran sosialnya.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-[10px] uppercase">
                      Kreatif
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Mengeksplorasi dan mengekspresikan pikiran dan/atau perasaannya dalam bentuk karya dan/atau tindakan, serta mengevaluasi dampak dan risikonya menggunakan berbagai perspektif.
                    </p>
                  </div>
                </div>
              </div>

              {/* Glosarium Interaktif */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" /> 7. Glosarium Istilah Sosiologi
                    </h3>
                    <p className="text-xs text-slate-500">
                      Glosarium definisi istilah penting yang digunakan dalam pembelajaran Sosiologi Kelas X.
                    </p>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Cari istilah di glosarium..."
                      value={glosariumSearch}
                      onChange={(e) => setGlosariumSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-56"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {officialGlosarium
                    .filter(g => !glosariumSearch || g.term.toLowerCase().includes(glosariumSearch.toLowerCase()) || g.def.toLowerCase().includes(glosariumSearch.toLowerCase()))
                    .map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-indigo-300 transition-all">
                        <h4 className="font-extrabold text-xs text-indigo-900 capitalize">{item.term}</h4>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{item.def}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ATP TAB 4: RASIONAL & CATATAN PENGGUNAAN */}
          {atpSubTab === 'rasional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" /> 8. Rasional Penyusunan ATP
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  Penyederhanaan dan penetapan materi esensial dalam alur tujuan pembelajaran (ATP) dimaksudkan untuk mencapai pemahaman dasar materi sosiologi kelas X secara efektif dan sesuai dengan kebutuhan.
                </p>

                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  Penyusunan alur pembelajaran juga mempertimbangkan tahapan dalam proses pembelajaran yang sesuai dengan pendekatan <strong>System Thinking</strong> (suatu proses untuk melihat segala sesuatu sebagai kesatuan utuh dan menekankan pada hubungan antar elemen yang ada pada suatu sistem).
                </p>

                <p className="text-xs text-indigo-900 bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-justify font-medium">
                  Model alur tujuan pembelajaran mendorong peserta didik mampu mengkontekstualisasikan materi pembelajaran dengan kehidupan yang nyata di masyarakat. Pencapaian pembelajaran pada elemen keterampilan proses inkuiri (inquiry process skill) dapat dilakukan dengan berdiri sendiri pada pembelajaran sosiologi dan/atau melalui studi multidisiplin berbentuk pembelajaran berbasis proyek (Project-Based Learning / Problem-Based Learning / Integrated Learning).
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" /> 9. Catatan Khusus Penggunaan ATP
                </h3>

                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-3 text-xs text-slate-800 leading-relaxed text-justify">
                  <p>
                    Penggunaan Alur Tujuan Pembelajaran (ATP) perlu memperhatikan kondisi kesiapan satuan pendidikan yang terkait dengan:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 font-medium text-slate-700">
                    <li>Intake dan kompetensi awal peserta didik</li>
                    <li>Kompetensi guru pengampu</li>
                    <li>Heterogenitas kondisi siswa di kelas</li>
                    <li>Akses jaringan internet dan ketersediaan sarana pendukung</li>
                    <li>Dinamika lingkungan sekitar pembelajaran</li>
                    <li>Kearifan lokal budaya masyarakat setempat (Bogor & Jawa Barat)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 0E: BIOGRAFI INTERAKTIF GURU (Liyas Syarifudin, M.Pd.) */}
      {activeSubTab === 'teacher-bio' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Hero Card Profile */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden space-y-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 z-10 relative">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                {/* Avatar Badge */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-indigo-600 p-1 shadow-lg">
                    <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-amber-400 font-black text-2xl border border-amber-400/30">
                      <span>LS</span>
                      <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase mt-1">M.Pd</span>
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1.5 rounded-full ring-4 ring-slate-900" title="Pendidik Aktif PM Al Ghozali">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-400 text-slate-950" />
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-black uppercase tracking-wider">
                      Pendidik & Penulis Sastra
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">
                      Pengabdi sejak 2003
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                    Liyas Syarifudin, S.Pd.I., M.Pd.
                  </h2>

                  <p className="text-xs lg:text-sm text-slate-300 font-medium">
                    Guru Pengampu Sosiologi & Insya' di <strong>Pondok Modern Al Ghozali</strong>
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 font-medium flex-wrap pt-1">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Lahir di Bogor, 5 Agustus 1981</span>
                    <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Magister Pendidikan (UNINDRA)</span>
                    <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-400" /> Suami dari Septi Ningsih</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <button
                  onClick={() => {
                    const bioText = `BIOGRAFI Liyas Syarifudin, S.Pd.I., M.Pd.\n\nLahir: Bogor, 5 Agustus 1981\nPasangan Orang Tua: Saleh & Asiah\nIstri: Septi Ningsih (Menikah 25 Sept 2005)\nAnak (4): Rifdatul Aisy (19), Nisrina Nuril Husna (16), Ahdina Zidna Ilma (13), Ahmad Mumtaz Ahsanu Taqwim (8)\n\nPENDIDIKAN:\n- MI Ta'allamul Huda (Lulus 1994)\n- SMPI Al Ghozali (Lulus 1997)\n- SMAI Al Ghozali (Lulus 2000)\n- UIN Syarif Hidayatullah Jakarta (2000)\n- UNPAM (2005)\n- STAI Al Karimiyah (S.Pd.I, 2010)\n- UNINDRA Jakarta (M.Pd, 2016)\n\nPENGABDIAN:\nPendidik Pondok Modern Al Ghozali (sejak 2003)\nMata Pelajaran: Sosiologi, Insya', Bahasa Arab, Bahasa Inggris, Sejarah, PPKn.\n\nMotto: "Ilmu dan tulisan yang bermanfaat akan menjadi warisan yang abadi bagi generasi mendatang."`;
                    navigator.clipboard.writeText(bioText);
                    setBioCardCopied(true);
                    setTimeout(() => setBioCardCopied(false), 3000);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 hover:scale-105"
                >
                  {bioCardCopied ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
                  <span>{bioCardCopied ? 'Tersalin ke Clipboard!' : '📋 Salin Ringkasan Biografi'}</span>
                </button>

                <button
                  onClick={() => setBioSubTab('quiz')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>🎯 Kuis Interaktif Bio</span>
                </button>
              </div>
            </div>

            {/* Quote Banner */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-200 italic font-medium leading-relaxed">
                "Ilmu dan tulisan yang bermanfaat akan menjadi warisan yang abadi bagi generasi mendatang."
              </p>
            </div>
          </div>

          {/* Sub Navigation Bar for Biography */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'overview', label: '📖 Ringkasan & Filosofi', icon: User },
              { id: 'timeline', label: '📜 Garis Waktu Pendidikan & Karir', icon: Clock },
              { id: 'family', label: '👨‍👩‍👧‍👦 Keluarga & Kebanggaan', icon: Heart },
              { id: 'teaching', label: '📚 Dedikasi Mengajar (PM Al Ghozali)', icon: BookOpen },
              { id: 'works', label: '✍️ Karya Kepenulisan & Sastra', icon: Feather },
              { id: 'quiz', label: '🎯 Kuis Interaktif Biografi', icon: Sparkles },
            ].map((st) => {
              const Icon = st.icon;
              const isActive = bioSubTab === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setBioSubTab(st.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* SUBTAB 1: OVERVIEW & FILOSOFI */}
          {bioSubTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Narasi Lengkap Biografi */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" /> Profil Lengkap & Perjalanan Pendidik
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  <strong>Liyas Syarifudin</strong> lahir di Bogor pada 5 Agustus 1981 dari pasangan Saleh dan Asiah. Sejak kecil, ia telah menunjukkan ketertarikannya dalam dunia pendidikan dan sastra. Pendidikan dasarnya ditempuh di MI Ta’allamul Huda, yang ia selesaikan pada tahun 1994. Ia kemudian melanjutkan ke SMPI Al Ghozali dan lulus pada tahun 1997, serta menyelesaikan pendidikan menengah atasnya di SMAI Al Ghozali pada tahun 2000.
                </p>

                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  Setelah lulus SMA, Liyas Syarifudin melanjutkan studi ke UIN Syarif Hidayatullah Jakarta pada tahun 2000 di Fakultas Syariah, Jurusan Siyasah Syar’iyyah. Namun, ia tidak menyelesaikan studinya di sana. Ia kemudian melanjutkan pendidikan di Universitas Pamulang (UNPAM) pada tahun 2005, tetapi kembali tidak menamatkan studinya. Tekadnya untuk meraih gelar akademik akhirnya membawanya ke Sekolah Tinggi Agama Islam (STAI) Al Karimiyah pada tahun 2010, di mana ia berhasil meraih gelar S.Pd.I dalam jurusan Pendidikan Agama Islam. Ia melanjutkan pendidikan pascasarjana di Universitas Indraprasta PGRI (UNINDRA) Jakarta dan memperoleh gelar Master Pendidikan (M.Pd) pada tahun 2016.
                </p>

                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  Sejak tahun 2003, Liyas Syarifudin mengabdikan diri sebagai pendidik di Pondok Modern Al Ghozali. Ia pernah mengajar berbagai mata pelajaran, mulai dari Bahasa Arab, Bahasa Inggris, Sejarah, PPKn, hingga akhirnya mengampu mata pelajaran Sosiologi dan Insya’. Sebagai seorang pendidik, ia memiliki dedikasi tinggi dalam mencetak generasi muda yang berwawasan luas dan berakhlak baik.
                </p>

                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  Selain mengajar, ia juga aktif dalam dunia kepenulisan. Hobi menulisnya meliputi puisi, artikel, dan novel yang telah dipublikasikan di berbagai media sosial serta aplikasi novel digital. Baginya, menulis adalah cara untuk menuangkan gagasan dan perasaan yang bisa menginspirasi banyak orang.
                </p>

                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  Dalam kehidupan pribadinya, Liyas Syarifudin menikah pada 25 September 2005 dengan Septi Ningsih, seorang wanita asal Metro, Lampung. Dari pernikahan mereka, lahir empat anak yang menjadi kebanggaannya: Rifdatul Aisy (19 tahun), Nisrina Nuril Husna (16 tahun), Ahdina Zidna Ilma (13 tahun), dan Ahmad Mumtaz Ahsanu Taqwim (8 tahun).
                </p>

                <p className="text-xs font-semibold text-indigo-900 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 text-justify">
                  Melalui perjalanannya sebagai pendidik dan penulis, Liyas Syarifudin terus berusaha memberikan kontribusi bagi dunia pendidikan dan sastra. Ia meyakini bahwa ilmu dan tulisan yang bermanfaat akan menjadi warisan yang abadi bagi generasi mendatang.
                </p>
              </div>

              {/* Sidebar Quick Stats Cards */}
              <div className="space-y-6">
                <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Ringkasan Fakta Biografi
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Tempat, Tgl Lahir:</span>
                      <strong className="text-white">Bogor, 5 Ags 1981</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Orang Tua:</span>
                      <strong className="text-white">Saleh & Asiah</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Pengabdian Mengajar:</span>
                      <strong className="text-amber-300">Pondok Modern Al Ghozali (Sejak 2003)</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Pendidikan S2:</span>
                      <strong className="text-emerald-400">M.Pd (UNINDRA 2016)</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Pendidikan S1:</span>
                      <strong className="text-indigo-300">S.Pd.I (STAI Al Karimiyah 2010)</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Pernikahan:</span>
                      <strong className="text-rose-300">25 Sept 2005 (Septi Ningsih)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Jumlah Putra/i:</span>
                      <strong className="text-white">4 Anak</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-3xl p-6 border border-indigo-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                    <Feather className="w-4 h-4 text-indigo-600" /> Hobi & Karya Sastra
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aktif menulis puisi, artikel ilmiah-populer, dan novel digital di media sosial serta platform novel digital.
                  </p>
                  <button
                    onClick={() => setBioSubTab('works')}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Jelajahi Karya Sastra Pak Guru</span> →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 2: TIMELINE PENDIDIKAN & KARIR */}
          {bioSubTab === 'timeline' && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" /> Garis Waktu Interaktif Pendidikan & Pengabdian
                </h3>
                <p className="text-xs text-slate-500">
                  Klik pada setiap simpul tahun untuk melihat riwayat perjuangan dan milestone akademik Liyas Syarifudin, M.Pd.
                </p>
              </div>

              <div className="relative border-l-2 border-indigo-200 ml-4 pl-6 space-y-6">
                {[
                  {
                    year: '1981',
                    title: 'Kelahiran di Bogor',
                    subtitle: 'Lahir pada 5 Agustus 1981',
                    desc: 'Lahir dari pasangan Saleh dan Asiah. Sejak kecil menumbuhkan kecintaan mendalam pada dunia pendidikan dan sastra.',
                    badge: 'Kelahiran',
                    color: 'bg-amber-500'
                  },
                  {
                    year: '1994',
                    title: 'Lulus MI Ta’allamul Huda',
                    subtitle: 'Pendidikan Dasar',
                    desc: 'Menyelesaikan pendidikan dasar madrasah ibtidaiyah dengan ketertarikan tinggi pada ilmu keagamaan dan bahasa.',
                    badge: 'Dasar',
                    color: 'bg-indigo-500'
                  },
                  {
                    year: '1997',
                    title: 'Lulus SMPI Al Ghozali',
                    subtitle: 'Pendidikan Menengah Pertama',
                    desc: 'Menamatkan pendidikan menengah pertama di lingkungan Sekolah Islam Al Ghozali.',
                    badge: 'SMP',
                    color: 'bg-indigo-600'
                  },
                  {
                    year: '2000',
                    title: 'Lulus SMAI Al Ghozali & Kuliah UIN Jakarta',
                    subtitle: 'Fakultas Syariah, Jurusan Siyasah Syar’iyyah',
                    desc: 'Menyelesaikan SMAI Al Ghozali pada tahun 2000 lalu melanjutkan studi sarjana di UIN Syarif Hidayatullah Jakarta.',
                    badge: 'SMA & UIN',
                    color: 'bg-indigo-700'
                  },
                  {
                    year: '2003',
                    title: 'Awal Pengabdian di Pondok Modern Al Ghozali',
                    subtitle: 'Pendidik & Pengampu Mata Pelajaran',
                    desc: 'Mulai mengabdikan diri penuh waktu mengajar Bahasa Arab, Bahasa Inggris, Sejarah, PPKn, hingga Sosiologi dan Insya’.',
                    badge: 'Pengabdian',
                    color: 'bg-emerald-600'
                  },
                  {
                    year: '2005',
                    title: 'Perjalanan Akademik UNPAM & Pernikahan',
                    subtitle: 'Menikah dengan Septi Ningsih (25 Sept 2005)',
                    desc: 'Melanjutkan studi di Universitas Pamulang (UNPAM) dan membina rumah tangga bersama Septi Ningsih dari Metro, Lampung.',
                    badge: 'Pernikahan',
                    color: 'bg-rose-500'
                  },
                  {
                    year: '2010',
                    title: 'Gelar Sarjana S.Pd.I di STAI Al Karimiyah',
                    subtitle: 'Jurusan Pendidikan Agama Islam',
                    desc: 'Berhasil meraih gelar Sarjana Pendidikan Islam (S.Pd.I) sebagai pembuktian keteguhan cita-cita akademik.',
                    badge: 'S1 S.Pd.I',
                    color: 'bg-emerald-700'
                  },
                  {
                    year: '2016',
                    title: 'Gelar Magister Pendidikan (M.Pd) UNINDRA',
                    subtitle: 'Universitas Indraprasta PGRI Jakarta',
                    desc: 'Meraih gelar Master Pendidikan (M.Pd) di UNINDRA Jakarta, memperkuat kompetensi pedagogik dan kepemimpinan pembelajaran.',
                    badge: 'S2 M.Pd',
                    color: 'bg-purple-600'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full ${item.color} ring-4 ring-white shadow-xs`} />

                    <div className="bg-slate-50 hover:bg-indigo-50/50 p-5 rounded-2xl border border-slate-200 transition-all space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full">
                          Tahun {item.year}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                      <p className="text-xs font-bold text-indigo-700">{item.subtitle}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 3: KELUARGA & KEBANGGAAN */}
          {bioSubTab === 'family' && (
            <div className="space-y-6">
              {/* Card Pasangan */}
              <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50 rounded-3xl p-6 lg:p-8 border border-rose-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Heart className="w-10 h-10 fill-white" />
                  </div>

                  <div className="space-y-1 text-center sm:text-left">
                    <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase tracking-wider">
                      Pernikahan Suci (25 September 2005)
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Liyas Syarifudin & Septi Ningsih
                    </h3>
                    <p className="text-xs text-slate-600">
                      Istri tercinta: <strong>Septi Ningsih</strong>, asal Metro, Lampung. Bahagia mendampingi perjalanan pengabdian dan membesarkan 4 orang anak kebanggaan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid 4 Anak */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Users className="w-5 h-5 text-indigo-600" /> Empat Putra & Putri Kebanggaan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { num: 1, name: 'Rifdatul Aisy', age: '19 Tahun', desc: 'Putri Pertama', badge: 'Anak Sulung' },
                    { num: 2, name: 'Nisrina Nuril Husna', age: '16 Tahun', desc: 'Putri Kedua', badge: 'Anak Kedua' },
                    { num: 3, name: 'Ahdina Zidna Ilma', age: '13 Tahun', desc: 'Putri Ketiga', badge: 'Anak Ketiga' },
                    { num: 4, name: 'Ahmad Mumtaz Ahsanu Taqwim', age: '8 Tahun', desc: 'Putra Keempat', badge: 'Anak Bungsu' },
                  ].map((child) => (
                    <div key={child.num} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-center hover:border-indigo-300 transition-all">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center mx-auto">
                        #{child.num}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] inline-block">
                        {child.badge}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900">{child.name}</h4>
                      <p className="text-xs font-bold text-indigo-600">{child.age}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 4: DEDIKASI MENGAJAR */}
          {bioSubTab === 'teaching' && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" /> Pengabdian & Mata Pelajaran Diampu di Pondok Modern Al Ghozali
                </h3>
                <p className="text-xs text-slate-500">
                  Mengabdi sejak tahun 2003 dalam mencetak santri dan peserta didik yang berpengetahuan luas dan berakhlak mulia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Sosiologi', status: 'Mata Pelajaran Utama (Fase E)', desc: 'Mengkaji fungsi sosiologi, status dan peran individu, gejala sosial, serta penelitian inkuiri.', primary: true },
                  { title: 'Insya’ (Karang Mengarang)', status: 'Mata Pelajaran Utama', desc: 'Mengasah kemampuan merangkai kalimat dan gagasan sastra tulisan santri.', primary: true },
                  { title: 'Bahasa Arab', status: 'Pengalaman Mengajar', desc: 'Pengajaran tatabahasa dan tata Bahasa Arab di madrasah.', primary: false },
                  { title: 'Bahasa Inggris', status: 'Pengalaman Mengajar', desc: 'Pengembangan keterampilan berkomunikasi global.', primary: false },
                  { title: 'Sejarah', status: 'Pengalaman Mengajar', desc: 'Pemahaman keterhubungan peristiwa masa lalu, masa kini, dan masa depan.', primary: false },
                  { title: 'PPKn / Pancasila', status: 'Pengalaman Mengajar', desc: 'Pendidikan kewarganegaraan, komitmen kebangsaan, dan nilai Pancasila.', primary: false },
                ].map((subj, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border space-y-2 ${subj.primary ? 'bg-indigo-50/70 border-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
                    <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-[10px] ${subj.primary ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {subj.status}
                    </span>
                    <h4 className="text-sm font-black text-slate-900">{subj.title}</h4>
                    <p className="text-xs text-slate-600">{subj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 5: KARYA KEPENULISAN & SASTRA */}
          {bioSubTab === 'works' && (
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Feather className="w-5 h-5 text-indigo-600" /> Karya Sastra, Puisi, Artikel & Novel Digital
                  </h3>
                  <p className="text-xs text-slate-500">
                    Koleksi tulisan Liyas Syarifudin, M.Pd. yang dipublikasikan di berbagai media dan aplikasi digital.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {['all', 'puisi', 'artikel', 'novel'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedWritingCategory(cat as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                        selectedWritingCategory === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {literaryWorks
                  .filter((item) => selectedWritingCategory === 'all' || item.category === selectedWritingCategory)
                  .map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{item.year}</span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.summary}</p>
                      </div>

                      <button
                        onClick={() => setReadingPieceModal(item)}
                        className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Baca Cuplikan Karya
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SUBTAB 6: KUIS INTERAKTIF BIOGRAFI */}
          {bioSubTab === 'quiz' && (
            <div className="bg-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  Uji Pemahaman Siswa
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  🎯 Kuis Interaktif: Seberapa Kenal Anda dengan Pak Liyas Syarifudin, M.Pd.?
                </h3>
                <p className="text-xs text-slate-400">
                  Jawab 3 pertanyaan seputar riwayat pendidikan dan dedikasi pengabdian guru Anda!
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    q: '1. Di manakah Liyas Syarifudin, M.Pd. menyelesaikan studi Magister Pendidikan (S2) pada tahun 2016?',
                    opts: [
                      { id: 'a', text: 'Universitas Indonesia (UI)' },
                      { id: 'b', text: 'Universitas Indraprasta PGRI (UNINDRA) Jakarta' },
                      { id: 'c', text: 'STAI Al Karimiyah' },
                      { id: 'd', text: 'UIN Syarif Hidayatullah Jakarta' },
                    ],
                    correct: 'b'
                  },
                  {
                    id: 2,
                    q: '2. Sejak tahun berapakah Liyas Syarifudin mengabdikan diri sebagai pendidik di Pondok Modern Al Ghozali?',
                    opts: [
                      { id: 'a', text: 'Tahun 1997' },
                      { id: 'b', text: 'Tahun 2000' },
                      { id: 'c', text: 'Tahun 2003' },
                      { id: 'd', text: 'Tahun 2010' },
                    ],
                    correct: 'c'
                  },
                  {
                    id: 3,
                    q: '3. Siapakah nama istri dari Liyas Syarifudin yang berasal dari Metro, Lampung?',
                    opts: [
                      { id: 'a', text: 'Septi Ningsih' },
                      { id: 'b', text: 'Rifdatul Aisy' },
                      { id: 'c', text: 'Nisrina Nuril' },
                      { id: 'd', text: 'Asiah' },
                    ],
                    correct: 'a'
                  }
                ].map((item) => (
                  <div key={item.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <p className="text-sm font-bold text-amber-300">{item.q}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {item.opts.map((opt) => {
                        const isSelected = bioQuizAnswers[item.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setBioQuizAnswers(prev => ({ ...prev, [item.id]: opt.id }));
                            }}
                            className={`p-3 rounded-xl text-left font-medium transition-all ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 font-black'
                                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                            }`}
                          >
                            <span className="font-mono mr-2">{opt.id.toUpperCase()}.</span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    let score = 0;
                    if (bioQuizAnswers[1] === 'b') score += 33;
                    if (bioQuizAnswers[2] === 'c') score += 33;
                    if (bioQuizAnswers[3] === 'a') score += 34;
                    setBioQuizScore(score);
                    setBioQuizSubmitted(true);
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md hover:scale-105"
                >
                  Submit & Lihat Hasil Kuis Biografi
                </button>

                {bioQuizSubmitted && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Skor Anda:</span>
                    <p className="text-2xl font-black text-emerald-400">{bioQuizScore} / 100</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal Preview Reader Karya Sastra */}
          {readingPieceModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    {readingPieceModal.category}
                  </span>
                  <button
                    onClick={() => setReadingPieceModal(null)}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 text-xs font-bold"
                  >
                    ✕ Tutup
                  </button>
                </div>

                <h3 className="text-lg font-black text-slate-900">{readingPieceModal.title}</h3>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 font-serif text-slate-800 whitespace-pre-line leading-relaxed text-xs">
                  {readingPieceModal.content}
                </div>

                <p className="text-[11px] text-slate-500 font-sans italic text-right">
                  ~ Karya: Liyas Syarifudin, M.Pd.
                </p>

                <button
                  onClick={() => setReadingPieceModal(null)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all"
                >
                  Kembali ke Biografi
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 1: PERENCANAAN PEMBELAJARAN */}
      {activeSubTab === 'planning' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActivePlanningView('rpp')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activePlanningView === 'rpp' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
              >
                Modul Ajar / RPP
              </button>
              <button
                onClick={() => setActivePlanningView('cpatp')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activePlanningView === 'cpatp' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
              >
                Manajemen CP, TP & ATP
              </button>
              <button
                onClick={() => setActivePlanningView('prota')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activePlanningView === 'prota' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
              >
                Pembuat Prota & Promes
              </button>
            </div>

            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Modul Ajar Baru</span>
            </button>
          </div>

          {activePlanningView === 'rpp' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {lessonPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                        Kelas {plan.grade} Sosiologi
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mt-1">{plan.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{plan.chapter} • Alokasi: {plan.duration}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{plan.createdDate}</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-0.5">Capaian Pembelajaran (CP):</span>
                      <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{plan.cpText}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-0.5">Tujuan Pembelajaran (TP):</span>
                      <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{plan.tpText}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-0.5">Alur Aktivitas Pembelajaran (ATP):</span>
                      <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{plan.atpText}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-indigo-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Metode: {plan.assessmentMethod}
                    </span>
                    <button 
                      onClick={() => alert(`Mencetak RPP: ${plan.title}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" /> Unduh Modul
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePlanningView === 'cpatp' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Pemetaan CP, TP, dan ATP Kurikulum Merdeka</h3>
                  <p className="text-xs text-slate-500">Capaian Pembelajaran Sosiologi Fase E (Kelas 10) & Fase F (Kelas 11-12)</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="p-3.5 rounded-tl-xl">Elemen</th>
                      <th className="p-3.5">Capaian Pembelajaran (CP)</th>
                      <th className="p-3.5">Tujuan Pembelajaran (TP)</th>
                      <th className="p-3.5 rounded-tr-xl">Alur Tujuan Pembelajaran (ATP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-indigo-700">Pemahaman Sosiologi</td>
                      <td className="p-3.5">Peserta didik mampu memahami fungsi sosiologi sebagai ilmu yang mengkaji masyarakat.</td>
                      <td className="p-3.5">1. Menganalisis objek sosiologi.<br/>2. Mengidentifikasi ragam gejala sosial.</td>
                      <td className="p-3.5 font-medium">Semester 1 (Pertemuan 1 - 8)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-indigo-700">Keterampilan Proses</td>
                      <td className="p-3.5">Peserta didik mampu melakukan penelitian sosial sederhana dengan metode kualitatif/kuantitatif.</td>
                      <td className="p-3.5">1. Menyusun rancangan penelitian.<br/>2. Mengumpulkan data lapangan kuesioner.</td>
                      <td className="p-3.5 font-medium">Semester 2 (Pertemuan 10 - 18)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePlanningView === 'prota' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Program Tahunan (PROTA) & Program Semester (PROMES)</h3>
                  <p className="text-xs text-slate-500">Tahun Ajaran 2026/2027 • Alokasi Efektif 36 Minggu (72 JP)</p>
                </div>
                <button className="px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Ekspor Excel PROTA
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Semester Ganjil (18 Minggu / 36 JP)</h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                    <li>Bab 1: Hakikat dan Kajian Sosiologi (12 JP)</li>
                    <li>Bab 2: Interaksi Sosial & Dinamika Kelompok (12 JP)</li>
                    <li>Asesmen Tengah & Akhir Semester (12 JP)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Semester Genap (18 Minggu / 36 JP)</h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                    <li>Bab 3: Ragam Gejala Sosial & Perilaku Menyimpang (14 JP)</li>
                    <li>Bab 4: Metode Penelitian Sosial Sederhana (14 JP)</li>
                    <li>Ujian Proyek & Cadangan (8 JP)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 2: PRESENSI & KEHADIRAN SISWA */}
      {activeSubTab === 'attendance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Presensi Real-time Kelas {selectedClass}</h3>
                <p className="text-xs text-slate-500">Pencatatan kehadiran harian siswa secara cepat dan otomatis</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden"
                />
                <button
                  onClick={() => alert("✅ Data presensi berhasil disimpan dan tersinkronisasi!")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Presensi Hari Ini
                </button>
              </div>
            </div>

            {/* Attendance Summary Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Hadir</span>
                <p className="text-2xl font-extrabold text-emerald-700 mt-1">
                  {attendanceRecords.filter(a => a.status === 'Hadir').length} Siswa
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Sakit</span>
                <p className="text-2xl font-extrabold text-sky-700 mt-1">
                  {attendanceRecords.filter(a => a.status === 'Sakit').length} Siswa
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Izin</span>
                <p className="text-2xl font-extrabold text-amber-700 mt-1">
                  {attendanceRecords.filter(a => a.status === 'Izin').length} Siswa
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">Alpa (Tanpa Ket.)</span>
                <p className="text-2xl font-extrabold text-rose-700 mt-1">
                  {attendanceRecords.filter(a => a.status === 'Alpa').length} Siswa
                </p>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3 rounded-l-xl">No</th>
                    <th className="p-3">Nama Siswa</th>
                    <th className="p-3">Status Kehadiran</th>
                    <th className="p-3 rounded-r-xl">Catatan / Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {attendanceRecords.map((st, index) => (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-400">{index + 1}</td>
                      <td className="p-3 font-bold text-slate-900">{st.studentName}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          {(['Hadir', 'Sakit', 'Izin', 'Alpa'] as const).map((statusOption) => (
                            <button
                              key={statusOption}
                              onClick={() => handleUpdateAttendance(st.id, statusOption)}
                              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                                st.status === statusOption
                                  ? statusOption === 'Hadir' ? 'bg-emerald-600 text-white shadow-xs' :
                                    statusOption === 'Sakit' ? 'bg-sky-600 text-white shadow-xs' :
                                    statusOption === 'Izin' ? 'bg-amber-600 text-white shadow-xs' : 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {statusOption}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          defaultValue={st.notes}
                          placeholder="+ Tambahkan keterangan..."
                          className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: PENILAIAN & KKTP */}
      {activeSubTab === 'grading' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Buku Nilai & Analisis Ketuntasan (KKTP)</h3>
                <p className="text-xs text-slate-500">Perhitungan otomatis Asesmen Formatif (40%), Sumatif (40%), dan Proyek (20%)</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">KKTP minimal:</span>
                  <input
                    type="number"
                    value={kktpThreshold}
                    onChange={(e) => setKktpThreshold(Number(e.target.value))}
                    className="w-14 px-2 py-0.5 bg-white border border-slate-300 rounded-md font-bold text-xs text-center"
                  />
                </div>

                <button 
                  onClick={() => alert("Perhitungan ulang KKTP selesai!")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-500"
                >
                  Hitung Ulang
                </button>
              </div>
            </div>

            {/* Grade Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                    <th className="p-3 rounded-l-xl">NISN</th>
                    <th className="p-3">Nama Siswa</th>
                    <th className="p-3">Formatif (40%)</th>
                    <th className="p-3">Sumatif (40%)</th>
                    <th className="p-3">Proyek (20%)</th>
                    <th className="p-3">Nilai Akhir</th>
                    <th className="p-3 rounded-r-xl">Status KKTP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {studentGrades.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-400">{st.nisn}</td>
                      <td className="p-3 font-bold text-slate-900">{st.studentName}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={st.formatif}
                          onChange={(e) => handleGradeChange(st.id, 'formatif', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={st.sumatif}
                          onChange={(e) => handleGradeChange(st.id, 'sumatif', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={st.proyek}
                          onChange={(e) => handleGradeChange(st.id, 'proyek', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                        />
                      </td>
                      <td className="p-3 font-extrabold text-sm text-indigo-700">{st.finalScore}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          st.status === 'Pengayaan' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                          st.status === 'Tuntas' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}>
                          {st.status === 'Remedi' ? '⚠️ Perlu Remedi' : st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bank Soal Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" /> Bank Soal & Kisi-kisi Terintegrasi
              </h3>
              <span className="text-xs text-slate-500 font-semibold">{questionBank.length} Draf Soal Tersimpan</span>
            </div>

            <div className="space-y-3">
              {questionBank.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-700">Kelas {q.grade} • {q.topic}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold">
                      {q.type} ({q.difficulty})
                    </span>
                  </div>
                  <p className="font-medium text-slate-800">{q.question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: JURNAL MENGAJAR */}
      {activeSubTab === 'journal' && (
        <div className="space-y-6">
          {/* Add Journal Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Input Jurnal Mengajar Hari Ini
            </h3>

            <form onSubmit={handleAddJournal} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Jam Pelajaran:</label>
                <input
                  type="text"
                  value={newJournalSlot}
                  onChange={(e) => setNewJournalSlot(e.target.value)}
                  placeholder="Contoh: 07:00 - 08:30"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Materi / Topik KBM *:</label>
                <input
                  type="text"
                  required
                  value={newJournalTopic}
                  onChange={(e) => setNewJournalTopic(e.target.value)}
                  placeholder="Contoh: Hakikat dan Fungsi Sosiologi"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Catatan Proses KBM / Kendala Kelas:</label>
                <textarea
                  rows={2}
                  value={newJournalNotes}
                  onChange={(e) => setNewJournalNotes(e.target.value)}
                  placeholder="Tuliskan dinamika kelas, keaktifan siswa, atau masalah fasilitas..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium resize-none"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between">
                <input
                  type="text"
                  value={newJournalAssignment}
                  onChange={(e) => setNewJournalAssignment(e.target.value)}
                  placeholder="Tugas/PR yang diberikan (Opsional)"
                  className="w-2/3 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>

          {/* Journal History */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Riwayat Jurnal KBM ({selectedClass})
            </h3>

            <div className="space-y-4">
              {teachingJournals.map((j) => (
                <div key={j.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-indigo-700">{j.className} • {j.date} ({j.timeSlot})</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded-md font-semibold">
                      {j.attendanceSummary}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 text-sm">{j.topic}</p>
                  <p className="text-slate-600">{j.notes}</p>
                  {j.assignment && (
                    <p className="text-amber-800 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200">
                      📌 Tugas: {j.assignment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: E-RAPOR & LAPORAN */}
      {activeSubTab === 'reporting' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Generasi E-Rapor & Deskripsi Otomatis</h3>
                <p className="text-xs text-slate-500">Penyusunan narasi capaian kompetensi Kurikulum Merdeka secara otomatis</p>
              </div>

              <button 
                onClick={handlePrintReport}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Cetak Rapor Seluruh Kelas
              </button>
            </div>

            <div className="space-y-4">
              {studentGrades.map((st) => (
                <div key={st.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{st.studentName}</h4>
                      <p className="text-[11px] text-slate-500">NISN: {st.nisn} • Kelas: {st.className}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-indigo-700">{st.finalScore}</span>
                      <p className="text-[10px] text-slate-500 font-semibold">Predikat: {st.finalScore >= 90 ? 'A (Sangat Baik)' : st.finalScore >= 80 ? 'B (Baik)' : 'C (Cukup)'}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-indigo-800 uppercase tracking-wider text-[10px] block mb-1">Capaian Kompetensi Naratif:</span>
                    {st.finalScore >= 85 ? (
                      <p>
                        Siswa menunjukkan penguasaan yang **SANGAT BAIK** dalam menganalisis hakikat sosiologi, mengidentifikasi interaksi sosial, serta menyusun rancangan penelitian sosial sederhana secara kritis dan mandiri.
                      </p>
                    ) : (
                      <p>
                        Siswa menunjukkan penguasaan yang **CUKUP** dalam memahami konsep sosiologi dasar. Perlu bimbingan lebih lanjut pada analisis kualitatif dinamika kelompok sosial.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 6: CATATAN PERILAKU & BK */}
      {activeSubTab === 'student-log' && (
        <div className="space-y-6">
          {/* Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Catat Log Perilaku & Prestasi Siswa
            </h3>

            <form onSubmit={handleAddStudentLog} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Siswa *:</label>
                <input
                  type="text"
                  required
                  value={newLogStudent}
                  onChange={(e) => setNewLogStudent(e.target.value)}
                  placeholder="Contoh: Ahmad Fauzi"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Kategori:</label>
                <select
                  value={newLogCategory}
                  onChange={(e) => setNewLogCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  <option value="Prestasi">🏆 Prestasi / Penghargaan</option>
                  <option value="Disiplin">⚠️ Disiplin / Pelanggaran</option>
                  <option value="Bimbingan BK">💬 Bimbingan Konseling (BK)</option>
                  <option value="Catatan Khusus">📝 Catatan Khusus</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Aksi:</label>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
                >
                  Simpan Catatan Karakter
                </button>
              </div>

              <div className="md:col-span-3">
                <textarea
                  rows={2}
                  required
                  value={newLogDesc}
                  onChange={(e) => setNewLogDesc(e.target.value)}
                  placeholder="Deskripsi rinci mengenai kejadian, prestasi, atau tindakan pembinaan..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium resize-none"
                />
              </div>
            </form>
          </div>

          {/* Log List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Rekam Jejak Karakter & Komunikasi Orang Tua
            </h3>

            <div className="space-y-3">
              {studentLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                        log.category === 'Prestasi' ? 'bg-amber-100 text-amber-800' :
                        log.category === 'Disiplin' ? 'bg-rose-100 text-rose-800' :
                        'bg-sky-100 text-sky-800'
                      }`}>
                        {log.category}
                      </span>
                      <h4 className="font-bold text-slate-900">{log.studentName} ({log.className})</h4>
                    </div>

                    <span className="text-slate-400 font-medium">{log.date}</span>
                  </div>

                  <p className="text-slate-700 font-medium">{log.description}</p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">
                      Status Notifikasi Orang Tua: {log.parentNotified ? '✅ Terikirim via SIAKAD/WA' : '⏳ Belum Dikirim'}
                    </span>
                    <button
                      onClick={() => handleToggleParentNotified(log.id)}
                      className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      {log.parentNotified ? 'Kirim Ulang Pesan' : 'Kirim Pesan ke Orang Tua'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 7: KEAMANAN & CLOUD */}
      {activeSubTab === 'security' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-lg text-slate-900">Keamanan, Cadangan Cloud, & Integrasi Sistem</h3>
            <p className="text-xs text-slate-500">Status perlindungan data administrasi guru dan integrasi Dapodik/SIAKAD</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Penyimpanan Awan & Auto-Backup</h4>
                  <p className="text-slate-500 text-[11px]">Enkripsi end-to-end aktif</p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Seluruh data Modul Ajar, Nilai Siswa, dan Jurnal Mengajar secara otomatis disinkronkan ke server sekolah terlindungi.
              </p>

              <button
                onClick={handleTriggerSync}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold transition-all shadow-xs"
              >
                Jalankan Backup Manual Sekarang
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Integrasi Dapodik & SIAKAD</h4>
                  <p className="text-slate-500 text-[11px]">API Status: AKTIF (Response 200 OK)</p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Terhubung langsung dengan basis data nasional Dapodik Kemdikbud untuk verifikasi NIP Guru & NISN Siswa.
              </p>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 font-mono text-[11px] text-emerald-800">
                Identitas Terverifikasi: Sari Wahyuni, S.Pd. (NIP: 198805142012012003)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Buat Modul Ajar Baru */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" /> Buat Modul Ajar / RPP Baru
              </h3>
              <button
                onClick={() => setIsPlanModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLessonPlan} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Judul Modul Ajar *:</label>
                  <input
                    type="text"
                    required
                    value={newPlanTitle}
                    onChange={(e) => setNewPlanTitle(e.target.value)}
                    placeholder="Contoh: Modul Ajar - Penyimpangan Sosial"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Tingkat Kelas *:</label>
                  <select
                    value={newPlanGrade}
                    onChange={(e) => setNewPlanGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value={10}>Kelas 10 (Fase E)</option>
                    <option value={11}>Kelas 11 (Fase F)</option>
                    <option value={12}>Kelas 12 (Fase F)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Bab / Topik Utama *:</label>
                  <input
                    type="text"
                    required
                    value={newPlanChapter}
                    onChange={(e) => setNewPlanChapter(e.target.value)}
                    placeholder="Contoh: Bab 3: Perilaku Menyimpang"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Alokasi Waktu:</label>
                  <input
                    type="text"
                    value={newPlanDuration}
                    onChange={(e) => setNewPlanDuration(e.target.value)}
                    placeholder="Contoh: 3 Pertemuan x 2 JP (6 JP)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Capaian Pembelajaran (CP):</label>
                <textarea
                  rows={2}
                  value={newPlanCP}
                  onChange={(e) => setNewPlanCP(e.target.value)}
                  placeholder="Tuliskan rumusan CP Kurikulum Merdeka..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium resize-none focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Tujuan Pembelajaran (TP):</label>
                <textarea
                  rows={2}
                  value={newPlanTP}
                  onChange={(e) => setNewPlanTP(e.target.value)}
                  placeholder="Tuliskan Tujuan Pembelajaran spesifik..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium resize-none focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Alur Tujuan Pembelajaran (ATP) & Kegiatan KBM:</label>
                <textarea
                  rows={2}
                  value={newPlanActivities}
                  onChange={(e) => setNewPlanActivities(e.target.value)}
                  placeholder="Aktivitas awal, inti (Problem Based Learning / Project Based Learning), dan penutup..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium resize-none focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  Simpan & Buat Modul
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 1: Tambah / Edit Kelas */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                {editingClass ? 'Edit Detail Kelas' : 'Tambah Kelas Baru'}
              </h3>
              <button
                onClick={() => setIsClassModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Kelas *:</label>
                <input
                  type="text"
                  required
                  value={inputClassName}
                  onChange={(e) => setInputClassName(e.target.value)}
                  placeholder="Contoh: XI IPS 3 atau XII MIPA 2"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Tahun Ajaran *:</label>
                <input
                  type="text"
                  required
                  value={inputClassYear}
                  onChange={(e) => setInputClassYear(e.target.value)}
                  placeholder="Contoh: 2026/2027"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Wali Kelas:</label>
                <input
                  type="text"
                  value={inputClassTeacher}
                  onChange={(e) => setInputClassTeacher(e.target.value)}
                  placeholder="Contoh: Drs. H. Ahmad Fauzi, M.Pd"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  {editingClass ? 'Simpan Perubahan' : 'Tambah Kelas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Tambah / Edit Siswa Single */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                {editingStudent ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
              </h3>
              <button
                onClick={() => setIsStudentModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Lengkap Siswa *:</label>
                <input
                  type="text"
                  required
                  value={inputStudentName}
                  onChange={(e) => setInputStudentName(e.target.value)}
                  placeholder="Contoh: Muhammad Rizky Pratama"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">NISN (Nomor Induk Siswa Nasional):</label>
                <input
                  type="text"
                  value={inputStudentNisn}
                  onChange={(e) => setInputStudentNisn(e.target.value)}
                  placeholder="Kosongkan untuk otomatis dibuat sistem"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Pilih Kelas *:</label>
                <select
                  value={inputStudentClass}
                  onChange={(e) => setInputStudentClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500"
                >
                  {classList.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  {editingStudent ? 'Simpan Perubahan' : 'Tambah Siswa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Batch Copy-Paste Import Nama Siswa */}
      {isBatchImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Import Otomatis Roster Siswa
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" /> Salin-Tempel (Copy-Paste) Daftar Nama Siswa
                </h3>
              </div>
              <button
                onClick={() => setIsBatchImportOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-amber-900 leading-relaxed font-medium">
                <p className="font-bold mb-1">💡 Cara Penggunaan Sangat Mudah:</p>
                <p>1. Buka file Microsoft Excel, Word, atau chat WhatsApp daftar siswa Anda.</p>
                <p>2. Salin (Copy) seluruh nama siswa (1 nama per baris atau dipisah koma).</p>
                <p>3. Tempel (Paste) pada kotak di bawah lalu klik <strong>"Import Sekarang"</strong>.</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider">
                    Kotak Tempel Daftar Nama Siswa (Target: {selectedClass}):
                  </label>
                  <span className="text-[11px] font-bold text-indigo-600">
                    {batchPasteText.split(/\r?\n|,/).filter(s => s.trim().length > 1).length} Nama Terdeteksi
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={batchPasteText}
                  onChange={(e) => setBatchPasteText(e.target.value)}
                  placeholder={`Contoh tempel:\n1. Ahmad Fauzi\n2. Anisa Rahmawati\n3. Bagas Prasetyo\n4. Citra Dewi\n5. Doni Gunawan`}
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-2xl font-mono text-xs focus:outline-hidden focus:border-amber-500 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBatchImportOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleBatchImportStudents}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Import {batchPasteText.split(/\r?\n|,/).filter(s => s.trim().length > 1).length} Siswa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Tambah / Edit Materi Pembelajaran (Writing & Copy-Paste Editor) */}
      {isMaterialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-3xl w-full border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Editor Materi Guru
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 mt-0.5 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  {editingMaterial ? 'Edit Materi Pembelajaran' : 'Tulis / Copy-Paste Materi Pembelajaran Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsMaterialModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Judul Materi / Bab *:</label>
                  <input
                    type="text"
                    required
                    value={matTitle}
                    onChange={(e) => setMatTitle(e.target.value)}
                    placeholder="Contoh: Bab 3: Konflik Sosial dan Akomodasi MASYARAKAT"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-extrabold text-slate-900 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Tingkat Kelas *:</label>
                  <select
                    value={matGrade}
                    onChange={(e) => setMatGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value={10}>Kelas 10 (Fase E)</option>
                    <option value={11}>Kelas 11 (Fase F)</option>
                    <option value={12}>Kelas 12 (Fase F)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Subtitle / Sub-topik:</label>
                  <input
                    type="text"
                    value={matSubtitle}
                    onChange={(e) => setMatSubtitle(e.target.value)}
                    placeholder="Contoh: Pengertian, Faktor Penyebab, dan Bentuk-Bentuk Akomodasi"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Kata Kunci (Pisahkan dengan koma):</label>
                  <input
                    type="text"
                    value={matKeyConcepts}
                    onChange={(e) => setMatKeyConcepts(e.target.value)}
                    placeholder="Contoh: Konflik, Mediasi, Akomodasi, Konsiliasi"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider">
                    Isi Materi Lengkap (Copy-Paste / Tulis Teks Pengajaran di Sini) *:
                  </label>
                  <span className="text-[11px] font-bold text-slate-400">Dukungan format teks bebas</span>
                </div>
                <textarea
                  rows={10}
                  required
                  value={matContent}
                  onChange={(e) => setMatContent(e.target.value)}
                  placeholder="Tempelkan atau tulis pembahasan materi pembelajaran secara rinci di sini. Teks ini akan langsung tersedia di Ruang Baca Sosiologi siswa dan dapat dibacakan oleh pembaca suara AI (Text-to-Speech)..."
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-2xl font-normal text-slate-800 leading-relaxed focus:outline-hidden focus:border-indigo-500 focus:bg-white resize-y"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMaterialModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold transition-all shadow-md shadow-indigo-600/20"
                >
                  {editingMaterial ? 'Simpan Perubahan Materi' : '💾 Simpan & Terbitkan Materi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
