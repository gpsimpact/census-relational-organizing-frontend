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
import { GET_CONTACT_NOTE } from './LatestNote';
import { PrimaryButton, SecondaryButton, H3 } from '../../Util/Typography';
import { CustomModal } from '../../Util/Layout';

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



export class EditNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    
    render(){
        const {target, TN } = this.props;
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
                },
                {
                    query: GET_CONTACT_NOTE,
                    variables: {
                        input: {
                            targetId: target.id,
                            where: {
                                AND: [
                                    {active: {eq: true}}
                                ]
                            },
                            limit: 1,
                            sort: {
                                createdAt: "DESC"
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
                        } else {
                            let currentVals = {
                                content: result.item.content ? result.item.content : "",
                            }
                            actions.resetForm(currentVals);
                        }
                
                }}
                render={props => (
                    <React.Fragment>
                        <PrimaryButton uppercase onClick={() =>  this.setState({open: true})}>Edit</PrimaryButton>
                        <CustomModal 
                                show={this.state.open} 
                                onHide={() => this.setState({open: false})}
                                centered
                            >
                        <CustomModal.Header closeButton>
                            <H3 uppercase>Edit Note</H3>
                        </CustomModal.Header>
                        <CustomModal.Body>
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
                                                label={t('CONTACT NOTE')}
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
                                        {props && props.dirty &&
                                    <DirtyFormMessage> This form has unsaved changes </DirtyFormMessage>
                                }
                            </Form>
                          </CustomModal.Body>
                        </CustomModal>
        
                    </React.Fragment>
                )}
            />
    )}

</Mutation>

        )
    }
}

