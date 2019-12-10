import { InputContainer, Label, TextInput, ErrorContainer, PhoneInput } from './Styles';


const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

export const PhoneField = ({field, form: {touched, errors}, ...props}) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <InputContainer hidden={props.hidden}>
            {props.label && <Label htmlFor={props.name} id={`label-${props.name}`}>{props.label} </Label>}
            <PhoneInput {...field} mask={phoneNumberMask} {...props} error={errorMessage}/>
            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}

        </InputContainer>
    )
}