import { useState, useEffect } from 'react';
import { notesApi } from '../services/notesApi';

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      setSaving(true);
      const noteData = { title: title.trim(), content: content.trim() };
      
      if (note?.id) {
        // Update existing note (you'll need to add PUT endpoint to backend)
        await notesApi.updateNote(note.id, noteData);
      } else {
        // Create new note
        await notesApi.createNote(noteData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="note-editor">
      <div className="editor-header">
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <div className="editor-actions">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      <textarea
        placeholder="Start writing your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="content-textarea"
      />
    </div>
  );
};

export default NoteEditor;