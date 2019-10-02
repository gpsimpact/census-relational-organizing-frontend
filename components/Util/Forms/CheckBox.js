
import React from "react";
import { CheckBoxWrapper, CheckBoxLabel, CheckBoxInput, CheckBoxToggler, ErrorContainer, CheckBoxGroupContainer} from './Styles';


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

  export const SingleCheckBox = ({
    field: { name, value, onChange, onBlur },
    form: { errors, touched, setFieldValue },
    id,
    label,
    ...props
  }) => {
    return (
      <CheckBoxWrapper>
              <CheckBoxLabel smallMarg={props.smallMarg ? 1 : 0} htmlFor={id} checked={value} inline={props.inline ? props.inline : false}>

        <input
          name={name}
          id={id}
          type="checkbox"
          value={value}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
        />
                <CheckBoxToggler checked={value}><i className="checkem fas fa-check"></i></CheckBoxToggler>

        <span>{label}</span>
        </CheckBoxLabel>

        {touched && <ErrorContainer>{ errors[name]}</ErrorContainer>}
      </CheckBoxWrapper>
    );
  };


  export class CheckBoxGroup extends React.Component {
    constructor(props) {
      super(props);
    }
  
    handleChange = event => {
      const target = event.currentTarget;
      let valueArray = [...this.props.value] || [];
  
      if (target.checked) {
        valueArray.push(target.id);
      } else {
        valueArray.splice(valueArray.indexOf(target.id), 1);
      }
  
      this.props.onChange(this.props.id, valueArray);
    };
  
    handleBlur = () => {
      // take care of touched
      this.props.onBlur(this.props.id, true);
    };
  
    render() {
      const { value, error, touched, label, children } = this.props;
  
  
  
      return (
        <CheckBoxGroupContainer>
          <fieldset>
            <legend>{label}</legend>
            {React.Children.map(children, child => {
              return React.cloneElement(child, {
                field: {
                  value: value.includes(child.props.id),
                  onChange: this.handleChange,
                  onBlur: this.handleBlur
                }
              });
            })}
          {touched && <ErrorContainer>{error}</ErrorContainer>}
          </fieldset>
        </CheckBoxGroupContainer>
      );
    }
  }


