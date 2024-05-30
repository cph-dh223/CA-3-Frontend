import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StyledBackButton } from "../styles/GlobalStyles";
import { createNote } from "../services/noteService";

function AddNote({ setAddNoteModalIsOpen, setNotes }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const note = { title, content, category };

    try {
      const addedNote = await createNote(note);

      setMessage("Note successfully saved");
      setNotes((prevNotes) => {
        return [...prevNotes, addedNote];
      });
      setTitle("");
      setContent("");
      setCategory("");
      setAddNoteModalIsOpen(false);
    } catch (error) {
      setMessage("Error" + error.message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <AddNoteHead>
          <StyleInput
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            required
          />
          <StyleSelect
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Choose a category</option>
            <option value="NOTE">Content</option>
            <option value="REMINDER">Reminder</option>
          </StyleSelect>
        </AddNoteHead>

        <StyleTextArea
          value={content}
          onChange={handleContentChange}
          required
        />

        <SubmitButton type="submit" value="Add Note" />
      </form>
      {message && <Message>{message}</Message>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: none;
`;

const SubmitButton = styled.input`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
  background-color: black; // Sort baggrund
  color: white; // Hvid tekst
  cursor: pointer;

  &:hover {
    background-color: #444; // Mørkere sort ved hover
  }
  @media (max-width: 380px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
  }
`;

const Label = styled.label`
  margin: 10px 0;
`;

const AddNoteHead = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  @media (max-width: 600px) {
    width: 300px;
  }
  @media (max-width: 380px) {
    width: 270px;
  }
`;

const StyleInput = styled.input`
  border-radius: 5px;
  padding: 10px;
  border: none;
  width: 100%;

`;

const StyleSelect = styled.select`
  border: none;
  background-color: #000000;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  color: #ffffff;
  border: solid 2px #000000;

`;

const StyleTextArea = styled.textarea`
  display: flex;

  padding: 10px;
  border: none;
  resize: none;
  overflow-x: auto; /* Allow horizontal scrolling */
  resize: none;
  overflow: hidden;
  background: #ffffff;
  margin: 10px;
  border-radius: 5px;
  width: 500px;
  height: 200px;
  @media (max-width: 600px) {
    width: 300px;
    height: 200px;
  }
  @media (max-width: 380px) {
    width: 250px;
    height: 200px;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => (props.error ? "red" : "green")};
`;

export default AddNote;
