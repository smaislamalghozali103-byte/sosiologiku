import { GradeCurriculum, PdfModule, QuizQuestion, DiscussionPost } from '../types';

export const DAILY_QUOTES = [
  {
    quote: "Sosiologi adalah ilmu yang mempelajari fakta sosial, di mana masyarakat memiliki realitas tersendiri yang terlepas dari individu-individunya.",
    figure: "Émile Durkheim"
  },
  {
    quote: "Tindakan sosial adalah tindakan manusia yang mempunyai makna subjektif bagi pelakunya dan diarahkan kepada orang lain.",
    figure: "Max Weber"
  },
  {
    quote: "Sejarah dari semua masyarakat yang ada sampai sekarang adalah sejarah perjuangan kelas.",
    figure: "Karl Marx"
  },
  {
    quote: "Individu tidak dapat dipahami tanpa memahami struktur sosial yang melingkupinya.",
    figure: "C. Wright Mills"
  }
];

export const SOCIOLOGY_CURRICULUM: GradeCurriculum[] = [
  {
    grade: 10,
    title: "Sosiologi Kelas 10",
    subtitle: "Pengantar Sosiologi, Individu, Kelompok, dan Gejala Sosial",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    chapters: [
      {
        id: "k10-1",
        title: "Bab 1: Pengantar Sosiologi & Hakikat Ilmu",
        subtitle: "Memahami Sosiologi sebagai Ilmu Pengetahuan Masyarakat",
        description: "Mempelajari sejarah lahirnya sosiologi, definisi, ciri-ciri sosiologi sebagai ilmu (empiris, teoretis, kumulatif, non-etis), serta peran sosiolog dalam pembangunan.",
        keyConcepts: ["Fakta Sosial", "Empiris", "Teoretis", "Kumulatif", "Non-etis", "Auguste Comte"],
        content: `Sosiologi lahir sebagai respons atas Revolusi Industri dan Revolusi Prancis pada abad ke-19 yang membawa perubahan besar dalam struktur masyarakat Eropa. Kata sosiologi berasal dari bahasa Latin 'socius' (kawan/masyarakat) dan Yunani 'logos' (kata/ilmu).

Ciri-ciri Utama Sosiologi sebagai Ilmu:
1. Empiris: Didasarkan pada observasi kenyataan akal sehat dan tidak spekulatif.
2. Teoretis: Selalu berusaha menyusun abstraksi dari hasil pengamatan lapangan untuk menjelaskan hubungan sebab-akibat.
3. Kumulatif: Teori sosiologi dibentuk atas dasar teori-teori yang sudah ada, diperbaiki, diperluas, dan diperdalam.
4. Non-etis: Sosiologi tidak mempersoalkan baik-buruknya suatu fakta tertentu, tetapi bertujuan menjelaskan fakta tersebut secara analitis.`,
        summary: "Sosiologi adalah ilmu pengetahuan empiris dan teoretis yang mengkaji interaksi sosial serta struktur kemasyarakatan secara objektif dan sistematis.",
        readingTime: "12 menit"
      },
      {
        id: "k10-2",
        title: "Bab 2: Individu, Kelompok, & Hubungan Sosial",
        subtitle: "Dinamika Interaksi Antarmanusia",
        description: "Mengkaji syarat terjadinya interaksi sosial (kontak sosial dan komunikasi), faktor pendorong interaksi (imitasi, sugesti, identifikasi, simpati, empati), serta bentuk interaksi asosiatif dan disosiatif.",
        keyConcepts: ["Kontak Sosial", "Komunikasi", "Asosiatif", "Disosiatif", "Simpati & Empati"],
        content: `Interaksi sosial adalah kunci dari semua kehidupan sosial. Tanpa interaksi, mustahil ada kelompok sosial atau masyarakat.

Syarat Terjadinya Interaksi Sosial:
1. Kontak Sosial: Dapat bersifat langsung (tatap muka) atau tidak langsung (menggunakan media teknologi).
2. Komunikasi: Proses penyampaian pesan dari seseorang kepada orang lain sehingga berkesan dan dipahami.

Bentuk Interaksi Sosial:
- Proses Asosiatif: Kerja sama (cooperation), akomodasi, asimilasi, dan akulturasi yang mengarah pada persatuan.
- Proses Disosiatif: Persaingan (competition), kontravensi, dan pertentangan/konflik yang mengarah pada perenggangan.`,
        summary: "Interaksi sosial memerlukan kontak dan komunikasi, terbagi menjadi proses asosiatif (kerja sama) dan disosiatif (konflik/persaingan).",
        readingTime: "15 menit"
      },
      {
        id: "k10-3",
        title: "Bab 3: Nilai dan Norma Sosial",
        subtitle: "Pedoman dan Aturan Perilaku dalam Masyarakat",
        description: "Memahami pengertian nilai sosial (ukuran kelayakan) dan norma sosial (aturan yang mengikat), jenis-jenis norma (usus, mores, custom, hukum), serta sanksi pelanggarannya.",
        keyConcepts: ["Nilai Material & Spiritual", "Cara (Usage)", "Kebiasaan (Folkways)", "Tata Kelakuan (Mores)", "Hukum (Laws)"],
        content: `Nilai sosial adalah anggapan masyarakat tentang sesuatu yang diinginkan, penting, benar, dan berharga. Sementara itu, norma sosial adalah penjabaran kongkret dari nilai sosial berupa aturan atau pedoman berperilaku.

Tingkatan Norma Sosial:
1. Cara (Usage): Memiliki kekuatan sanksi yang paling lemah (contoh: cara makan bersuara).
2. Kebiasaan (Folkways): Perbuatan yang diulang-ulang dalam bentuk yang sama (contoh: memberi hormat kepada yang lebih tua).
3. Tata Kelakuan (Mores): Norma yang mencerminkan sifat-sifat yang hidup dari kelompok manusia (contoh: larangan incest).
4. Hukum (Laws): Aturan tertulis yang dibuat oleh lembaga berwenang dengan sanksi tegas dan nyata.`,
        summary: "Nilai adalah acuan ideal, sedangkan norma adalah aturan praktis berjenjang dari usage hingga laws untuk menjaga keteriban sosial.",
        readingTime: "14 menit"
      },
      {
        id: "k10-4",
        title: "Bab 4: Sosialisasi & Pembentukan Kepribadian",
        subtitle: "Bagaimana Individu Belajar Menjadi Anggota Masyarakat",
        description: "Mempelajari agen-agen sosialisasi (keluarga, teman sebaya, sekolah, media massa), tahap sosialisasi menurut George Herbert Mead, serta pengaruh sosialisasi terhadap pembentukan kepribadian.",
        keyConcepts: ["Agen Sosialisasi", "Sosialisasi Primer & Sekunder", "Role Taking", "Generalized Other"],
        content: `Sosialisasi adalah proses seumur hidup di mana seorang individu mempelajari pola-pola budaya, nilai, norma, dan peranan sosial kelompoknya agar dapat berpartisipasi aktif dalam masyarakat.

Jenis Sosialisasi:
1. Sosialisasi Primer: Terjadi pada masa anak-anak awal di dalam lingkungan keluarga (agen utama).
2. Sosialisasi Sekunder: Terjadi di luar keluarga melalui sekolah, kelompok sepermainan, lingkungan kerja, dan media massa.`,
        summary: "Sosialisasi adalah proses penanaman nilai budaya melalui keluarga, sekolah, dan media yang membentuk kepribadian individu.",
        readingTime: "10 menit"
      },
      {
        id: "k10-5",
        title: "Bab 5: Perilaku Menyimpang & Pengendalian Sosial",
        subtitle: "Menjaga Keteriban dan Keadilan Sosial",
        description: "Menganalisis teori penyimpangan sosial (differential association, labeling, anomi), bentuk penyimpangan primer dan sekunder, serta lembaga pengendalian sosial (kepolisian, pengadilan, tokoh adat).",
        keyConcepts: ["Penyimpangan Primer & Sekunder", "Teori Labeling", "Anomi (Durkheim/Merton)", "Pengendalian Preventif & Represif"],
        content: `Perilaku menyimpang (deviasi) adalah setiap tindakan yang tidak sesuai dengan norma-norma yang berlaku dalam suatu sistem sosial. 

Teori Sosiologis tentang Penyimpangan:
- Teori Differential Association (Edwin Sutherland): Penyimpangan dipelajari melalui interaksi dengan kelompok yang menyimpang.
- Teori Labeling (Lemert): Seseorang menjadi menyimpang karena masyarakat telah memberikan cap (label) negatif kepadanya.
- Teori Anomi (Robert Merton): Ketegangan antara tujuan budaya dan cara yang tersedia.`,
        summary: "Penyimpangan sosial dianalisis melalui berbagai teori sosiologis dan dikendalikan melalui lembaga preventif maupun represif.",
        readingTime: "16 menit"
      }
    ]
  },
  {
    grade: 11,
    title: "Sosiologi Kelas 11",
    subtitle: "Kelompok Sosial, Stratifikasi, Permasalahan, dan Konflik Sosial",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    chapters: [
      {
        id: "k11-1",
        title: "Bab 1: Kelompok Sosial di Masyarakat Multikultural",
        subtitle: "In-Group, Out-Group, Paguyuban, dan Patembayan",
        description: "Mengkaji klasifikasi kelompok sosial menurut Ferdinand Tönnies (Gemeinschaft & Gesellschaft), solidaritas sosial Durkheim (mekanik & organik), serta dinamika masyarakat multikultural.",
        keyConcepts: ["Gemeinschaft (Paguyuban)", "Gesellschaft (Patembayan)", "Solidaritas Mekanik & Organik", "In-Group & Out-Group"],
        content: `Kelompok sosial adalah sekumpulan individu yang saling berinteraksi dan memiliki kesadaran akan keanggotaan bersama.

Klasifikasi Kelompok Sosial:
1. Gemeinschaft (Paguyuban): Bentuk kehidupan bersama di mana anggota diikat oleh hubungan batin yang murni, bersifat alamiah, dan kekal (contoh: keluarga, rukun tetangga tradisional).
2. Gesellschaft (Patembayan): Ikatan lahir yang bersifat pokok untuk jangka waktu pendek, strukturnya kontraktual (contoh: ikatan pegawai perusahaan, koperasi).

Solidaritas Sosial (Émile Durkheim):
- Solidaritas Mekanik: Didasarkan pada kesadaran kolektif yang kuat dan kesamaan ciri dalam masyarakat sederhana.
- Solidaritas Organik: Didasarkan pada pembagian kerja yang kompleks dalam masyarakat modern yang saling bergantung.`,
        summary: "Kelompok sosial diklasifikasikan dari ikatan paguyuban/patembayan hingga bentuk solidaritas mekanik dan organik dalam masyarakat majemuk.",
        readingTime: "18 menit"
      },
      {
        id: "k11-2",
        title: "Bab 2: Permasalahan Sosial dalam Ranah Publik",
        subtitle: "Kemiskinan, Kriminalitas, dan Disorganisasi Keluarga",
        description: "Menganalisis ukuran permasalahan sosial objektif dan subjektif, faktor penyebab kemiskinan struktural & kultural, kriminalitas, serta penanganannya.",
        keyConcepts: ["Kemiskinan Struktural", "Disorganisasi Sosial", "Masalah Publik", "Kesenjangan Sosial"],
        content: `Permasalahan sosial adalah suatu ketidaksesuaian antara unsur-unsur kebudayaan atau masyarakat, yang membahayakan kehidupan kelompok sosial.

Faktor Utama Penyebab Masalah Sosial:
1. Faktor Ekonomis: Pengangguran, kemiskinan absolut dan relatif.
2. Faktor Biologis: Penyakit menular, kekurangan gizi.
3. Faktor Psikologis: Gangguan jiwa, stres sosial, bunuh diri.
4. Faktor Kebudayaan: Perceraian, kenakalan remaja, konflik etnis.`,
        summary: "Masalah sosial mencakup kemiskinan, kriminalitas, dan disorganisasi yang bersumber dari ketimpangan ekonomi, budaya, dan struktural.",
        readingTime: "14 menit"
      },
      {
        id: "k11-3",
        title: "Bab 3: Konflik, Kekerasan, & Upaya Perdamaian",
        subtitle: "Dinamika Pertikaian dan Resolusi Konflik",
        description: "Memahami perbedaan konflik dan kekerasan, akar penyebab konflik sosial (perbedaan kepentingan, kebudayaan, sosial), serta bentuk akomodasi (mediasi, arbitrase, konsiliasi, toleransi).",
        keyConcepts: ["Konflik Sifat & Akar", "Mediasi & Arbitrase", "Transformasi Konflik", "Pemberdayaan Perdamaian"],
        content: `Konflik adalah proses sosial di mana individu atau kelompok berusaha memenuhi tujuannya dengan jalan menantang pihak lawan yang disertai ancaman atau kekerasan.

Bentuk-bentuk Akomodasi Resolusi Konflik:
- Mediasi: Menggunakan pihak ketiga yang netral sebagai penasihat (mediator).
- Arbitrase: Pihak ketiga memberikan keputusan mengikat untuk menyelesaikan sengketa (arbitrator).
- Konsiliasi: Mempertemukan keinginan pihak yang berselisih untuk mencapai kesepakatan.
- Ajudikasi: Penyelesaian perkara melalui pengadilan.`,
        summary: "Konflik dan kekerasan dapat diselesaikan melalui mediasi, arbitrase, konsiliasi, dan transformasi sosial yang damai.",
        readingTime: "16 menit"
      },
      {
        id: "k11-4",
        title: "Bab 4: Integrasi & Reintegrasi Sosial",
        subtitle: "Menjaga Keutuhan Bangsa dan Kohesi Sosial",
        description: "Mempelajari syarat terwujudnya integrasi sosial (pluralitas, konsensus nilai, saling ketergantungan), faktor pendorong integrasi, serta proses reintegrasi pasca konflik atau bencana.",
        keyConcepts: ["Integrasi Nasional", "Kohesi Sosial", "Pluralisme", "Reintegrasi Pasca Konflik"],
        content: `Integrasi sosial adalah proses penyesuaian unsur-unsur yang berbeda di dalam masyarakat sehingga menjadi satu kesatuan yang utuh.

Faktor Pendorong Integrasi Sosial:
1. Toleransi kebudayaan yang berbeda.
2. Kesempatan yang seimbang dalam bidang ekonomi.
3. Sikap terbuka dari golongan yang berkuasa.
4. Adanya musuh bersama dari luar (common enemy).`,
        summary: "Integrasi dan reintegrasi sosial adalah kunci terciptanya kohesi sosial, kedamaian, dan persatuan dalam masyarakat multikultural.",
        readingTime: "15 menit"
      }
    ]
  },
  {
    grade: 12,
    title: "Sosiologi Kelas 12",
    subtitle: "Perubahan Sosial, Globalisasi, Ketimpangan, dan Pemberdayaan",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    chapters: [
      {
        id: "k12-1",
        title: "Bab 1: Perubahan Sosial & Dampaknya",
        subtitle: "Teori Evolusi, Siklus, Fungsionalis, dan Konflik",
        description: "Menganalisis bentuk perubahan sosial (lambat/cepat, kecil/besar, direncanakan/tidak direncanakan), faktor pendorong & penghambat perubahan, serta teori-teori perubahan sosial.",
        keyConcepts: ["Perubahan Revolusi & Evolusi", "Modernisasi", "Westernisasi", "Cultural Lag & Cultural Shock"],
        content: `Perubahan sosial meliputi perubahan pada lembaga-lembaga kemasyarakatan di suatu masyarakat, yang mempengaruhi sistem sosial, termasuk nilai, sikap, dan pola perilaku.

Teori Perubahan Sosial:
1. Teori Evolusi: Masyarakat berkembang secara linier dari sederhana ke kompleks (Auguste Comte, Herbert Spencer).
2. Teori Siklus: Masyarakat mengalami siklus kebangkitan, kemunduran, dan keruntuhan seperti siklus hidup manusia (Oswald Spengler, Arnold Toynbee).
3. Teori Fungsionalis: Perubahan dapat diterima jika tidak merusak keseimbangan sistem (equilibrium).
4. Teori Konflik: Perubahan didorong oleh pertentangan antarkelas sosial dalam memperebutkan sumber daya (Karl Marx).`,
        summary: "Perubahan sosial dianalisis melalui teori evolusi, siklus, fungsionalis, dan konflik, serta dampaknya terhadap cultural lag masyarakat.",
        readingTime: "20 menit"
      },
      {
        id: "k12-2",
        title: "Bab 2: Globalisasi & Modernisasi",
        subtitle: "Dunia Tanpa Batas dan Tantangan Identitas Lokal",
        description: "Mengkaji gejala globalisasi di berbagai bidang (ekonomi, politik, budaya, informasi), dampak positif dan negatif globalisasi, serta sikap kritis dalam menghadapi gorse globalisasi.",
        keyConcepts: ["Global Village", "Glokalisasi", "Hedonisme & Konsumerisme", "Kearifan Lokal"],
        content: `Globalisasi adalah proses integrasi internasional yang terjadi karena pertukaran pandangan dunia, produk, pemikiran, dan aspek-aspek kebudayaan lainnya.

Dampak Globalisasi:
- Positif: Kemajuan IPTEK, efisiensi waktu, mobilitas global yang cepat, pasar terbuka.
- Negatif: Westernisasi, lunturnya nilai gotong royong, konsumerisme, cultural shock dan cultural lag.`,
        summary: "Globalisasi menyatukan dunia melalui teknologi dan perdagangan, namun menuntut sikap kritis agar identitas dan kearifan lokal tetap terjaga.",
        readingTime: "16 menit"
      },
      {
        id: "k12-3",
        title: "Bab 3: Ketimpangan Sosial sebagai Masalah Global",
        subtitle: "Kesenjangan Ekonomi dan Pembangunan",
        description: "Menganalisis faktor penyebab ketimpangan sosial (demografi, letak geografis, globalisasi ekonomi), dampak ketimpangan terhadap kriminalitas, serta kebijakan redistribusi pendapatan.",
        keyConcepts: ["Ketimpangan Ekonomi", "Redistribusi Pendapatan", "Ketimpangan Kultural", "Keadilan Sosial"],
        content: `Ketimpangan sosial adalah kondisi ketidaksetaraan dalam distribusi sumber daya, kekayaan, kesempatan, dan hak di antara anggota masyarakat.

Kebijakan Penanggulangan Ketimpangan:
1. Subsidi dan bantuan sosial tepat sasaran.
2. Peningkatan kualitas pendidikan dan layanan kesehatan merata di daerah tertinggal.
3. Pemberdayaan UMKM dan ekonomi kerakyatan.`,
        summary: "Ketimpangan sosial menuntut kebijakan redistribusi pendapatan dan pembangunan merata demi tercapainya keadilan sosial bagi seluruh rakyat.",
        readingTime: "15 menit"
      },
      {
        id: "k12-4",
        title: "Bab 4: Pemberdayaan Komunitas & Kearifan Lokal",
        subtitle: "Membangun Kemandirian Masyarakat Melalui Partisipasi",
        description: "Mempelajari tahapan pemberdayaan komunitas (penyadaran, pengkapasitasan, pemberdayaan), peran aktor pemberdayaan (pemerintah, LSM, masyarakat), serta integrasi kearifan lokal.",
        keyConcepts: ["Pemberdayaan Masyarakat", "Kearifan Lokal (Local Wisdom)", "Participatory Action Research (PAR)", "Kemandirian Ekonomi"],
        content: `Pemberdayaan komunitas adalah proses pembangunan di mana masyarakat berinisiatif memulai proses kegiatan sosial untuk memperbaiki situasi diri sendiri.

Tahapan Pemberdayaan:
1. Tahap Penyadaran: Memberikan pemahaman akan potensi dan masalah yang dihadapi.
2. Tahap Pengkapasitasan (Capacity Building): Pelatihan keterampilan dan penguatan kelembagaan.
3. Tahap Pemberdayaan: Memberikan kekuasaan atau peran aktif dalam mengambil keputusan.`,
        summary: "Pemberdayaan komunitas bertujuan menciptakan kemandirian melalui partisipasi aktif dan penguatan kearifan lokal.",
        readingTime: "18 menit"
      }
    ]
  }
];

