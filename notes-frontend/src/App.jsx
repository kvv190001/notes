import { useState } from 'react';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'editor'
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setCurrentView('editor');
  };

  const handleCreateNew = () => {
    setSelectedNote(null);
    setCurrentView('editor');
  };

  const handleSave = () => {
    setCurrentView('list');
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedNote(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Notes App</h1>
      </header>
      
      <main className="app-main">
        {currentView === 'list' ? (
          <NotesList 
            onSelectNote={handleSelectNote}
            onCreateNew={handleCreateNew}
          />
        ) : (
          <NoteEditor
            note={selectedNote}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;