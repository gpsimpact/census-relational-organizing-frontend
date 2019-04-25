import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from 'yup';

import { SelectField } from "../Forms/SelectField"
import { TextField } from "../Forms/TextField"
import { ConstructNewQuery } from '../../../lib/queryConstructor';
import styled from '../../../lib/styled';
import  { PrimaryFilter } from './PrimaryFilter';

const QueryButton = styled('button')`
    position: relative;
    padding: 10px 30px;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.blue};
    color: ${props => props.theme.colors.white};
    margin-top: ${props=>props.theme.spacing[3]};
    font-weight: 700;
    width: 100%;
:hover,
:focus {
    background-color: ${props=>props.theme.colors.black};
    cursor: pointer;
}
`;

const filterValidationSchema = Yup.object().shape({
    OR: Yup.array().of(
      Yup.object().shape({
        AND: Yup.array().of(
          Yup.object().shape({
            key: Yup.string().required('A key is required'),
            op: Yup.string().required('An operation is required'),
            val: Yup.string().required('A value is required')

          })
        )
      })
    )
})
interface FilterFormInterface {
    primaryFilters: any;
    sortFilters: any;
    routeResponse: any;
    path: string;
    currentQuery: any;
}
export class FilterForm extends React.Component<FilterFormInterface> {


    render(){
      const {currentQuery, primaryFilters, sortFilters, routeResponse, path} = this.props;
      let currentOR:any = [];
      if(currentQuery && currentQuery.formWhere && currentQuery.formWhere.OR){
        currentOR = currentQuery.formWhere.OR;
      }
  

      let currentSortBy:string = 'name';
      let currentSortOrder:string = 'ASC';
      
      if(currentQuery && currentQuery.sort){
        for(var sortKey in currentQuery.sort) break;
        currentSortBy = sortKey;
        currentSortOrder = currentQuery.sort[sortKey];
      }
      
      let currentPage:number = 1;
      if(currentQuery && currentQuery.page){
        currentPage = currentQuery.page;
      }
      let currentPerPage:number = 50;
      if(currentQuery && currentQuery.perpage){
        let currentPerPage = currentQuery.perpage;
      }


        return(
    <Formik
      initialValues={
          {
            OR: currentOR, 
            page: currentPage,
            perpage: currentPerPage,
            sortBy: currentSortBy,
            sortOrder: currentSortOrder
        }
      }
      validationSchema={filterValidationSchema}
      onSubmit={async (values, actions) => {
        let lens:any = ConstructNewQuery(values);
        let page:any = values.page ? parseInt(values.page) : 1;
        let perpage:any = values.perpage ? parseInt(values.perpage) : 20;

        let nextPath:string = `${this.props.path}?page=${page}&perpage=${perpage}`;

        if(lens){
          nextPath += `&lens=${lens}`
        }
        console.log(lens);
        this.props.routeResponse(nextPath);

      }}
      render={({ values, errors }) => (
        <Form noValidate>
            <fieldset>

              <div className="row">
   
                <div className="col-md-3">
              <Field
                id="sortBy"
                name="sortBy"
                label="Sort By"
                placeholderOption="-- Select --"
                options={this.props.sortFilters}
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
                          primaryFilters={this.props.primaryFilters}
                      />
                  )}
                />
              </div>
          
              </div>
            </fieldset>
        </Form>
      )}
    />
        )
    }
}


