import { createSignal } from 'solid-js';

function SearchBar({ onSearch }) {
  const [query, setQuery] = createSignal('');

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);  // Send value to parent
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search notes..."
      value={query()}
      onInput={handleInput}
      style={{
        padding: '0.5rem',
        marginBottom: '1rem',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
  );
}

export default SearchBar;
