import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html, body, #root {
    height: 100%;
  }

  :root {
    --white: white;
    --lightGrean: #41f337;
    --grey: grey;
    --medGrey: #353535;
    --whiteGrey: #e5e5e5;
    --darkGrey: #1c1c1c;
    --darkBlue: #36a8ec;

    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;

    --box-shadow-standart: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  * {
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--white);
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      color: var(--white);
    }
  }
`