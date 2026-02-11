import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Save,
  X,
  FileText,
  Clock,
  BookOpen
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getUserProgress, updateNotes } from '@/api/userActions';
import { getAllProblems } from '@/api/content';

interface Note {
  id: string;           // UserProgress _id
  problemId: string;    // problem_id ref
  problemTitle: string;
  content: string;
  updatedAt: Date;
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState({ content: '' });
  const [problems, setProblems] = useState<any[]>([]);

  // New note creation state
  const [newNoteProblemId, setNewNoteProblemId] = useState('');
  const [problemSearch, setProblemSearch] = useState('');

  // Fetch notes from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [progressData, problemsData] = await Promise.all([
          getUserProgress(),
          getAllProblems()
        ]);
        setProblems(problemsData);

        // Extract notes from progress entries that have non-empty notes
        const notesFromProgress: Note[] = progressData
          .filter((p: any) => p.notes && p.notes.trim() !== '')
          .map((p: any) => {
            const problem = problemsData.find((prob: any) => prob._id === p.problem_id);
            return {
              id: p._id,
              problemId: p.problem_id,
              problemTitle: problem?.title || 'Unknown Problem',
              content: p.notes,
              updatedAt: new Date(p.updatedAt)
            };
          })
          .sort((a: Note, b: Note) => b.updatedAt.getTime() - a.updatedAt.getTime());

        setNotes(notesFromProgress);
      } catch (e) {
        console.error('Failed to fetch notes', e);
        toast.error('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Problems available for new notes (not already having notes)
  const availableProblems = problems.filter(p => {
    const hasNote = notes.some(n => n.problemId === p._id);
    return !hasNote && p.title.toLowerCase().includes(problemSearch.toLowerCase());
  });

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(true);
    setSelectedNote(null);
    setEditForm({ content: '' });
    setNewNoteProblemId('');
    setProblemSearch('');
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
    setIsCreating(false);
    setEditForm({ content: note.content });
  };

  const handleSave = async () => {
    if (isCreating) {
      if (!newNoteProblemId) {
        toast.error('Please select a problem');
        return;
      }
      if (!editForm.content.trim()) {
        toast.error('Note content is required');
        return;
      }

      try {
        await updateNotes(newNoteProblemId, editForm.content);
        const problem = problems.find((p: any) => p._id === newNoteProblemId);
        const newNote: Note = {
          id: newNoteProblemId + '-note',
          problemId: newNoteProblemId,
          problemTitle: problem?.title || 'Unknown Problem',
          content: editForm.content,
          updatedAt: new Date()
        };
        setNotes([newNote, ...notes]);
        toast.success('Note created successfully');
      } catch (e) {
        toast.error('Failed to create note');
        return;
      }
    } else if (selectedNote) {
      if (!editForm.content.trim()) {
        toast.error('Note content is required');
        return;
      }

      try {
        await updateNotes(selectedNote.problemId, editForm.content);
        setNotes(notes.map(n =>
          n.id === selectedNote.id
            ? { ...n, content: editForm.content, updatedAt: new Date() }
            : n
        ));
        toast.success('Note updated successfully');
      } catch (e) {
        toast.error('Failed to update note');
        return;
      }
    }

    setIsEditing(false);
    setIsCreating(false);
    setSelectedNote(null);
  };

  const handleDelete = async (note: Note) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        // Delete note by setting it to empty string
        await updateNotes(note.problemId, '');
        setNotes(notes.filter(n => n.id !== note.id));
        if (selectedNote?.id === note.id) {
          setSelectedNote(null);
        }
        toast.success('Note deleted');
      } catch (e) {
        toast.error('Failed to delete note');
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    if (isCreating) {
      setSelectedNote(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-white/60">Loading notes...</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a088ff]/10 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">
              My <span className="gradient-text">Notes</span>
            </h1>
            <p className="text-white/60">
              Save and organize your learnings ({notes.length} notes)
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#a088ff] to-[#63e3ff] text-[#141414] font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            {/* Notes */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => !isEditing && setSelectedNote(note)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${selectedNote?.id === note.id
                      ? 'bg-[#a088ff]/20 border border-[#a088ff]/30'
                      : 'glass hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate mb-1">{note.problemTitle}</h3>
                      <p className="text-white/40 text-sm line-clamp-2 mb-2">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {formatDate(note.updatedAt)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {filteredNotes.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40 text-sm">
                    {notes.length === 0 ? 'No notes yet. Create one!' : 'No notes found'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Note Detail / Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {isEditing ? (
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {isCreating ? 'Create Note' : 'Edit Note'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 rounded-lg bg-[#a088ff]/20 text-[#a088ff] hover:bg-[#a088ff]/30 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {isCreating && (
                    <div>
                      <label className="text-sm text-white/60 mb-1 block">Select Problem</label>
                      <Input
                        type="text"
                        value={problemSearch}
                        onChange={(e) => setProblemSearch(e.target.value)}
                        placeholder="Search for a problem..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 mb-2"
                      />
                      {problemSearch && (
                        <div className="max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-[#1a1a1a]">
                          {availableProblems.slice(0, 8).map((p: any) => (
                            <button
                              key={p._id}
                              onClick={() => {
                                setNewNoteProblemId(p._id);
                                setProblemSearch(p.title);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors ${newNoteProblemId === p._id ? 'bg-[#a088ff]/20 text-[#a088ff]' : 'text-white/80'
                                }`}
                            >
                              <span>{p.title}</span>
                              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded difficulty-${p.difficulty?.toLowerCase()}`}>
                                {p.difficulty}
                              </span>
                            </button>
                          ))}
                          {availableProblems.length === 0 && (
                            <p className="px-3 py-2 text-sm text-white/40">No matching problems</p>
                          )}
                        </div>
                      )}
                      {newNoteProblemId && !problemSearch.includes(problems.find((p: any) => p._id === newNoteProblemId)?.title || '') && (
                        <p className="text-xs text-[#a088ff] mt-1">
                          Selected: {problems.find((p: any) => p._id === newNoteProblemId)?.title}
                        </p>
                      )}
                    </div>
                  )}

                  {!isCreating && selectedNote && (
                    <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-white/60">
                      Problem: <span className="text-white">{selectedNote.problemTitle}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-white/60 mb-1 block">Notes</label>
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      placeholder="Write your notes here... Key insights, approach, time complexity, etc."
                      rows={15}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#a088ff] resize-none font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            ) : selectedNote ? (
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">{selectedNote.problemTitle}</h2>
                    <div className="flex items-center gap-3 text-sm text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last updated {formatDate(selectedNote.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(selectedNote)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Edit2 className="w-5 h-5 text-white/60" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedNote)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-white/60 hover:text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="markdown-content text-white/80 whitespace-pre-wrap">
                    {selectedNote.content}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Select a note to view</h3>
                <p className="text-white/40 text-sm mb-4">Or create a new note to get started</p>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Create Note
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
