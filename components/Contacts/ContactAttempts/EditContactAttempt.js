import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import { methodOptions, dispositionOptions } from './Options';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DeleteContactAttempt } from './DeleteContactAttempt';

export const UPDATE_CONTACT_ATTEMPT = gql`
    mutation updateTargetContactAttempt($id: String!, $input:UpdateTargetContactAttemptInput!){
        updateTargetContactAttempt(id: $id, input:$input){
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

export const EditContactAttempt = (props) => {
    const target = props.target;
    const CA = props.CA;


    return (
        <Mutation mutation={UPDATE_CONTACT_ATTEMPT}>
            {(mutation, {data, loading, error}) => (
                <Formik 
                    initialValues={
                        {
                            content: props.CA.content,
                            disposition: props.CA.disposition,
                            method: props.CA.method
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
                            id: CA.id,
                            input: {
                                content: values.content,
                                disposition: values.disposition,
                                method: values.method,
                            }
                        }
                        let response = await submitMutation( mutation, payload);
                        let result = await marshallMutationResponse(response, 'updateTargetContactAttempt');
                        if(!result.success){
                            actions.setStatus({
                                form:{
                                    code: result.code,
                                    message: result.message
                                }
                            });
                            return;
                        }

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
                                                value={loading ? "Saving" : "Save"}
                                            />
                                            
                                        </Col>
                                        <Col md={6}>
                                            <DeleteContactAttempt CA={CA} target={target}/>
                                        </Col>
                                        <Col md={12}>
                                            {props && props.dirty &&
                                                <DirtyFormMessage> Contact attempt has unsaved changes </DirtyFormMessage>
                                            }
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