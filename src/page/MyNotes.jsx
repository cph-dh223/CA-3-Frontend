import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  readAllNotes,
  searchByTitle,
  sortByCategory,
  sortByDate,
  sortByTitle,
  deleteNote,
  updateNote,
} from "../services/noteService";
import { useNavigate } from "react-router-dom";

const Note = ({ note, handleDelete, handleUpdateNote }) => {
  const [noteContent, setNoteContent] = useState(note.content);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [category, setCategory] = useState(note.category);
  const [isEditing, setIsEditing] = useState(false);
  const [contentChanged, setContentChanged] = useState(false);

  const handleCategoryChange = () => {
    setContentChanged(true);
    setCategory((prevCategory) =>
      prevCategory === "NOTE" ? "REMINDER" : "NOTE"
    );
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    setContentChanged(true);
    if (event.target.id === "title") {
      setNoteTitle(event.target.value);
    } else {
      setNoteContent(event.target.value);
    }
  };

  const addColaboratroSubmit = async (e) => {
    e.preventDefault();
    const userEmails = await getUserEmails();
    const newColaborator = userEmails.find(
      (ue) => ue.email === collaboratorToAdd
    );
    console.log(newColaborator);
    if (newColaborator) {
      note.colaborators = [...note.colaborators, newColaborator.email];
      setCollaboratorToAdd("");
    } else {
      // TODO unhappy path
    }
  };

  return (
    <>
      <NoteWrapper>
        <i className="bx bx-x" onClick={() => handleDelete(note)}></i>
        {contentChanged ? (
          <i
            className="bx bx-check"
            onClick={() => {
              handleUpdateNote(note, noteContent, noteTitle, category);
              setContentChanged(false);
            }}
          ></i>
        ) : (
          <i className="bx bx-radio-circle"></i>
        )}
        <CategoryDiv $category={category} onClick={handleCategoryChange}>
          <p>{category}</p>
        </CategoryDiv>
        <StyledDate>{note.date}</StyledDate>
        <ContentWrapper>
          {isEditing ? (
            <StyledTitleEdit
              id="title"
              onBlur={toggleEditing}
              value={noteTitle}
              onChange={handleInputChange}
            />
          ) : (
            <StyledTitleDisplay onClick={toggleEditing}>
              {noteTitle}
            </StyledTitleDisplay>
          )}
          <hr></hr>
          <StyledTextArea
            id="content"
            value={noteContent}
            onChange={handleInputChange}
          />
        </ContentWrapper>
      </NoteWrapper>
      {/* {
        !isEditing ?

          <>
            {note.colaborators.map((c) => (
              
                <a key={c}>{c}</a>
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
      } */}
    </>
  );
};

