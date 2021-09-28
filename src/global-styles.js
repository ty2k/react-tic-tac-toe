import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
  body {
    margin: 0;
  }
  html, body {
    height: 100%;
  }
`;

export default GlobalStyles;
