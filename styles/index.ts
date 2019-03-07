import { createGlobalStyle } from "../lib/styled";
import { GlobalStyle } from './Style';
import { Animations } from './Animations';
import { Grid } from './Grid';
export const AddGlobals = createGlobalStyle`
  ${Grid};
  ${GlobalStyle};
  ${Animations};
`;