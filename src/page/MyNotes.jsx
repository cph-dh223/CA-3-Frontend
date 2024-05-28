import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  readAllNotes,
  searchByTitle,
  sortByCategory,
  sortByDate,
  sortByTitle,
} from "../services/noteService";
import { useNavigate } from "react-router-dom";
import { StyledBackButton } from "../styles/GlobalStyles";
import noteBackgroundImage from "/src/img/notepad.jpg";

const Note = ({ note, title, category }) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <NoteWrapper>
        <TitleDiv>
          {title} - Category: {category}
        </TitleDiv>
        
        <button onClick={() => setEdit(!edit)}>
          {edit ? "Stop Editing" : "Edit Note"}
        </button>
        <NoteContent contentEditable={edit}>{note}</NoteContent>
      </NoteWrapper>
    </>
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
  };

  const sortNotesByCategory = async () => {
    const allNotesSorted = await sortByCategory();
    setNotes(allNotesSorted);
  };

  const sortNotesByTitle = async () => {
    const allNotesSorted = await sortByTitle();
    setNotes(allNotesSorted);
  };

  const sortNotesByDate = async () => {
    const allNotesSorted = await sortByDate();
    setNotes(allNotesSorted);
  };

  const fetchAllNotes = async () => {
    const allNotes = await readAllNotes();
    setNotes(allNotes);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <PageContainer>
      <StyledBackButton onClick={() => navigate("/")}>Go back</StyledBackButton>
      <h1>My Notes</h1>

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
      <MyNotesBody>
        {notes.map((note) => (
          <NoteContainer key={note.id}>
            <Note
              note={note.content}
              title={note.title}
              category={note.category}
            />
          </NoteContainer>
        ))}
      </MyNotesBody>
    </PageContainer>
  );
}

export default MyNotes;

//-------------------- STYLES --------------------//
// PAGE CONTENT
const PageContainer = styled.div`
  * {
    margin: 0;
    box-sizing: border-box;
  }
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
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;


// MY NOTES GRID
const MyNotesBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
`;

// NOTE CONTAINERCARD
const NoteContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  height: 500px;
  transition: ease-in-out 0.1s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

//NOTE
//title
const TitleDiv = styled.div`
  border: 1px solid red;
  height: 8.5%;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//note
const NoteWrapper = styled.div`
  border: 1px solid black;
  margin: 10px;
  height: 95%;
  width: 95%;
`;

//content
const NoteContent = styled.div`
  width: 100%;
  height: 91.5%;
  border: 1px solid yellow;
`;


