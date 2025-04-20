import '../styles/NoteList.css';

function NoteList(props) {
  // Toggle the completion status of a note (strike-through)
  const toggleCompletion = (index) => {
    const updatedNotes = props.notes.map((note, i) => {
      if (i === index) {
        return { ...note, completed: !note.completed };  // Toggle the completed status
      }
      return note;
    });
    props.saveNotes(updatedNotes);  // Save the updated notes to localStorage
  };

  // Delete a note
  const deleteNote = (index) => {
    const updatedNotes = props.notes.filter((_, i) => i !== index);  // Remove the note at the given index
    props.saveNotes(updatedNotes);  // Save the updated notes to localStorage
  };

  return (
    <div class="note-list">
      {props.notes.length === 0 ? (
        <p>No notes available. Add a note to get started!</p>
      ) : (
        <ul>
          {props.notes.map((note, index) => (
            <li key={index} class={`note-item ${note.completed ? 'completed' : ''}`}>
              <div class="note-text">
                <strong>{props.notes.length - index}.</strong> {note.text}
              </div>
              <div class="note-actions">
                <small class="note-time">🕒 {note.time}</small>
                <button
                  onClick={() => toggleCompletion(index)}
                  class={`toggle-btn ${note.completed ? 'completed' : ''}`}
                >
                  {note.completed ? '✔️ Completed' : '❌ Mark as Done'}
                </button>
                <button
                  onClick={() => deleteNote(index)}
                  class="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;
