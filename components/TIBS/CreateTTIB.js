import React from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from 'prop-types';

import * as Yup from "yup";
import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { Row, Col } from "../Util/Grid";
import { FormError, FormSuccess,TextField,IconSubmitButton } from '../Util/Forms';
import { submitMutation, marshallMutationResponse } from "../../lib/helpers";
import { GET_TTIBS } from '../QueryComponents/TTIBS';

export const CREATE_TTIB = gql`
    mutation createTTIB($input: CreateTtibInput!){
        createTtib(input: $input) {
            code
            success
            message
            item {
                id
                text
                active
                visible
                userId
                gtibLink
            }
        }
    }
`;

export const CreateTTIB = (teamId) => {
    return(
        <Mutation mutation={CREATE_TTIB}
            refetchQueries={
                [
                    {
                        query: GET_TTIBS,
                        variables: {input:{...teamId}}
                    }
                ]
            }
        >
            {(mutation, {data, loading, error}) =>(
                <Formik
                    initialValues={{text:""}}
                    validationSchema={Yup.object().shape({text: Yup.string().required('I need a question.')})}
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            input:{
                                ...teamId,
                                text: values.text
                            }
                        }
                        let response = await submitMutation(mutation, payload);
                        let result = await marshallMutationResponse(response, 'createTtib');
                        console.log(response);
                        console.log(result);
                        if(!result.success){
                            actions.setStatus({
                                form:{
                                    code: result.code,
                                    message: result.message
                                }
                            })
                        } else {
                            actions.resetForm({text: ""});
                        }
                    }}
                    render={({status}) => (
                        <Form noValidate>
                            {
                                status && status.form && <FormError error={status.form}/>
                            }
                            <Row>
                                <Col classNames={'col col-10'}>
                                    <Field 
                                        id="text"
                                        name="text"
                                        label="TTIB Text"
                                        placeholder="TTIB Text"
                                        component={TextField}
                                    />
                                </Col>
                                <Col classNames={'col col-2'}>
                                    <IconSubmitButton 
                                        loading={loading}
                                        icon="fas fa-plus"
                                    />
                                </Col>

                            </Row>
                        </Form>
                    )}
                />
            )}
        </Mutation>
    )
}

CreateTTIB.propTypes = {
    teamId: PropTypes.string.isRequired
}