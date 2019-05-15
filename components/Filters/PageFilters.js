import React from "react";
import { SelectField } from "../Util/Forms"
import { TextField } from "../Util/Forms"
import { QueryButton } from './Styles';
import { Field } from 'formik';

export const PageFilters = ({sortFilters}) => {
    return(
        <div className="row">
   
        <div className="col-md-3">
      <Field
        id="sortBy"
        name="sortBy"
        label="Sort By"
        placeholderOption="-- Select --"
        options={sortFilters}
        component={SelectField}
        />
        </div>

        <div className="col-md-2">
      <Field
        id="sortOrder"
        name="sortOrder"
        label="Sort Order"
        placeholderOption="-- Select --"
        options={[{value: "ASC", label: "Ascending"}, {value: "DESC", label: "Descending"}]}
        component={SelectField}
        />
        </div>

        <div className="col-md-2">
      <Field
        id="page"
        name="page"
        type="number"
        label="Page Number"
        placeholder="Page Number"
        component={TextField}
        />
        </div>

        <div className="col-md-2">
      <Field
        id="perpage"
        name="perpage"
        label="Limit"
        type="number"
        placeholderOption="-- Select --"
        options={[{value: 20, label: "20"},{value: 50, label: "50"}, {value: 100, label: "100"}]}
        component={SelectField}
        />
        </div>

      <div className="col-md-3">
        <QueryButton type="submit"> <i className="fas fa-search-plus"></i> Run Query</QueryButton>
      </div>
      </div>
    )
}
