import React from 'react';
import {Field} from 'formik';
import { CheckBoxLabel, CheckBoxInput, CheckBoxToggler} from './Styles';

export const CheckBoxArrayField = (props) => {
    return(
        <Field name={props.name}>
            {({field, form}) => (
                <CheckBoxLabel checked={field.value.includes(props.value)} htmlFor={props.id}>
                    <CheckBoxInput
                        type="checkbox"
                        {...props}
                        checked={field.value.includes(props.value)}
                        onChange={() => {
                            if(field.value.includes(props.value)){
                                const nextVal = field.value.filter(value=> value !== props.value);
                                form.setFieldValue(props.name, nextVal);
                            } else {
                                const nextVal = field.value.concat(props.value);
                                form.setFieldValue(props.name, nextVal);
                            }

                        }}
                    />
                    <CheckBoxToggler checked={field.value.includes(props.value)}><i className="checkem fas fa-check"></i></CheckBoxToggler>
                    <span>{props.label}</span>
                </CheckBoxLabel>
            )}

        </Field>
    )
}