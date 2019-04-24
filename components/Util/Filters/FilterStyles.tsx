import styled from '../../../lib/styled';

export const AndBlock = styled('div')`
border: 3px solid ${props => props.theme.colors.black};
padding: 15px;
margin-bottom: 30px;

`;
export const ORButton = styled('button')`
  position: absolute;
  background-color: ${props => props.theme.colors.green};
  bottom: 15px;
  border: none;
  border-radius: 100px;
  padding: 5px 15px;
  color: ${props => props.theme.colors.white};
  :hover,
  :active,
  :focus {
    background-color: ${props => props.theme.colors.black};
    cursor: pointer;

  }
`;

export const RemoveButton = styled('span')`
display: inline-block;
  color: ${props => props.theme.colors.red};  
  cursor: pointer;
  margin: 10px 5px;
  font-size: 2rem;
`;

export const AddButton = styled('span')`
display: inline-block;

  color: ${props => props.theme.colors.green};  
  cursor: pointer;
  margin: 10px 5px;
  font-size: 2rem;

`;