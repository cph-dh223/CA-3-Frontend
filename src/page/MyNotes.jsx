import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { readAllNotes, updateNote } from '../services/noteService';
import { useNavigate } from 'react-router-dom';
import { StyledBackButton } from '../styles/GlobalStyles';


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
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

const NoteDiv = styled.div`
  flex-grow: 1;
`;

const EditButton = styled.button`
  align-self: flex-start;
  background-color: ${({ index }) => (index % 2 === 0 ? 'blue' : 'green')};
  color: white;
`;

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  width: ${({ edit }) => (edit ? '100%' : 'calc(25% - 10px)')};
  box-sizing: border-box;
  min-height: 200px;
  padding: 10px;
  overflow: auto;
  background-color: ${() => '#' + Math.floor(Math.random()*16777215).toString(16)};
`;


const Note = ({note}) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(note.content);

  const handleBlur = async () => {
    await updateNote(note.id, content);
    setEdit(false);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <NoteWrapper edit={edit}>
      <EditButton onClick={() => setEdit(!edit)}>
        {edit ? 'Stop Editing' : 'Edit Note'}
      </EditButton>
      {edit ? (
        <textarea onBlur={handleBlur} onChange={handleChange} value={content} />
      ) : (
        <NoteDiv>{content}</NoteDiv>
      )}
    </NoteWrapper>
  );
};

function MyNotes() {

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await readAllNotes();
      setNotes(fetchedNotes);
    };

    fetchNotes();
  }, []);

  return (
    <PageContainer>

     <StyledBackButton onClick={()=>(navigate("/notes"))}>
      Go back
    </StyledBackButton>
      <Header>My Notes</Header>
      <NoteContainer>
        {notes.map((note, index) => (
          <Note key={index} note={note} index={index} />
        ))}
      </NoteContainer>
    </PageContainer>
  );
}

export default MyNotes;