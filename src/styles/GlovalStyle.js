import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f6f7f9;
    color: #111;
  }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; }
  input, textarea, select { font: inherit; }
`;

export default GlobalStyle;