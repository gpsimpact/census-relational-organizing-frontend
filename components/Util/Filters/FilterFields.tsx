import React from "react";
import { RemoveButton, AddButton } from "./FilterStyles";
import { SelectField } from "../Forms/SelectField"
import { Field, FieldArray } from "formik";
import { OperationField } from './OperationField';
import { ValueField } from './ValueField';

export const FilterFields = ({ fieldVals, idx, name, primaryFilters, parentHelpers}) => {
    const filterVals = fieldVals.OR[idx].AND;
    if(filterVals && filterVals.length > 0){
      return(
        filterVals.map((subClause, subidx) => {
          return(
            <FieldArray 
              key={subidx}
              name={name}
              render={subArrayHelpers=>(
                <div className="row align-items-center">
              
                      <div className="col-md-3">
                      <Field 
                          id={`${name}-${subidx}-key`} 
                          label={"Key"} 
                          name={`${name}.${subidx}.key`}
                          options={primaryFilters}
                          placeholderOption="-- Select --"
                          component={SelectField}
                      />
                    </div>
                    <div className="col-md-3">
                        <OperationField 
                            subidx={subidx} 
                            name={name} 
                            fieldVals={fieldVals} 
                            idx={idx} 
                            primaryFilters={primaryFilters}
                        />
                    </div>
                    <div className="col-md-4">
                        <ValueField 
                                subidx={subidx} 
                                name={name} 
                                fieldVals={fieldVals} 
                                idx={idx} 
                                primaryFilters={primaryFilters}
                            />
            
                    </div>
  
                  <div className="col-md-2 justify-content-end">
                      <AddButton onClick={() => subArrayHelpers.push({key:"", op:"", val:""})}>And <i className="fas fa-plus-circle"></i></AddButton>
                     
                      {
                        filterVals.length > 1
                        ?
                          <RemoveButton onClick={() => subArrayHelpers.remove(subidx)}><i className="fas fa-minus-circle"></i></RemoveButton>
                        :
                          <RemoveButton onClick={() => parentHelpers.remove(idx)}><i className="fas fa-minus-circle"></i></RemoveButton>
                      }
                    
                      
  
                      </div>
                  
                </div>
              )}/>
          )
        })
      )
    }
    return(
        null
      )
  } 