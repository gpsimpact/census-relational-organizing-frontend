import {css, theme} from '../lib/styled';

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
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
    }

    *:focus {
        outline: none;
    }

    h1,h2,h3,h4,h5,h6 {
        margin: 0;
        font-family: ${theme.fonts.title};
    }
    fieldset {
            border: none;
            padding: 0;
  
        }

`;