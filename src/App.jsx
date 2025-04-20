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
        time: new Date().toLocaleString()
      };
      const updatedNotes = [...notes(), newNote];
      saveNotes(updatedNotes);
      setNoteText('');
    }
  };

  const deleteNote = (indexToDelete) => {
    const updatedNotes = notes().filter((_, index) => index !== indexToDelete);
    saveNotes(updatedNotes);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📝 Notes App</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={noteText()}
          onInput={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          placeholder="Write a note..."
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={addNote} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          Add Note
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes().map((note, index) => (
          <li
            key={index}
            style={{
              marginBottom: '0.5rem',
              background: '#fff',
              padding: '0.5rem',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'block',
              justifyContent: 'space-between',
              alignItems: 'center',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap' // this helps with line breaks
            }}
          >
            <div><strong>{index + 1}.</strong> {note.text}</div>
            <small style={{ color: '#555' }}>🕒 {note.time}</small>
            <button
              onClick={() => deleteNote(index)}
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
