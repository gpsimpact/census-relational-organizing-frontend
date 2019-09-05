import styled from 'styled-components';
import { darken } from 'polished';



const Button = styled('button')`
    position: relative;
    padding: 10px 30px;
    min-height: 40px;
    text-transform: uppercase;
    border: none;
    font-weight: 700;
    ${({full}) => full && `width: 100%;`};
    ${({small}) => small && `font-size: .8rem;`}; 
    span {
        display: inline-block;
        height: 15px;
        width: 15px;
        position: relative;
        margin-right: 5px;
        margin-left: -15px;
        cursor: pointer;

        svg {
            position: absolute;
            height: 100%;
      
        }
    }
`;


export const PrimaryButton = styled(Button)`
    background-color: ${props=>props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props => darken(0.1, props.theme.colors.primary)};

    }
`;

export const SecondaryButton = styled(Button)`
    background-color: ${props=>props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props => darken(0.1, props.theme.colors.secondary)};
    }

`;

export const TertiaryButton = styled(Button)`
    background-color: ${props=>props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props => darken(0.1, props.theme.colors.tertiary)};
    }

`;

export const IconButton = styled("div")`
   position: relative;
   display: inline-block;
   margin: 0px 15px 0px 0px;
   cursor: pointer;
   border-radius: 100px;
   width: 50px;
   text-align: center;
   height: 50px;
   padding: 10px 10px;
   font-size: 1rem;
   svg {
       position: relative;
       /* margin-top: -3px; */
       
   }
   span {
       display: block;
       margin-top: 3px;
   }
  
`;

export const PrimaryIconButton = styled(IconButton)`
   background-color: ${props=>props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        /* background-color: ${darken(0.2, props=>props.theme.colors.primary)}; */
        background-color: ${props => darken(0.1, props.theme.colors.primary)};


    }
`

export const SecondaryIconButton = styled(IconButton)`
    background-color: ${props=>props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props => darken(0.1, props.theme.colors.secondary)};
    }
`;

export const TertiaryIconButton = styled(IconButton)`
        background-color: ${props=>props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props => darken(0.1, props.theme.colors.tertiary)};
    }
`;