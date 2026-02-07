import { useState } from 'react';
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

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  problemId?: string;
}

// Mock notes data
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Two Sum - Hash Map Approach',
    content: 'Key insight: Use a hash map to store complements. For each number, check if its complement exists in the map.\n\nTime Complexity: O(n)\nSpace Complexity: O(n)\n\n```python\ndef twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n```',
    tags: ['Array', 'Hash Table', 'Two Sum'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    problemId: 'p1'
  },
  {
    id: '2',
    title: 'Binary Tree Traversal Patterns',
    content: 'Three main traversal patterns:\n\n1. **Inorder**: Left -> Root -> Right\n2. **Preorder**: Root -> Left -> Right\n3. **Postorder**: Left -> Right -> Root\n\nFor level order traversal, use BFS with a queue.',
    tags: ['Trees', 'BFS', 'DFS'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: 'Dynamic Programming Patterns',
    content: 'Common DP patterns to remember:\n\n1. Fibonacci style\n2. 0/1 Knapsack\n3. Unbounded Knapsack\n4. Longest Common Subsequence\n5. Palindromes\n6. Matrix Chain Multiplication\n\nAlways start with recursive solution, then memoize, then convert to tabulation.',
    tags: ['DP', 'Patterns'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  }
];

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '', tags: '' });

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(true);
    setSelectedNote(null);
    setEditForm({ title: '', content: '', tags: '' });
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
    setEditForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', ')
    });
  };

  const handleSave = () => {
    if (!editForm.title.trim()) {
      toast.error('Title is required');
      return;
    }

    const tags = editForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (isCreating) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: editForm.title,
        content: editForm.content,
        tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([newNote, ...notes]);
      toast.success('Note created successfully');
    } else if (selectedNote) {
      setNotes(notes.map(n => 
        n.id === selectedNote.id 
          ? { ...n, title: editForm.title, content: editForm.content, tags, updatedAt: new Date() }
          : n
      ));
      toast.success('Note updated successfully');
    }

    setIsEditing(false);
    setIsCreating(false);
    setSelectedNote(null);
  };

  const handleDelete = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(n => n.id !== noteId));
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
      toast.success('Note deleted');
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
              Save and organize your learnings
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
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedNote?.id === note.id
                      ? 'bg-[#a088ff]/20 border border-[#a088ff]/30'
                      : 'glass hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate mb-1">{note.title}</h3>
                      <p className="text-white/40 text-sm line-clamp-2 mb-2">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {formatDate(note.updatedAt)}
                      </div>
                    </div>
                  </div>
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span className="text-white/40 text-xs">+{note.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              ))}

              {filteredNotes.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40 text-sm">No notes found</p>
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
                  <div>
                    <label className="text-sm text-white/60 mb-1 block">Title</label>
                    <Input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Note title"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60 mb-1 block">Tags (comma separated)</label>
                    <Input
                      type="text"
                      value={editForm.tags}
                      onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                      placeholder="e.g. Array, DP, Trees"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60 mb-1 block">Content</label>
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      placeholder="Write your notes here... (Markdown supported)"
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
                    <h2 className="text-xl font-semibold text-white mb-1">{selectedNote.title}</h2>
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
                      onClick={() => handleDelete(selectedNote.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-white/60 hover:text-red-400" />
                    </button>
                  </div>
                </div>

                {selectedNote.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedNote.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full bg-[#a088ff]/10 text-[#a088ff] text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

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
