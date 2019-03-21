import styled from '../../../lib/styled';


const SuccessStyles = styled('div')<{code?: string}>`
padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
background: white;
margin: 2rem 0;
border-left: 5px solid ${props => props.theme.colors.green};
background-color: ${props => props.theme.colors.g1};
p {
  margin: 0;
  font-weight: 100;
}

`;

interface FormSuccessProps {
  message: {
    code: string;
    message: string;
  }
}
export const FormSuccess = ({message}:FormSuccessProps) => {
  return(
    <SuccessStyles>
    <h3>{message.code}</h3>
    <p>{message.message}</p>
  </SuccessStyles>
  )
}