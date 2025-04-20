import { createSignal, onMount } from 'solid-js';

function App() {
  const [notes, setNotes] = createSignal([]);
  const [noteText, setNoteText] = createSignal('');

  // Load notes from localStorage when app starts
  onMount(() => {
    const saved = localStorage.getItem('my-notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  });

  // Save notes to localStorage
  const saveNotes = (newNotes) => {
    localStorage.setItem('my-notes', JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const addNote = () => {
    if (noteText().trim() !== '') {
      const newNote = {
        text: noteText(),
        time: new Date().toLocaleString(),
        completed: false,  // New field to track if the note is marked as completed
      };
      const updatedNotes = [newNote, ...notes()];  // Add new note to the top of the list
      saveNotes(updatedNotes);
      setNoteText('');
    }
  };

  const deleteNote = (indexToDelete) => {
    const updatedNotes = notes().filter((_, index) => index !== indexToDelete);
    saveNotes(updatedNotes);
  };

  // Toggle the completion (strike-through) of a note
  const toggleCompletion = (indexToToggle) => {
    const updatedNotes = notes().map((note, index) => {
      if (index === indexToToggle) {
        return { ...note, completed: !note.completed };
      }
      return note;
    });
    saveNotes(updatedNotes);
  };

  // Export notes as JSON
  const exportNotes = () => {
    const notesBlob = new Blob([JSON.stringify(notes())], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(notesBlob);
    link.download = 'my-notes.json';
    link.click();
  };

  // Import notes from a JSON file
  const importNotes = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const importedNotes = JSON.parse(reader.result);
          if (Array.isArray(importedNotes)) {
            saveNotes(importedNotes);  // Update notes with the imported ones
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

    // Proceed with the confirmation to clear notes
    const confirmClear = window.confirm('Are you sure you want to clear all notes? This action cannot be undone.');
    if (confirmClear) {
      saveNotes([]);  // Clear notes
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '800px', margin: 'auto' }}>
      {/* Header with buttons aligned on the same line */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <h1 style={{ margin: 0, width: '60%' }}>📝 Notes App</h1>
        <div>
          <button
            onClick={exportNotes}
            style={{
              background: 'blue',
              color: '#fff',
              padding: '0.5rem 1rem',
              margin: '0.5rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#007bb5'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'blue'}
          >
            📥 Export Notes
          </button>
          <input
            type="file"
            accept=".json"
            onChange={importNotes}
            style={{
              display: 'none',
            }}
          />
          <button
            onClick={() => document.querySelector('input[type="file"]').click()}
            style={{
              background: 'orange',
              color: '#fff',
              padding: '0.5rem 1rem',
              margin: '0.5rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff7f00'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'orange'}
          >
            📤 Import Notes
          </button>
          <button
            onClick={clearAllNotes}
            style={{
              background: 'red',
              color: '#fff',
              padding: '0.5rem 1rem',
              margin: '0.5rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c9302c'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'red'}
          >
            🧹 Clear All Notes
          </button>
        </div>
      </div>

      {/* Note input and adding */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={noteText()}
          onInput={(e) => setNoteText(e.target.value.trim())}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          placeholder="Write a note..."
          style={{
            padding: '0.75rem',
            width: '98%',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginBottom: '1rem',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={addNote}
          style={{
            background: '#28a745',
            color: '#fff',
            padding: '0.5rem 1rem',
            margin: '0.5rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Add Note
        </button>
      </div>

      {/* Notes list */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes().map((note, index) => (
          <li
            key={index}
            style={{
              marginBottom: '0.75rem',
              background: '#fff',
              padding: '0.75rem',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textDecoration: note.completed ? 'line-through' : 'none', // Apply strike-through when completed
              color: note.completed ? '#888' : '#000', // Optional: Change color for completed notes
            }}
          >
            <div
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                hyphens: 'auto',
                width: '60%',
              }}
            >
              <strong>{notes().length - index}.</strong> {note.text}
            </div>
            <div>
              <small style={{ color: '#555' }}>🕒 {note.time}</small>
              <button
                onClick={() => toggleCompletion(index)}  // Toggle completion on click
                style={{
                  background: note.completed ? 'gray' : 'green',
                  margin: '3px',
                  color: '#fff',
                  border: 'none',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                {note.completed ? '✔️ Completed' : '❌ Mark as Done'}
              </button>
              <button
                onClick={() => deleteNote(index)}  // Delete note on click
                style={{
                  background: 'red',
                  margin: '3px',
                  color: '#fff',
                  border: 'none',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
