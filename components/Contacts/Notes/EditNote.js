import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GET_CONTACT_NOTES } from './ListNotes';
import { PrimaryButton, SecondaryButton } from '../../Util/Typography';


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
        <Mutation mutation={UPDATE_NOTE}
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

                    }
                }
            }
        ]}
        >
            {(mutation, {data, loading, error}) => (
                <Formik 
                    initialValues={
                        {
                            edit: true,
                            content:TN.content ? TN.content : ""
                        }
                    }
                    validationSchema={
                        Yup.object().shape({
                            content: Yup.string().when('edit', {
                                is: true,
                                then: Yup.string().required('required'),
                                otherwise: Yup.string().notRequired()
                            })
                        })
                    }
                    onSubmit={ async (values, actions) => {
                            let payload = {
                                id: TN.id,
                                input: {
                                    content: values.content
                                }
                            }
                            if(values.edit === false) {
                                payload.input.active = false;
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
                                            <PrimaryButton
                                                type="button" 
                                               
                                                onClick={() => {
                                                    props.setFieldValue('edit', true, false)
                                                    props.handleSubmit();
                                                }}
                                            > {loading ? "Saving" : "Save" } </PrimaryButton>
                                        </Col>
                                        <Col md={6}>
                                            <SecondaryButton 
                                                type="button"
                                                value="Delete"
                                                onClick={() => {
                                                    props.setFieldValue('edit', false, false);
                                                    props.handleSubmit();
                                                }}
                                            > {loading ? "Deleting" : "Delete" }</SecondaryButton>
                                        </Col>
                                    </Row>
                        </Form>
                    )}
                />
            )}
        </Mutation>
    )
}