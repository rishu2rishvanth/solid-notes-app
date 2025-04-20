import { createSignal, onMount } from 'solid-js';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
  const [notes, setNotes] = createSignal([]);
  // Search notes from localStorage
  const [searchText, setSearchText] = createSignal('');
  const [darkMode, setDarkMode] = createSignal(false);
  
  onMount(() => {
    const stored = localStorage.getItem('dark-mode');
    setDarkMode(stored === 'true');
    updateBodyClass(stored === 'true');

    // Load notes from localStorage when app starts
    const saved = localStorage.getItem('my-notes');
    if (saved) {
      setNotes(JSON.parse(saved)); // Set notes state from localStorage
    }
  });
  
  const toggleDarkMode = () => {
    const newValue = !darkMode();
    setDarkMode(newValue);
    localStorage.setItem('dark-mode', newValue);
    updateBodyClass(newValue);
  };
  
  const updateBodyClass = (isDark) => {
    document.body.classList.toggle('dark', isDark);
  };

  // Save notes to localStorage
  const saveNotes = (newNotes) => {
    localStorage.setItem('my-notes', JSON.stringify(newNotes));
    setNotes(newNotes);  // Update the notes state
  };

  // Add a new note
  const addNote = (noteText) => {
    if (noteText.trim() !== '') {
      const newNote = {
        text: noteText,
        time: new Date().toLocaleString(),
        completed: false,  // Track completion status
      };
      const updatedNotes = [newNote, ...notes()];  // Add new note to the top
      saveNotes(updatedNotes);  // Update state and localStorage
    }
  };

  // Export notes as JSON
  const exportNotes = () => {
    const notesBlob = new Blob([JSON.stringify(notes())], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(notesBlob);
    link.download = 'my-notes.json';
    link.click();
  };

  // Import notes from a file
  const importNotes = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const importedNotes = JSON.parse(reader.result);
          if (Array.isArray(importedNotes)) {
            saveNotes(importedNotes); // Set notes from the imported file
          } else {
            alert('Invalid notes file');
          }
        } catch (error) {
          alert('Error reading file');
        }
      };
      reader.readAsText(file);
    }
  };

  // Clear all notes with export prompt
  const clearAllNotes = () => {
    const confirmExport = window.confirm('Would you like to export your notes before clearing them?');
    if (confirmExport) {
      exportNotes();  // Export notes first
    }

    const confirmClear = window.confirm('Are you sure you want to clear all notes? This action cannot be undone.');
    if (confirmClear) {
      saveNotes([]);  // Clear notes
    }
  };

  return (
    <div class="app-container">
      <h1>📝 Notes App</h1>

      <div class="button-group">
        <button onClick={exportNotes}>📥 Export Notes</button>
        <input type="file" accept=".json" onChange={importNotes} style={{ display: 'none' }} />
        <button onClick={() => document.querySelector('input[type="file"]').click()}>📤 Import Notes</button>
        <button onClick={clearAllNotes}>🧹 Clear All Notes</button>
        <button
          onClick={toggleDarkMode}
          style={{
            background: darkMode() ? '#333' : '#eee',
            color: darkMode() ? '#fff' : '#000',
            border: 'none',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {darkMode() ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* NoteInput Component */}
      <NoteInput addNote={addNote} />

      {/* NoteList Component */}
      <NoteList notes={notes().filter(note =>
          note.text.toLowerCase().includes(searchText().toLowerCase())
        )}
        saveNotes={saveNotes}
      />
      
      {/* SearchBar Component */}
      <SearchBar onSearch={setSearchText} />

    </div>
  );
}

export default App;
