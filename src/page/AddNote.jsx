import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { StyledBackButton } from '../styles/GlobalStyles';
import { createNote } from '../services/noteService';

function AddNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Title: ', title);
    console.log('Note: ', note);
    console.log('Category: ', category);

    const notes = {title, note, category}

    try {
      const result = await createNote(notes);

      if (result.success){
        setMessage("Note successfully saved")
        setTitle("")
        setNote("")
        setCategory("")
      } else {
        setMessage("Failed to save note")
      }
    } catch (error) {
      setMessage("Error" + error.message)
    }
  };

  return (
    <Container>
    <StyledBackButton onClick={()=>(navigate("/notes"))}>
      Go back
    </StyledBackButton>
      <form onSubmit={handleSubmit}>
          <StyleInput 
          type="text" 
          value={title} 
          onChange={handleTitleChange} 
          placeholder="Title" 
          required
          />
          <StyleSelect value={category} onChange={handleCategoryChange} required>
            <option value="">Choose a category</option>
            <option value="Note">Note</option>
            <option value="Reminder">Reminder</option>
          </StyleSelect>
          Note:
          <StyleTextArea 
          value={note} 
          onChange={handleNoteChange} 
          placeholder="Write note here." 
          required
          />
        
          <SubmitButton type="submit" value="Add Note" />
      </form>
      {message && <message>{message}</message>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;


const SubmitButton = styled.input`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 50%;
  background-color: black; // Sort baggrund
  color: white; // Hvid tekst
  cursor: pointer;

  &:hover {
    background-color: #444; // Mørkere sort ved hover
  }
`;


const Label = styled.label`
  margin: 10px 0;
`;

const StyleInput = styled.input`
  margin-left: 10px;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 50%;
`;

const StyleSelect = styled.select`
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #070707;
  width: 40%;
`;

const StyleTextArea = styled.textarea`
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #080808;
  width: 100%;
  height: 200px;
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${props => (props.error ? 'red' : 'green')};
`;


export default AddNote;