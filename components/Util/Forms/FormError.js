import styled from 'styled-components';


const ErrorStyles = styled('div')`
    padding: .75rem 1rem;
    background: white;
    margin: 2rem 0;
    border-left: 5px solid ${props => props.theme.colors.red};
    background-color: ${props => props.theme.colors.g1};
    p {
        margin: 0;
        font-weight: 100;
    }
`;

export const FormError = ({error}) => {
  return(
    <ErrorStyles>
    <h3>{error.code}</h3>
    <p>{error.message}</p>
  </ErrorStyles>
  )
}