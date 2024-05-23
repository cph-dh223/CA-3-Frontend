import React, { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 30px;
  margin: auto;
  font-family: Arial, sans-serif;
`;

const StyledH1 = styled.h1`
  text-align: center;
`;

export default function About() {
  const [text] = useState("");

  return (
    // <StyledDiv>
    <>
      <StyledH1>About Notes!</StyledH1>
      <p>Thanks for using the Notes game here are some tips on how to use it</p>
      <p>
        <strong>Features:</strong>
        <ul>
          <li>Create, edit and save your notes that only YOU can view</li>
          <li>
            Sort your notes into catagories for better and easier access/
            finding capabilities
          </li>
        </ul>
      </p>
    </>
    // </StyledDiv>
  );
}
