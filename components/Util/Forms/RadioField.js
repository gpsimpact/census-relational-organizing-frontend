import React from "react";
import { ErrorContainer, RadioGroupContainer, RadioButtonContainer} from './Styles';


export const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
  }) => {

  
    return (
      <RadioGroupContainer>
        <fieldset>
          <legend>{label}</legend>
          {children}
          {touched && <ErrorContainer>{error}</ErrorContainer>}
        </fieldset>
      </RadioGroupContainer>
    );
  };
  
 export const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    return (
      <RadioButtonContainer>
        <input
          name={name}
          id={`${name}-${id}`}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        <label htmlFor={`${name}-${id}`}>{label}</label>
      </RadioButtonContainer>
    );
  };