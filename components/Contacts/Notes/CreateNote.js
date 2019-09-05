import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import { GET_CONTACT_NOTES } from './ListNotes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const CREATE_NOTE = gql`
    mutation createTargetNote($input:CreateTargetNoteInput!){
        createTargetNote(input:$input){
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
            }
        }
    }
`;

export const CreateNote = (props) => {
    const target = props.target;
    const TN = props.TN;
    return(
        <Mutation mutation={CREATE_NOTE}
        refetchQueries={[
            {
                query: GET_CONTACT_NOTES,
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
                        }
                    }
                    validationSchema={
                        Yup.object().shape({
                            content: Yup.string().required('Required')
                        })
                    }
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            input: {
                                targetId: target.id,
                                content: values.content
                            }
                        }
                        let response = await submitMutation( mutation, payload);
                        let result = await marshallMutationResponse(response, 'createTargetNote');

                        if(!result.success){
                            actions.setStatus({
                                form: {
                                    code: result.code,
                                    message: result.message
                                }
                            });
                            return;
                        }
                        actions.resetForm({content:""});
                    }}
                    render={props => (
                        <Form noValidate>
                               {
                                        props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                                    }
                                    {
                                        props.status && props.status.form && props.status.form.code === 'Success' && <FormSuccess message={props.status.form}/>
                                    }
                                    <Row>
                                        <Col md={12}>
                                        <Field 
                                            id="content"
                                            label={"Contact Note"} 
                                            name={"content"}
                                            placeholderOption="-- Select --"
                                            component={TextAreaField}
                                        />
                                        </Col>
                                        <Col md={12}>
                                            <SubmitButton 
                                                loading={loading}
                                                value={loading ? "Creating" : "Create"}
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