import { useState, useEffect } from 'react';
import { notesApi } from '../services/notesApi';

const NotesList = ({ onSelectNote, onCreateNew }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesApi.getAllNotes();
      setNotes(response.data);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading notes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="notes-list">
      <div className="notes-header">
        <h2>My Notes</h2>
        <button onClick={onCreateNew} className="btn-primary">
          + New Note
        </button>
      </div>
      
      {notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => onSelectNote(note)}
            >
              <h3>{note.title}</h3>
              <p>{note.content?.substring(0, 100)}...</p>
              <small>
                {new Date(note.updatedAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;