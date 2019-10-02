import React from 'react';
import { TextField,RadioButtonGroup,RadioButton, LinearButton, LinearButtonGroup, CheckBoxGroup, SingleCheckBox } from '.';
import { Field } from 'formik';
export class DynamicField extends React.Component {

    render(){
        const { fieldDef, formProps } = this.props;
        switch(fieldDef.type){
            case "text":
                return(
                    <Field 
                        id={fieldDef.name} 
                        name={fieldDef.name}
                        label={fieldDef.label}
                        placeholder={fieldDef.label}
                        component={TextField}
                    />

                );
            case "radio": 
                return (
                    <RadioButtonGroup
                        id={fieldDef.name}
                        label={fieldDef.label}
                        value={formProps.values[fieldDef.name]}
                        error={formProps.errors[fieldDef.name]}
                        touched={formProps.touched[fieldDef.name]}
                    >
                        {fieldDef.selectOptions && fieldDef.selectOptions.length > 0 
                            && fieldDef.selectOptions.map((radioOption, idx) => {
                                return(
                                    <Field
                                        key={idx}
                                        component={RadioButton}
                                        name={fieldDef.name}
                                        id={radioOption.value}
                                        label={radioOption.label}
                                  />
                                )
                            })
                        }

                    </RadioButtonGroup>
                )
            case "linear": 
                return (
                    <LinearButtonGroup
                        id={fieldDef.name}
                        label={fieldDef.label}
                        value={formProps.values[fieldDef.name]}
                        error={formProps.errors[fieldDef.name]}
                        touched={formProps.touched[fieldDef.name]}
                    >
                        {fieldDef.selectOptions && fieldDef.selectOptions.length > 0 
                            && fieldDef.selectOptions.map((radioOption, idx) => {
                                return(
                                    <Field
                                        width={`${(100 / fieldDef.selectOptions.length)}%`}
                                        key={idx}
                                        component={LinearButton}
                                        name={fieldDef.name}
                                        id={radioOption.value}
                                        label={radioOption.label}
                                  />
                                )
                            })
                        }

                    </LinearButtonGroup>
                )
            case "checkbox": 
                return (
                    <CheckBoxGroup
                        id={fieldDef.name}
                        label={fieldDef.label}
                        value={formProps.values[fieldDef.name]}
                        error={formProps.errors[fieldDef.name]}
                        touched={formProps.touched[fieldDef.name]}
                        onChange={formProps.setFieldValue}
                        onBlur={formProps.setFieldTouched}
                    >
                        {fieldDef.selectOptions && fieldDef.selectOptions.length > 0 
                            && fieldDef.selectOptions.map((radioOption, idx) => {
                                return(
                                    <Field
                                        width={`${(100 / fieldDef.selectOptions.length)}%`}
                                        key={idx}
                                        smallMarg
                                        component={SingleCheckBox}
                                        name={fieldDef.name}
                                        id={radioOption.value}
                                        label={radioOption.label}
                                  />
                                )
                            })
                        }

                    </CheckBoxGroup>
                )
            default:
                return null;
        }
    }
}