export const INITIAL_PDF_MODULES: PdfModule[] = [
  {
    id: "pdf-1",
    title: "Modul Lengkap Sosiologi Kelas 10: Pengantar & Interaksi Sosial",
    grade: 10,
    chapterTitle: "Bab 1 & 2: Pengantar Sosiologi & Interaksi Sosial",
    fileSize: "2.4 MB",
    uploadDate: "2026-07-20",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    summary: "Modul komprehensif membahas definisi sosiologi menurut para ahli, ciri-ciri empiris, teoretis, serta dinamika interaksi asosiatif dan disosiatif.",
    author: "Tim Kurikulum Sosiologi"
  },
  {
    id: "pdf-2",
    title: "Ringkasan Materi Nilai, Norma, & Pengendalian Sosial Kelas 10",
    grade: 10,
    chapterTitle: "Bab 3 & 5: Nilai Norma & Penyimpangan",
    fileSize: "1.8 MB",
    uploadDate: "2026-07-22",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    summary: "Panduan praktis memahami tingkatan norma dari cara hingga hukum, serta teori penyimpangan sosial oleh Robert Merton dan Edwin Sutherland.",
    author: "Dra. Siti Aminah, M.Pd"
  },
  {
    id: "pdf-3",
    title: "Modul Sosiologi Kelas 11: Konflik, Kekerasan, & Resolusi Damai",
    grade: 11,
    chapterTitle: "Bab 3: Konflik & Perdamaian",
    fileSize: "3.1 MB",
    uploadDate: "2026-07-21",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    summary: "Materi mendalam tentang mediasi, arbitrase, konsiliasi, dan transformasi konflik dalam masyarakat multikultural Indonesia.",
    author: "Dr. Budi Santoso, M.Si"
  },
  {
    id: "pdf-4",
    title: "Modul Sosiologi Kelas 12: Globalisasi & Pemberdayaan Komunitas",
    grade: 12,
    chapterTitle: "Bab 2 & 4: Globalisasi & Pemberdayaan",
    fileSize: "4.2 MB",
    uploadDate: "2026-07-25",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    summary: "Kajian lengkap dampak globalisasi terhadap budaya lokal serta tahapan Participatory Action Research (PAR) dalam pemberdayaan masyarakat.",
    author: "Prof. Dr. H. Malik Ibrahim"
  }
];

