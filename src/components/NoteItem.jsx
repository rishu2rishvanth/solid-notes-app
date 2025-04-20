function NoteItem({ note, index, saveNotes }) {
    const toggleCompletion = () => {
      const updatedNotes = notes.map((n, i) => {
        if (i === index) {
          return { ...n, completed: !n.completed };
        }
        return n;
      });
      saveNotes(updatedNotes);
    };
  
    const deleteNote = () => {
      const updatedNotes = notes.filter((_, i) => i !== index);
      saveNotes(updatedNotes);
    };
  
    return (
      <li class="note-item">
        <div class="note-text">
          <strong>{notes.length - index}.</strong> {note.text}
        </div>
        <div class="note-actions">
          <small class="note-time">🕒 {note.time}</small>
          <button onClick={toggleCompletion}>
            {note.completed ? '✔️ Completed' : '❌ Mark as Done'}
          </button>
          <button onClick={deleteNote}>🗑️ Delete</button>
        </div>
      </li>
    );
  }
  
  export default NoteItem;
  