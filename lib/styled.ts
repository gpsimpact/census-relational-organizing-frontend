
import * as styledComponents from "styled-components";

interface ThemeInterface {
    fonts: {
        title: string,
        body: string
    },
    colors: {
      g1: string,
      g2: string,
      g3: string,
      green: string,
      blue: string,
      red: string,
      black: string,
      white: string,
    },
    fontSize: Array<string>,
    fontWeight: Array<number>,
    spacing: Array<string>,


  }

  
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>;

const theme = {
      fonts: {
          title: "'Roboto Condensed', sans-serif",
          body: "'Roboto', sans-serif"
      },
      colors: {
        g1: "#f6f6f6",
        g2: "#eaeaea",
        g3: "#D7DADB",
        green: "#00b894",
        blue: "#0984e3",
        red: "#d63031",
        black: "#2d3436",
        white: "#fff",
      },
      fontSize: [
        '.7rem',
        '.75rem',
        '1rem',
        '1.25rem',
        '1.5rem',
        '2.25rem',
        '3rem',
        '5rem',
        '6rem',
      ],
      fontWeight: [300, 400, 900],
      spacing: ['0', '.25rem', '.5rem', '1rem', '2rem', '4rem', '8rem', '16rem'],

};

export { css, createGlobalStyle, keyframes, ThemeProvider, theme };
export default styled;

