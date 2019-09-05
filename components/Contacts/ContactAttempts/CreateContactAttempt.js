import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import { methodOptions, dispositionOptions } from './Options';
import { GET_CONTACT_ATTEMPTS } from './ListContactAttempts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const CREATE_CONTACT_ATTEMPT = gql`
    mutation createTargetContactAttempt($input:CreateTargetContactAttemptInput!){
        createTargetContactAttempt(input:$input){
            code
            success
            message
            item {
                id
                createdAt
                updatedAt
                active
                target {
                    id
                }
                createdBy {
                    id
                }
                lastEditedBy {
                    id
                }
                content
                disposition
                method
            }
        }
    }
`;

export const CreateContactAttempt = (props) => {
    const target = props.target;



    return (
        <Mutation mutation={CREATE_CONTACT_ATTEMPT}
        refetchQueries={[
            {
                query: GET_CONTACT_ATTEMPTS,
                variables: {
                    input: {
                        targetId: target.id,
                        where: {
                            AND: [
                                {active: {eq: true}}
                            ]
                        },
                        sort: {
                            updatedAt: "DESC"
                        }

                    }
                }
            }
        ]}
        >
            {(mutation, {data, loading, error}) => (
                <Formik 
                    initialValues={
                        {
                            content: "",
                            disposition: "",
                            method: ""
                        }
                    }
                    validationSchema={
                        Yup.object().shape({
                            content: Yup.string().required('Required'),
                            disposition: Yup.string().required('Required'),
                            method: Yup.string().required('Required')
                        })
                    }
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            input: {
                                targetId: target.id,
                                content: values.content,
                                disposition: values.disposition,
                                method: values.method,
                            }
                        }
                        let response = await submitMutation( mutation, payload);
                        let result = await marshallMutationResponse(response, 'createTargetContactAttempt');
                        if(!result.success){
                            actions.setStatus({
                                form:{
                                    code: result.code,
                                    message: result.message
                                }
                            });
                            return;
                        } 
                        actions.resetForm({content: "", disposition: "", method: ""});

                    }
                }
                    render={props => (
                        <Form noValidate>
                             {
                                        props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                                    }
                                    {
                                        props.status && props.status.form && props.status.form.code === 'Success' && <FormSuccess message={props.status.form}/>
                                    }
                            <Row>
                            <Col md={6}>
                                <Field 
                                        id="content"
                                        label={"Contact Note"} 
                                        name={"content"}
                                        placeholderOption="-- Select --"
                                        component={TextAreaField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Row>
                                        <Col md={6}>
                                            <Field 
                                                id="method"
                                                label={"Contact Method"} 
                                                name={"method"}
                                                placeholderOption="-- Select --"
                                                options={methodOptions}
                                                component={SelectField}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Field 
                                                id="disposition"
                                                label={"Contact Disposition"} 
                                                name={"disposition"}
                                                placeholderOption="-- Select --"
                                                options={dispositionOptions}
                                                component={SelectField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <SubmitButton 
                                                loading={loading}
                                                value={loading ? "Creating" : "Create"}
                                            />
                                        </Col>

                                    </Row>
                                </Col>
                                

                            </Row>

                        </Form>
                    )}


                    
                />
            )}
        </Mutation>
    )
}