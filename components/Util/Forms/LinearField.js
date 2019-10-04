import React from "react";
import { ErrorContainer, LinearGroupContainer, LinearButtonContainer, LinearButtonInner} from './Styles';


export const LinearButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
  }) => {

  
    return (
      <LinearGroupContainer>
        <fieldset>
          <legend>{label}</legend>
          {children}
          {touched && <ErrorContainer>{error}</ErrorContainer>}
        </fieldset>
      </LinearGroupContainer>
    );
  };
  
 export const LinearButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    const width = props.width ? props.width : "20%";
    return (
      <LinearButtonContainer width={width} checked={id===value ? 1 : 0}>
          <label htmlFor={`${name}-${id}`}>
        <LinearButtonInner checked={id===value ? 1 : 0}>

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
         <span className="linear-label">{label}</span>
          </LinearButtonInner>
         </label>
      </LinearButtonContainer>
    );
  };