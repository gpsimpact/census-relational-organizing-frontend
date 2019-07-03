import styled from 'styled-components';

export const AndBlock = styled('div')`
border: 1px solid ${props => props.theme.colors.tertiary};
padding: 15px;
margin-bottom: 30px;

`;
export const ORButton = styled('button')`
  position: absolute;
  background-color: ${props => props.theme.colors.primary};
  bottom: 15px;
  border: none;
  border-radius: 100px;
  padding: 5px 15px;
  color: ${props => props.theme.colors.white};
  :hover,
  :active,
  :focus {
    background-color: ${props => props.theme.colors.tertiary};
    cursor: pointer;

  }
`;

export const RemoveButton = styled('span')`
display: inline-block;
  color: ${props => props.theme.colors.secondary};  
  cursor: pointer;
  margin: 10px 5px;
  font-size: 1.2rem;
  margin-left: 20px;
`;

export const AddButton = styled('span')`
display: inline-block;
  text-transform: uppercase;
  color: ${props => props.theme.colors.primary};  
  cursor: pointer;
  margin: 10px 5px;
  font-weight: bold;
      font-size: 1.2rem;


`;

export const QueryButton = styled('button')`
    -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 30px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.primary};
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1rem;
    margin-top: 25px;
    width: 100%;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.secondary};
        color: ${props => props.theme.colors.white};
        border: 1px solid ${props => props.theme.colors.secondary};
        cursor: pointer;
    }
`;
