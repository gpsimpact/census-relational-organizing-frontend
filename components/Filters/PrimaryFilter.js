import React from "react";

import { AndBlock, ORButton, RemoveButton, AddButton } from "./Styles";
import { FilterFields } from "./FilterFields";
import styled from 'styled-components';


const AddFilterButton = styled('a')`
    position: relative;
    display: block;
    padding: 10px 30px;
    text-transform: uppercase;
    border: none;
    color: ${props => props.theme.colors.blue};
    font-weight: 700;
    margin-bottom: 1.25rem;
    width: 100%;
    text-align: center;
:hover,
:focus {
    color: ${props=>props.theme.colors.green};
    cursor: pointer;
}`;

export const PrimaryFilter = ({arrayHelpers, fieldVals, name, primaryFilters, errors}) => {
    if(fieldVals && fieldVals.OR && fieldVals.OR.length > 0) {
      return(
        <div className="row justify-content-center">
            { fieldVals.OR.map((mainClause,idx) => {
              return(
                <div className="col-md-12" key={`${name}.${idx}.AND`}>
                  <AndBlock >
                      <FilterFields errors={errors} fieldVals={fieldVals} idx={idx} name={`${name}.${idx}.AND`} primaryFilters={primaryFilters} parentHelpers={arrayHelpers}/>

                      <ORButton type="button" onClick={() => arrayHelpers.push(
                      {
                        "AND": 
                            [{key:"", op:"", val:""}]
                      }
                      )}> <span> OR <i className="fas fa-plus-circle"></i></span></ORButton>

                  </AndBlock>
      
                 </div>
              )
            })}
       </div>
      )
    }

    return(
      <div className="row justify-content-center">
      <div className="col-md-4">
      <AddFilterButton onClick={() => arrayHelpers.push(
          {
            "AND": 
                [{key:"", op:"", val:""}]
          }
          )}>
          <i className="fas fa-plus-circle"></i> Add Filter
      </AddFilterButton>
      </div>
      </div>
    )
}