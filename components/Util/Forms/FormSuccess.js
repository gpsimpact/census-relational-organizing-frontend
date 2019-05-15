import styled from 'styled-components';


const SuccessStyles = styled('div')`
    padding: .5rem .75rem;
    background: white;
    margin: 2rem 0;
    border-left: 5px solid ${props => props.theme.colors.green};
    background-color: ${props => props.theme.colors.g1};
    p {
    margin: 0;
    font-weight: 100;
    }
`;

export const FormSuccess = ({message}) => {
  return(
    <SuccessStyles>
    <h3>{message.code}</h3>
    <p>{message.message}</p>
  </SuccessStyles>
  )
}