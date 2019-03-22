import { FieldProps } from "formik";
import styled from '../../../lib/styled';



type AddInputProps = {
  id: string;
  name: string;
  label: string;
  error?: any;

}

const GroupContainer = styled('div')`
    display: block;
    width: 100%;
    padding-bottom: ${props => props.theme.spacing[2]};
    margin-bottom: ${props => props.theme.spacing[3]};
`;
const Label = styled('label')`
    display: block;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSize[1]};
    font-weight: ${props => props.theme.fontWeight[2]};
    padding-left: ${props => props.theme.spacing[2]};
`;


const TextArea = styled('textarea')<{error?: any}>`
    display: block;
    width: 100%;
    padding: ${props => props.theme.spacing[2]};
    border: none;
    border-left: 3px solid ${props => props.theme.colors.g1};
    border-bottom: 2px solid ${props => props.theme.colors.g3};
    background: ${props => props.theme.colors.g1};
    :focus {
        background: ${props => props.theme.colors.g2};
        border-left: 3px solid ${props => props.theme.colors.g3};
        border-bottom: 2px solid ${props => props.theme.colors.g3};

    }
    ${({ error, theme }) => error && `
            border-left: 3px solid ${theme.colors.red};
            border-bottom: 2px solid ${theme.colors.red};
    `}
`;

const ErrorContainer = styled('div')`
    display: block;
    position: absolute;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSize[0]};
    font-weight: ${props => props.theme.fontWeight[2]};
    padding-left: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.red};
`;
export const TextAreaField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & AddInputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <GroupContainer>
              <Label htmlFor={props.name} id={`label-${props.id}`}> {props.label} </Label>

      <TextArea error={errorMessage} {...field} {...props} />
      {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
    </GroupContainer>
  );
};