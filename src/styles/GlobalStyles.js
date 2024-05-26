import { createGlobalStyle, styled } from "styled-components";


const StyledBackButton = styled.button`
  background-color: #51555c;
  color: #ffffff;
  padding: 2px;
`;


const GlobalStyles = createGlobalStyle`


*{
    font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "slnt" 0;
    margin: 0;
    padding: 0;
}


/* body{
    font-family: 'PT Sans', 'Times New Roman'
} */
`;

export default GlobalStyles;

export {StyledBackButton};