import React from "react";
import { FieldProps } from "formik";
import { InputContainer, Label, ErrorContainer, StyledSelectInput} from './Styles';




export const SelectField = ({
    field,
    form: { errors, touched},
    ...props
}) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <InputContainer>

            <Label htmlFor={props.name} id={`label-${props.id}`}>{props.label}</Label>

            <StyledSelectInput error={errorMessage} {...field} {...props}>
                {props.placeholderOption &&
                    <option defaultValue={null} value={null}> {props.placeholderOption} </option>
                }
                {
                    props.options.map((opt, i) => {
                        return(
                            <option key={i} value={opt.value}>{opt.label}</option>
                        )
                    })
                }
            </StyledSelectInput>
            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}

        </InputContainer>
    )
}