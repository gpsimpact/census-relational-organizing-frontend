import React from 'react';
import { TextField,RadioButtonGroup,RadioButton, LinearButton, LinearButtonGroup, CheckBoxGroup, SingleCheckBox, DynamicCheckboxGroup } from '.';
import { Field, FieldArray } from 'formik';
import { CheckBoxGroupContainer, DynamicCheckboxLabel } from './Styles';
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
                    <FieldArray 
                        name={fieldDef.name}
                        render={arrayHelpers => {
                            return(
                            <CheckBoxGroupContainer>
                                <fieldset>
                                    <legend>{fieldDef.label}</legend>
                                 {fieldDef.selectOptions && fieldDef.selectOptions.length > 0 
                                    && fieldDef.selectOptions.map((option, idx) => {
                                        
                                        return(
                                  
                                            <DynamicCheckboxLabel key={idx}>
                                                <input
                                                    name={fieldDef.name}
                                                    type="checkbox"
                                                    checked={formProps.values[fieldDef.name].includes(option.value)}
                                                    onChange={e=> {
                                                        if(e.target.checked){
                                                            arrayHelpers.push(option.value)
                                                        } else {
                                                            const idx = formProps.values[fieldDef.name].indexOf(option.value);
                                                            arrayHelpers.remove(idx);
                                                        }
                                                    }}
                                                    />
                                                <span>{option.label}</span>

                                            </DynamicCheckboxLabel>

                                        )
                                        })}
                                        </fieldset>
                            </CheckBoxGroupContainer>
                            )}} />
               
                )
            default:
                return null;
        }
    }
}

     // <DynamicCheckboxGroup
                    //     id={fieldDef.name}
                    //     label={fieldDef.label}
                    //     value={formProps.values[fieldDef.name]}
                    //     error={formProps.errors[fieldDef.name]}
                    //     touched={formProps.touched[fieldDef.name]}
                    //     onChange={formProps.setFieldValue}
                    //     onBlur={formProps.setFieldTouched}
                    // >
                    //     {fieldDef.selectOptions && fieldDef.selectOptions.length > 0 
                    //         && fieldDef.selectOptions.map((option, idx) => {
                    //             console.log(option)
                    //             return(
                    //                 <Field
                    //                     key={idx}
                    //                     smallMarg
                    //                     component={SingleCheckBox}
                    //                     name={fieldDef.name}
                    //                     id={option.value}
                    //                     label={option.label}
                    //               />
                    //             )
                    //         })
                    //     }

                    // </DynamicCheckboxGroup>