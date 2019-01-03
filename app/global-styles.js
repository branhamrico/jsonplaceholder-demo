import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  .is-active {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
