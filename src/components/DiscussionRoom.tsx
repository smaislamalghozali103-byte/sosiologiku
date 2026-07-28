import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  MessageCircle, 
  Plus, 
  Search, 
  Send, 
  User, 
  Sparkles,
  X,
  GraduationCap
} from 'lucide-react';
import { INITIAL_DISCUSSIONS } from '../data/sosiologiData';
import { DiscussionPost, GradeLevel } from '../types';

export const DiscussionRoom: React.FC = () => {
  const [discussions, setDiscussions] = useState<DiscussionPost[]>(INITIAL_DISCUSSIONS);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newGrade, setNewGrade] = useState<GradeLevel>(10);
  const [authorName, setAuthorName] = useState('Siswa Sosiologi');

  // Reply input states mapped by post id
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPost: DiscussionPost = {
      id: `disc-${Date.now()}`,
      author: authorName,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Siswa",
      timestamp: "Baru saja",
      title: newTitle,
      content: newContent,
      grade: newGrade,
      likes: 0,
      replies: []
    };

    setDiscussions([newPost, ...discussions]);
    setIsNewPostModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleLikePost = (postId: string) => {
    setDiscussions(discussions.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleSendReply = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const replyText = replyInputs[postId];
    if (!replyText) return;

    setDiscussions(discussions.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: `rep-${Date.now()}`,
              author: authorName,
              role: "Siswa",
              content: replyText,
              timestamp: "Baru saja"
            }
          ]
        };
      }
      return post;
    }));

    setReplyInputs({ ...replyInputs, [postId]: '' });
  };

  const filteredDiscussions = discussions.filter(item => {
    const matchesGrade = selectedGradeFilter === 'all' || item.grade.toString() === selectedGradeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2 border border-purple-200">
            <MessageSquare className="w-3.5 h-3.5" />
            Kolaborasi & Tanya Jawab Sosiologi
          </div>
          <h2 className="text-xl font-bold text-slate-900">Ruang Diskusi & Forum Siswa</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Diskusikan studi kasus sosiologis, tanyakan materi yang belum dipahami, dan berikan tanggapan bersama rekan sekelas dan guru.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Buat Topik Diskusi Baru
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedGradeFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedGradeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Semua Topik
          </button>
          <button
            onClick={() => setSelectedGradeFilter('10')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedGradeFilter === '10' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 10
          </button>
          <button
            onClick={() => setSelectedGradeFilter('11')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedGradeFilter === '11' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 11
          </button>
          <button
            onClick={() => setSelectedGradeFilter('12')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedGradeFilter === '12' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 12
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik diskusi..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Discussion Posts Feed */}
      <div className="space-y-6">
        {filteredDiscussions.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            {/* Post Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={post.avatar} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{post.author}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      post.role === 'Guru' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {post.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{post.timestamp}</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                post.grade === 10 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                post.grade === 11 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                Kelas {post.grade}
              </span>
            </div>

            {/* Post Content */}
            <div>
              <h3 className="font-bold text-base text-slate-900 mb-2">{post.title}</h3>
              <p className="text-xs lg:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {post.content}
              </p>
            </div>

            {/* Post Actions Bar */}
            <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-slate-500">
              <button
                onClick={() => handleLikePost(post.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likes} Suka</span>
              </button>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{post.replies.length} Tanggapan</span>
              </div>
            </div>

            {/* Replies List */}
            {post.replies.length > 0 && (
              <div className="mt-4 pl-4 sm:pl-6 border-l-2 border-slate-200 space-y-3 pt-2">
                {post.replies.map((rep) => (
                  <div key={rep.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rep.author}</span>
                        <span className={`text-[10px] px-2 py-0.2 rounded-full font-semibold ${
                          rep.role === 'Guru' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {rep.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rep.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700">{rep.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Form */}
            <form onSubmit={(e) => handleSendReply(post.id, e)} className="mt-3 flex items-center gap-2 pt-2">
              <input
                type="text"
                value={replyInputs[post.id] || ''}
                onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                placeholder="Tulis tanggapan atau jawaban..."
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
                title="Kirim Tanggapan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ))}
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800 text-base">Belum Ada Topik Diskusi</h4>
          <p className="text-xs text-slate-500 mt-1">Jadilah yang pertama membuat topik diskusi baru!</p>
        </div>
      )}

      {/* New Topic Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-fadeIn space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Buat Topik Diskusi Baru</h3>
                  <p className="text-xs text-slate-500">Diskusikan pertanyaan sosiologi bersama rekan</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Pengirim *
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tingkat Kelas
                </label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(Number(e.target.value) as GradeLevel)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium"
                >
                  <option value={10}>Kelas 10 (Fase E)</option>
                  <option value={11}>Kelas 11 (Fase F)</option>
                  <option value={12}>Kelas 12 (Fase F)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Judul Pertanyaan / Topik *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Apa contoh konkrit mobilitas sosial vertikal naik?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Isi Pertanyaan / Penjelasan *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Jelaskan pertanyaan atau topik yang ingin didiskusikan..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
                >
                  Publikasikan Diskusi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
