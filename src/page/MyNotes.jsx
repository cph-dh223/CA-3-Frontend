import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { readAllNotes } from "../services/noteService";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
`;

const NoteDiv = styled.div`
border: solid red;
  flex-grow: 1;
`;

const EditButton = styled.button`
  align-self: flex-end;
  color: #060606;
`;

const ActualNote = styled.div`

  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: auto;
  background-color: ${() =>
    "#" + Math.floor(Math.random() * 16777215).toString(16)};
`;

const StyledMainNoteDiv = styled.div`
  border: solid black;
  border-width: thick;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  width: calc(25% - 10px);
`;

const StyledTitleDiv = styled.div`
    border: solid purple;
`


const Note = ({ note, title }) => {
  const [edit, setEdit] = useState(false);

  return (
    <StyledMainNoteDiv>
    <StyledTitleDiv>{title}</StyledTitleDiv>
      <ActualNote>
        <EditButton onClick={() => setEdit(!edit)}>
          {edit ? "Stop Editing" : "Edit Note"}
        </EditButton>
        <NoteDiv contentEditable={edit}>{note}</NoteDiv>
      </ActualNote>
    </StyledMainNoteDiv>
  );
};

function MyNotes() {
  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    const allNotes = await readAllNotes();
    console.log(allNotes);
    setNotes(allNotes);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <PageContainer>
      <Header>My Notes</Header>

      <StyledSearchBar></StyledSearchBar>
      <NoteContainer>
        {notes.map((note) => (
          <Note key={note.id} note={note.content} title={note.title} />
        ))}
      </NoteContainer>
    </PageContainer>
  );
}

export default MyNotes;
