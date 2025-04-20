import { createSignal } from 'solid-js';

function App() {
  const [notes, setNotes] = createSignal([]);
  const [noteText, setNoteText] = createSignal('');

  const addNote = () => {
    if (noteText().trim() !== '') {
      setNotes([...notes(), noteText()]);
      setNoteText('');
    }
  };

  const deleteNote = (indexToDelete) => {
    setNotes(notes().filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📝 Notes App</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={noteText()}
          onInput={(e) => setNoteText(e.target.value)}
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
            style={{
              padding: '3px',
            }}
            >
              {note}
            </span>
            <button
              onClick={() => deleteNote(index)}
              style={{
                background: 'red',
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
