
import { createGlobalStyle, css } from 'styled-components';
import { Animations } from './Animations';
import { Grid } from './Grid';




export const theme = {
    fonts: {
        title: "'Roboto Condensed', sans-serif",
        body: "'Roboto', sans-serif"
    },
    colors: {
      g0: "#FAFAFA",
      g1: "#f6f6f6",
      g2: "#eaeaea",
      g3: "#D7DADB",
      green: "#00b894",
      blue: "#0984e3",
      red: "#d63031",
      black: "#2d3436",
      white: "#fff",
    }
};

export const GlobalStyle = css`
    body {
        font-family: ${theme.fonts.body};
        font-size: 18px;
        line-height: 1.65;
        background-color: ${theme.colors.g1};
    }
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -o-box-sizing: border-box;
        box-sizing: border-box;    
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
    }

    *:focus {
        outline: none;
    }
    a {
        color: ${theme.colors.blue};
        text-decoration: none;
        &:hover,
        &:focus,
        &:active {
            color: ${theme.colors.green};
            cursor: pointer;
        }
    }
    h1,h2,h3,h4,h5,h6 {
        margin: 0;
        font-family: ${theme.fonts.title};
    }
    label,
    button {
        font-family: ${theme.fonts.body};
        font-weight: 900;
    }
    fieldset {
            border: none;
            padding: 0;
  
        }
    .sr-only {
        border: 0;
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        word-wrap: normal !important;
    }
`;

export const AddGlobals = createGlobalStyle`
  ${Grid};
  ${GlobalStyle};
  ${Animations};
`;