function MyNotes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [query, setQuery] = useState("");

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "Category":
        sortNotesByCategory();
        break;
      case "Title":
        sortNotesByTitle();
        break;
      case "Date":
        sortNotesByDate();
        break;
      default:
        break;
    }
  };

  const handleDelete = async (note) => {
    await deleteNote(note);
    setNotes(notes.filter((n) => n.id !== note.id));
  };

  const handleUpdateNote = async (thisNote, content, title, category) => {
    const note = { ...thisNote, content, title, category };
    console.log(note);
    updateNote(note);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setNotes(notes.filter((note) => note.title.includes(query)));
  };

  const search = async () => {
    const allNotesFromSearch = await searchByTitle(query);
    setNotes(allNotesFromSearch);
  };


  const sortNotesByCategory = async () => {
    const allNotesSorted = [...notes].sort((n1, n2) => n1.category.localeCompare(n2.category));
    setNotes(allNotesSorted);
  };

  const sortNotesByTitle = async () => {
    const allNotesSorted = [...notes].sort((n1, n2) => n1.title.localeCompare(n2.title));
    setNotes(allNotesSorted);
  };

  const sortNotesByDate = async () => {
    const allNotesSorted = [...notes].sort((n1, n2) => n1.date.localeCompare(n2.date));
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
      <DivForSearchBarAndSortButtons>
        <SearchWrapper>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleQueryChange}
          ></SearchBar>
          <i className="bx bx-search" onClick={() => search}></i>
        </SearchWrapper>
        <SortSelectWrapper>
          <SortSelect onChange={handleSortChange}>
            <option value="" disabled>
              Sort by...
            </option>
            <option>Category</option>
            <option>Title</option>
            <option>Date</option>
          </SortSelect>
        </SortSelectWrapper>
      </DivForSearchBarAndSortButtons>
      <MyNotesBody>
        {notes.map((note) => (
          <NoteContainer key={note.id}>
            <Note
              note={note}
              handleDelete={handleDelete}
              handleUpdateNote={handleUpdateNote}
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
  width: 100%;
`;

const DivForSearchBarAndSortButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw;
  margin-bottom: 4vw;
  width: 100%;
`;

const SortSelectWrapper = styled.div`
  border: none;
  display: flex;
  justify-content: flex-end;
`;

const SortSelect = styled.select`
  margin: 0 38px 0 0;
  border: none;
  border-radius: 10px 10px 5px 5px;
  background-color: #fff;
  padding: 10px;
  max-width: 180px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  padding: 0.5vw;
  flex-grow: 0.1;
  //height: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 0 50px 0 20px;
  font-size: 16px;
`;

const SearchWrapper = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 45px;

  @media (max-width: 566px) {
    width: 250px;
  }
  @media (max-width: 464px) {
    left: 0;
    transform: translateX(0);
    margin: 25px;
  }

  i {
    position: absolute;
    font-size: 25px;
    left: 85%;
    transform: translateY(40%);
    &:hover {
      cursor: pointer;
    }
  }
`;

// MY NOTES GRID
const MyNotesBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-content: center;
  width: 90%;
  margin: 40px auto auto auto;
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
  width: 100%;
`;

//NOTE

//category
const CategoryDiv = styled.div`
  position: absolute;
  border: none;
  background-color: ${(props) =>
    props.$category === "REMINDER"
      ? "rgba(193, 21, 21, 0.5)"
      : "rgba(255, 217, 0, 0.5)"};
  color: black;
  text-align: center;
  font-size: 1em;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  margin: 10px;
  width: 100px;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledDate = styled.div`
  position: absolute;
  font-size: 11px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 10px 10px 0 0;
  padding: 5px 10px 5px 10px;
  color: black;
  margin: 10px;
  left: 72.2%;
  width: auto;
  user-select: none;
  transform: translateY(-192%);
`;

const StyledTitleDisplay = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* other styles */
  height: 50px;
  width: 55%;
  margin-left: 110px;
  resize: none;
  background: none;
  color: black;
  font-size: 2em;
  font-family: "Letter Gothic Std", monospace;
  vertical-align: top;
  outline: none;
  @media (max-width: 1412px) {
    width: 50%;
  }
  @media (max-width: 1242px) {
    width: 46%;
  }
`;

//title
const StyledTitleEdit = styled.textarea`
  height: 50px;
  width: 55%;
  margin-left: 110px;
  border: none;
  resize: none;
  overflow-x: auto; /* Allow horizontal scrolling */
  white-space: nowrap;
  resize: none;
  overflow: hidden;
  background: none;
  color: black;
  font-size: 2em;
  font-family: "Letter Gothic Std", monospace;
  vertical-align: top;
  outline: none;
  @media (max-width: 1412px) {
    width: 50%;
  }
  @media (max-width: 1242px) {
    width: 46%;
  }
`;

//note
const NoteWrapper = styled.div`
  .bx.bx-x {
    color: #840e0e7d;
    font-size: 2.5em;
    position: absolute;
    left: 90%;
    transform: translateY(-10%);
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      color: #840e0e;
    }
  }
  .bx.bx-check {
    color: #0080008e;
    font-size: 2.5em;
    position: absolute;
    left: 90%;
    transform: translateY(-15%);
    translate: -85%;
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      color: #008000;
    }
  }
  .bx.bx-radio-circle {
    color: #0080008e;
    font-size: 2.5em;
    position: absolute;
    left: 90%;
    transform: translateY(-15%);
    translate: -85%;
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      color: #008000;
    }
  }
`;

const ContentWrapper = styled.div`
  margin: 10px;
  height: 90%;
  width: 95%;
  overflow: hidden;
  border: none;
  hr {
    filter: opacity(10%);
    border: 1px solid black;
    border-radius: 10px;
  }
`;

const StyledTextArea = styled.textarea`
  margin-top: 0px;
  border: none;
  resize: none;
  height: 394.5px;

  width: 100%;
  overflow-x: auto;
  padding: 10px;
  border: none;
  background: none;
  color: black;
  font-size: 1em;
  font-family: "Letter Gothic Std", monospace;
  vertical-align: top;
  outline: none;
`;
