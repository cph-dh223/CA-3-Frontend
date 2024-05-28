import { createGlobalStyle, styled } from "styled-components";
import backgroundImage from "/src/img/peter-steiner-1973-hmFb-uu0xog-unsplash.jpg"; //CHANGE BACKGROUND IMAGE

const StyledBackButton = styled.button`
  background-color: #51555c;
  color: #ffffff;
  padding: 2px;
`;

const GlobalStyles = createGlobalStyle`

html, body {
  height: 100vh;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;

}

* {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "slnt" 0;
  margin: 0;
  padding: 0;
 
}

body {
  background: url(${backgroundImage}) no-repeat center center fixed; 
  background-size: cover;
}
`;

export default GlobalStyles;

export { StyledBackButton };
