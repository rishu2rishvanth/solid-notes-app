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

      <ul>
        {notes().map((note, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
