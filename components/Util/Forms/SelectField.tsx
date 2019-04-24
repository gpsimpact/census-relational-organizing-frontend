import React from "react";
import { FieldProps } from "formik";
import { GroupContainer, Label, ErrorContainer, StyledSelectInput} from './FormStyles';

type AddSelectProps = {
    id: string;
    name: string;
    label: string;
    error?: any;
    options: any;
    placeholderOption?: string;
  }




export const SelectField = ({
    field,
    form: { errors, touched},
    ...props
}: FieldProps & AddSelectProps) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <GroupContainer>

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

        </GroupContainer>
    )
}