import styled from 'styled-components';
import { InputContainer, Label, ErrorContainer } from './Styles';


const TextArea = styled('textarea')`
    display: block;
    width: 100%;
    padding: .5rem;
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

export const TextAreaField = ({field, form: {touched, errors}, ...props}) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <InputContainer>
            {props.label && <Label htmlFor={props.name} id={`label-${props.name}`}>{props.label} </Label>}
            <TextArea error={errorMessage} {...field} {...props} />
            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}

        </InputContainer>
    )
}