export const INITIAL_QUIZZES: QuizQuestion[] = [
  {
    id: "q1",
    grade: 10,
    topic: "Pengantar Sosiologi",
    question: "Ciri sosiologi yang menyatakan bahwa ilmu ini tidak mempersoalkan baik-buruknya suatu fakta, melainkan menjelaskan fakta tersebut secara analitis disebut...",
    options: ["Empiris", "Teoretis", "Kumulatif", "Non-etis"],
    correctIndex: 3,
    explanation: "Non-etis berarti sosiologi membahas fakta secara objektif tanpa menilai moral baik atau buruknya suatu gejala sosial."
  },
  {
    id: "q2",
    grade: 10,
    topic: "Interaksi Sosial",
    question: "Proses sosial asosiatif yang berupa perpaduan dua kebudayaan atau lebih disertai hilangnya kepribadian kebudayaan asli sehingga membentuk kebudayaan baru disebut...",
    options: ["Akulturasi", "Asimilasi", "Kompetisi", "Kontravensi"],
    correctIndex: 1,
    explanation: "Asimilasi adalah pembauran dua kebudayaan yang disertai dengan hilangnya ciri khas kebudayaan asli menjadi kebudayaan baru."
  },
  {
    id: "q3",
    grade: 11,
    topic: "Kelompok Sosial",
    question: "Menurut Ferdinand Tönnies, bentuk kehidupan bersama di mana anggota diikat oleh hubungan batin yang murni, bersifat alamiah, dan kekal disebut...",
    options: ["Gesellschaft", "Paguyuban (Gemeinschaft)", "Crowd", "Public"],
    correctIndex: 1,
    explanation: "Gemeinschaft (paguyuban) adalah kelompok sosial dengan ikatan batin yang kuat, kekal, dan alami seperti keluarga dan kerabat."
  },
  {
    id: "q4",
    grade: 11,
    topic: "Konflik & Akomodasi",
    question: "Penyelesaian konflik di mana pihak ketiga bertindak sebagai penasihat dan memberikan saran kepada pihak yang berselisih tanpa memberikan keputusan mengikat disebut...",
    options: ["Arbitrase", "Mediasi", "Ajudikasi", "Stalemate"],
    correctIndex: 1,
    explanation: "Mediasi menggunakan pihak ketiga yang netral untuk memberi nasihat, sedangkan arbitrase memberikan keputusan yang mengikat."
  },
  {
    id: "q5",
    grade: 12,
    topic: "Perubahan Sosial",
    question: "Teori perubahan sosial yang berpandangan bahwa masyarakat berkembang secara linier dari masyarakat sederhana menuju masyarakat yang kompleks adalah...",
    options: ["Teori Siklus", "Teori Evolusi", "Teori Konflik", "Teori Fungsionalis"],
    correctIndex: 1,
    explanation: "Teori evolusi melihat perubahan sosial sebagai tahapan linier dari bentuk sederhana menuju kompleks."
  }
];

