import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Notes() {

  const navigate = useNavigate();
  return (
    <>
    <Wrapper>
      <StyledMotto >Organize Everyday</StyledMotto>
      <StyledImage/>
      <ButtonContainer>
        <StyledButton onClick={()=>(navigate("/myNotes"))}>
          My Notes
        </StyledButton>
        <StyledButton onClick={()=>(navigate("/addNote"))}>
          Add Notes
        </StyledButton>
      </ButtonContainer>
    </Wrapper>
    </>
  );
}

const StyledMotto = styled.h1`
  text-align: center  ;

  font-family: "raleway";
  font-size: 80px;
  letter-spacing: 20px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 50px;
    letter-spacing: 10px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  font-size: 2rem;
  background-color: #000000;
  border-radius: 30px;
  border-style: none;
  color: #ffffff;
  padding: 15px 100px;
  margin: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px;
  flex-direction: column;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding : 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row; 
  margin-top: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledImage = styled.img`
  width: 500px;
  height: auto;
  margin-bottom: 20px;
`;

export default Notes;