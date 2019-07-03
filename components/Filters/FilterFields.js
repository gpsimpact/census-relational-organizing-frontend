import React from "react";
import { RemoveButton, AddButton } from "./Styles";
import { SelectField } from "../Util/Forms/SelectField"
import { Field, FieldArray } from "formik";
import { OperationField } from './OperationField';
import { ValueField } from './ValueField';

import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

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
                <div className={'row justify-content-center align-items-center'}>
              
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
  
                  <div className="col-md-2">
                      <AddButton onClick={() => subArrayHelpers.push({key:"", op:"", val:""})}>And <AddCircle/></AddButton>
                     
                      {
                        filterVals.length > 1
                        ?
                          <RemoveButton onClick={() => subArrayHelpers.remove(subidx)}><AddCircle/></RemoveButton>
                        :
                          <RemoveButton onClick={() => parentHelpers.remove(idx)}><RemoveCircle/></RemoveButton>
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