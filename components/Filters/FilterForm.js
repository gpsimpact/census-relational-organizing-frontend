import React from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { ConstructNewQuery } from '../../lib/constructors/BaseQueryConstructor';
import { PageFilters } from './PageFilters.js';
import { TopLevelOR } from './TopLevelOR';
import  Router  from "next/router";
import { FILTERS_OPEN_QUERY} from '../QueryComponents/FilterContainer';

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
});

export const FilterContainer = styled('div')`
    position: relative;
    overflow: hidden;
    display: none;
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;

    ${({open}) => open && `
      display: block;
    `}
`;

export class FilterForm extends React.Component {


    render(){
      const {currentQuery, primaryFilters, sortFilters, routeResponse, path} = this.props;
     
        return(
          <Query query={FILTERS_OPEN_QUERY}>
              {({data: {filtersOpen}}) => {
                return(
                  <FilterContainer open={filtersOpen}>
                      <Formik
                        initialValues={
                          {
                            OR: currentQuery.OR, 
                            page: currentQuery.pageNumber,
                            perpage: currentQuery.perPage,
                            sortBy: currentQuery.sortBy,
                            sortOrder: currentQuery.sortOrder,
                          }
                        }
                        validationSchema={filterValidationSchema}
                        onSubmit={async (values, actions) => {
                          let lens = ConstructNewQuery(values);
                          let page = values.page ? parseInt(values.page) : 1;
                          let perpage = values.perpage ? parseInt(values.perpage) : 20;
                          
                          let nextPath = `${this.props.path}?page=${page}&perpage=${perpage}`;
                          
                          if(lens){
                            nextPath += `&lens=${lens}`
                          }
                          Router.push(nextPath);
                        }}
                        render={({ values, errors }) => (
                          <Form noValidate>
                                <fieldset>
                                  <PageFilters sortFilters={this.props.sortFilters}/>
                                  <TopLevelOR primaryFilters={this.props.primaryFilters} values={values} errors={errors}/>
                                </fieldset>
                            </Form>
                          )}
                          />
                      </FilterContainer>

                      )
                    }} 
      </Query>
        )
    }
}


