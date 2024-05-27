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

const PageContainer = styled.div`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

const Header = styled.h1`
  /* margin-bottom: 20px; */
`;

const NoteContainer = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  width: 100%; */
  background-color: rgba(255, 255, 255, 0.2);

  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  height: 500px;
  transition: ease-in-out .1s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const NoteDiv = styled.div`
width: 100%;
height: 90%;
 border: solid red;

`;

const EditButton = styled.button`
  /* align-self: flex-end;
  color: #060606; */
`;

const StyledTitleDiv = styled.div`
  /* border: solid purple; */
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

const Note = ({ note, title, category }) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <StyledTitleDiv>
        {title} - Category: {category}
      </StyledTitleDiv>
        <EditButton onClick={() => setEdit(!edit)}>
          {edit ? "Stop Editing" : "Edit Note"}
        </EditButton>
        <NoteDiv contentEditable={edit}>{note}</NoteDiv>
      
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
      <StyledBackButton onClick={() => navigate("/notes")}>
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
      <MyNotesBody>
        {notes.map((note) => (
          <NoteContainer>
            <Note
              key={note.id}
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

const MyNotesBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
`;