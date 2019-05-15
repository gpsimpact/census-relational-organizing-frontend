import React from "react";
import { FieldArray } from "formik";
import  { PrimaryFilter } from './PrimaryFilter';


export const TopLevelOR = ({primaryFilters, values, errors}) => {
    return(
        <div className="row">
            <div className="col-md-12">
            <FieldArray 
                name="OR"
                render={arrayHelpers => (
                <PrimaryFilter
                        arrayHelpers={arrayHelpers} 
                        fieldVals={values} 
                        name="OR"
                        errors={errors} 
                        primaryFilters={primaryFilters}
                    />
                )}
            />
            </div>
        </div>
    )
}