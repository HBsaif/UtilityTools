import React, { useState, useEffect } from 'react';

function Notes() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [note, setNote] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === '') return;
    setNotes([...notes, note]);
    setNote('');
  };

  const removeNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Notes</h5>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={note} onChange={(e) => setNote(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') addNote(); }} placeholder="Add a new note" />
          <button className="btn btn-custom" onClick={addNote}>Add Note</button>
        </div>
        <ul className="list-group">
          {notes.map((note, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {note}
              <button className="btn btn-danger btn-sm btn-custom" onClick={() => removeNote(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notes;