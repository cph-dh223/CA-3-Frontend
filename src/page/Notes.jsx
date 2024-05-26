import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 2rem;
  background-color: #000000;
  border-radius: 8px;
  border-style: none;
  color: #ffffff;
  padding: 15px 100px;
  margin: 20px;
  cursor: pointer;
`;



const CenteredDiv = styled.div`
  display: flex;
  padding: 100px;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row; 
  margin-top: 30px;
`;

const StyledImage = styled.img`
  width: 500px;
  height: auto;
  margin-bottom: 20px;
`;

function Notes() {

  const navigate = useNavigate();
  return (
    <>
    <CenteredDiv>
      <h1 style={{fontFamily:"raleway", fontSize: 80, letterSpacing: "20px", fontWeight:300}}>Organize Everyday</h1>
      <StyledImage/>
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