export const INITIAL_DISCUSSIONS: DiscussionPost[] = [
  {
    id: "disc-1",
    author: "Rizky Pratama",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Siswa",
    timestamp: "2 jam yang lalu",
    title: "Diskusi: Apa perbedaan nyata antara Asimilasi dan Akulturasi?",
    content: "Halo teman-teman dan guru, saya masih agak bingung membedakan asimilasi dan akulturasi. Apakah dalam akulturasi kebudayaan asli benar-benar hilang? Mohon penjelasannya ya!",
    grade: 10,
    likes: 12,
    replies: [
      {
        id: "rep-1",
        author: "Ibu Dr. Ratna, M.Pd (Guru)",
        role: "Guru",
        content: "Pertanyaan yang sangat bagus! Ingat: Pada *akulturasi*, percampuran budaya terjadi TANPA menghilangkan kepribadian atau ciri asli kebudayaan lama (contoh: Masjid Kudus perpaduan Hindu-Islam). Sedangkan pada *asimilasi*, kebudayaan lama melebur membentuk kebudayaan baru yang benar-benar tunggal.",
        timestamp: "1 jam yang lalu"
      }
    ]
  },
  {
    id: "disc-2",
    author: "Aulia Zahra",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    role: "Siswa",
    timestamp: "Kemarin",
    title: "Studi Kasus: Dampak Positif dan Negatif Globalisasi bagi Remaja",
    content: "Di era digital saat ini, media sosial mendekatkan kita dengan budaya global. Tapi di sisi lain banyak remaja yang mengalami cultural lag. Bagaimana cara kita menyikapinya?",
    grade: 12,
    likes: 24,
    replies: [
      {
        id: "rep-2",
        author: "Dimas Anggara",
        role: "Siswa",
        content: "Menurut saya kuncinya ada pada filterisasi nilai dan penguatan kearifan lokal di sekolah maupun keluarga.",
        timestamp: "20 jam yang lalu"
      }
    ]
  }
];
