import styled from '../../../lib/styled';


const ErrorStyles = styled.div`
padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
background: white;
margin: 2rem 0;
border-left: 5px solid red;
background-color: ${props => props.theme.colors.g1};
p {
  margin: 0;
  font-weight: 100;
}
`;

interface FormErrorProps {
  error: {
    code: string;
    message: string;
  }
}
export const FormError = ({error}:FormErrorProps) => {
  return(
    <ErrorStyles>
    <h3>{error.code}</h3>
    <p>{error.message}</p>
  </ErrorStyles>
  )
}