import { createSignal } from 'solid-js';
import '../styles/NoteInput.css';

function NoteInput(props) {
  const [noteText, setNoteText] = createSignal(''); // State to hold the text input

  // Handle adding a note
  const handleAddNote = () => {
    const text = noteText().trim();
    if (text) {
      props.addNote(text);  // Call addNote function from App.jsx
      setNoteText('');  // Clear input after adding note
    }
  };

  return (
    <div class="note-input-container">
      <input
        type="text"
        value={noteText()}
        onInput={(e) => setNoteText(e.target.value)}  // Update noteText state
        onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}  // Allow "Enter" key to add note
        placeholder="Write a note..."
        class="note-input"
      />
      <button onClick={handleAddNote} class="add-note-btn">Add Note</button>
    </div>
  );
}

export default NoteInput;
