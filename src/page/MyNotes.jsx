import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {
  readAllNotes,
  searchByTitle,
  sortByCategory,
  sortByDate,
  sortByTitle,
} from "../services/noteService";
import { useNavigate } from 'react-router-dom';
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

const NoteWrapper = styled.div`
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
`;

const DivForSearchBarAndSortButtons = styled.div`
  padding: 1vw;
  border: solid green;
  display: flex;
  width: 60vw;
  margin-bottom: 4vw;
`;

const FrameDiv = styled.div`
  border: solid orange;
  padding: 0.5vw;

  display: flex;
  flex: 1;
  //height: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
`;

const SortButton = styled.button`
  flex: 1;
`;

const SortByHeadline = styled.div`
  flex: 0.5;
`;

const GoButton = styled.button`


`


const Note = ({ note, title, category, date }) => {


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

    <StyledMainNoteDiv>
      <StyledTitleDiv>
        Title: {title} - Category: {category} - Date: {date}

      </StyledTitleDiv>
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
    </StyledMainNoteDiv>
  );
};

function MyNotes() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };


  const search = async () => {
    const allNotesFromSearch = await searchByTitle(query);
    setNotes(allNotesFromSearch);

  }

  const sortNotesByCategory = async () => {
    const allNotesSorted = await sortByCategory();
    console.log(allNotesSorted);
    setNotes(allNotesSorted);
  };

  const sortNotesByTitle = async () => {
    const allNotesSorted = await sortByTitle();
    console.log(allNotesSorted);
    setNotes(allNotesSorted);
  };

  const sortNotesByDate = async () => {
    const allNotesSorted = await sortByDate();
    console.log(allNotesSorted);
    setNotes(allNotesSorted);
  };

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

      <StyledBackButton onClick={() => (navigate("/notes"))}>
        Go back
      </StyledBackButton>
      <Header>My Notes</Header>

      <DivForSearchBarAndSortButtons>
        <FrameDiv></FrameDiv>

        <FrameDiv>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleQueryChange}
          ></SearchBar>
          <GoButton onClick={search}>Go!</GoButton>
        </FrameDiv>

        <FrameDiv>
          <SortByHeadline>Sort by: </SortByHeadline>
          <SortButton onClick={sortNotesByCategory}>Category</SortButton>
          <SortButton onClick={sortNotesByTitle}>Title</SortButton>
          <SortButton onClick={sortNotesByDate}>Date</SortButton>
        </FrameDiv>
      </DivForSearchBarAndSortButtons>

      <NoteContainer>
        {notes.map((note) => (

          <Note
            key={note.id}
            note={note.content}
            title={note.title}
            category={note.category}
            date ={note.date}
          />

        ))}
      </NoteContainer>
    </PageContainer>
  );
}

export default MyNotes;
