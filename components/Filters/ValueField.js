import React from "react";
import { SelectField } from "../Util/Forms/SelectField";
import { TextField } from "../Util/Forms/TextField";
import _ from "lodash";
import { Field } from "formik";

export const ValueField = ({idx, subidx, name, fieldVals, primaryFilters}) => {
    let compareValue = fieldVals.OR[idx].AND[subidx].key;
    let compareType = _.find(primaryFilters, { value: compareValue});
    if(compareValue && compareType && compareType.type) {
        switch(compareType.type){
            case "StringWhere":
                return(
                    <Field 
                          id={`${name}-${subidx}-val`} 
                          label="Value"
                          name={`${name}.${subidx}.val`}
                          placeholder="Value"
                          component={TextField}
                        /> 
                )
                break;
            case "BooleanWhere":
                return(
                    <Field 
                        id={`${name}-${subidx}-val`} 
                        label={"Value"} 
                        name={`${name}.${subidx}.val`}
                        placeholderOption="-- Select --"
                        options={[{value: true, label: "True"}, {value: false, label: "False"}]}
                        component={SelectField}
                    />
                )
                break;
            default:
            break;
        }
    }
    return null;
}
