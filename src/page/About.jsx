import React, { useState } from "react";
import styled from "styled-components";

export default function About() {
  const [text] = useState("");

  return (
    <StyledDiv>
      <StyledH1>About Notes!</StyledH1>
      <StyledIntro>
        Welcome to Notes, here you can create a collective of your thoughts in
        the form of long and short form notes in an easy and secure way!
      </StyledIntro>
      <StyledUses>
        <StyledTitle>Features:</StyledTitle>
        <StyledList>
          <StyledListItems>Create and edit your notes</StyledListItems>
          <StyledListItems>Sort your notes into catagories</StyledListItems>
          <StyledListItems>
            Easy access and search for notes you want to find
          </StyledListItems>
          <StyledListItems>
            Have access to your notes from any device
          </StyledListItems>
        </StyledList>
      </StyledUses>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  max-width: 500px;
  margin: auto;
  margin-top: 10px;
  backdrop-filter: blur(100px);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const StyledH1 = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

const StyledIntro = styled.p`
  color: #666;
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
`;

const StyledUses = styled.div`
  margin-top: 30px;
`;

const StyledTitle = styled.h2`
  color: #e99139;
  margin-bottom: 15px;
`;

const StyledList = styled.ul`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
`;

const StyledListItems = styled.li`
  margin-bottom: 10px;
`;
