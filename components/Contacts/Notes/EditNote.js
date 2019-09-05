import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import { DeleteNote } from './DeleteNote';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const UPDATE_NOTE = gql`
    mutation updateTargetNote($id: String!, $input:UpdateTargetNoteInput!){
        updateTargetNote(id: $id, input:$input){
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

export const EditNote = (props) => {
    const target = props.target;
    const TN = props.TN;

    return(
        <Mutation mutation={UPDATE_NOTE}>
            {(mutation, {data, loading, error}) => (
                <Formik 
                    initialValues={
                        {
                            content:TN.content ? TN.content : ""
                        }
                    }
                    validationSchema={
                        Yup.object().shape({
                            content: Yup.string().required('Required')
                        })
                    }
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            id: TN.id,
                            input: {
                                content: values.content
                            }
                        }
                        let response = await submitMutation( mutation, payload);
                        let result = await marshallMutationResponse(response, 'updateTargetNote');

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
                                        <Col md={6}>
                                            <SubmitButton 
                                                loading={loading}
                                                value={loading ? "Saving" : "Save"}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <DeleteNote TN={TN} target={target}/>
                                        </Col>
                                    </Row>
                        </Form>
                    )}
                />
            )}
        </Mutation>
    )
}