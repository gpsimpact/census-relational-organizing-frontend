
import React from "react";
import { CheckBoxWrapper, CheckBoxLabel, CheckBoxInput, CheckBoxToggler} from './Styles';


export const CheckBox = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
    <CheckBoxWrapper>
      
      <CheckBoxLabel htmlFor={props.id} checked={field.value} inline={props.inline ? props.inline : false}>
      <input id={props.id} type="checkbox" {...field} {...props} checked={field.value}/>
        <CheckBoxToggler checked={field.value}><i className="checkem fas fa-check"></i></CheckBoxToggler>
        <span>{props.label}</span>
      </CheckBoxLabel>
    </CheckBoxWrapper>
  );


