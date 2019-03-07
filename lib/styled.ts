
import * as styledComponents from "styled-components";

interface ThemeInterface {
    fonts: {
        title: string,
        body: string
    }

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
          title: "'Staatliches', sans-serif",
          body: "'Lato', sans-serif"
      },

};

export { css, createGlobalStyle, keyframes, ThemeProvider, theme };
export default styled;

