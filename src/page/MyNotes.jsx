import React, { useState } from 'react';
import styled from 'styled-components';

const NoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px; // Tilføjer en lille plads mellem noterne
`;

const Note = styled.div`
  border: 1px solid #000000;
`;

function MyNotes() {
  const [notes, setNotes] = useState(['Note 1', 'Note 2', 'Note 3']);

  return (
    <NoteContainer>
      {notes.map((note, index) => (
        <Note key={index}>
          {note}
        </Note>
      ))}
    </NoteContainer>
  );
}

export default MyNotes;