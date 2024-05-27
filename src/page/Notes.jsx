import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 15px 100px;
  margin: 20px;
  cursor: pointer;
`;



const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row; 
`;

const StyledImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
`;

function Notes() {

  const navigate = useNavigate();
  return (
    <>
    <CenteredDiv>

      <StyledImage src="https://us.123rf.com/450wm/tartila/tartila1901/tartila190100004/126480881-note-di-carta-adesivo-per-appunti-vista-dall-alto-o-carta-adesiva-per-appunti-carta-da-lettere.jpg?ver=6" alt="Note" />
      <ButtonContainer>
        <StyledButton onClick={()=>(navigate("/myNotes"))}>
          My Notes
        </StyledButton>
        <StyledButton onClick={()=>(navigate("/addNote"))}>
          Add Notes
        </StyledButton>
      </ButtonContainer>
    </CenteredDiv>
    </>
  );
}

export default Notes;