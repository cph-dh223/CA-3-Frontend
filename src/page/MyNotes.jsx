import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { readAllNotes, updateNote } from '../services/noteService';
import { Form, useNavigate } from 'react-router-dom';
import { StyledBackButton } from '../styles/GlobalStyles';
import { getUserEmails } from '../services/userServise';


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
  align-self: flex-end;
  color: #060606;
`;

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  width: calc(25% - 10px);
  box-sizing: border-box;
  min-height: 200px;
  padding: 10px;
  overflow: auto;
  background-color: ${() => '#' + Math.floor(Math.random() * 16777215).toString(16)};
`;


const Note = ({ note }) => {
  const [edit, setEdit] = useState(false);
  const [collaboratorToAdd, setCollaboratorToAdd] = useState('');

  const onEdit = () => {
    if (edit) {
      setEdit(false)
      updateNote(note)
    } else {
      // begin edit
      setEdit(true)
    }

  }

  const handleChange = (e) => {
    setCollaboratorToAdd(e.target.value)
  }

  const addColaboratroSubmit = async (e) => {
    e.preventDefault()
    const userEmails = await getUserEmails()
    const newColaborator = userEmails.find(ue => ue.email === collaboratorToAdd)
    console.log(newColaborator);
    if(newColaborator){
      note.colaborators = [...note.colaborators, newColaborator.email]
      setCollaboratorToAdd('')
    } else {
      // TODO unhappy path 
    }
  }

  return (
    <NoteWrapper >
      <EditButton onClick={onEdit}>
        {edit ? 'Stop Editing' : 'Edit Note'}
      </EditButton>
      <h2>{note.title}</h2>
      <hr />
      {
        !edit ?

          <>
            {note.colaborators.map((c) => (
              <>
                <a key={c}>{c}</a>
              </>
            ))}
          </>

          :
          <>
            <form onSubmit={addColaboratroSubmit}>
              <input
                type='text'
                onChange={handleChange}
              />
              <button type='submit'>add colaborator</button>
            </form>
          </>
      }


      <hr />
      <NoteDiv contentEditable={edit}>{note.content}</NoteDiv>
    </NoteWrapper>
  );
};


function MyNotes() {

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    const allNotes = await readAllNotes();
    console.log(allNotes);
    setNotes(allNotes);
  }

  useEffect(() => {
    fetchAllNotes();

  }, []);

  return (
    <PageContainer>

      <StyledBackButton onClick={() => (navigate("/notes"))}>
        Go back
      </StyledBackButton>
      <Header>My Notes</Header>
      <NoteContainer>

        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </NoteContainer>
    </PageContainer>
  );
}

export default MyNotes;