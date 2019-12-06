import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import { methodOptions, inPersonOptions, phoneOptions } from './Options';
import { GET_CONTACT_ATTEMPTS } from './ListContactAttempts';
import { GET_CONTACT_ATTEMPT } from './MostRecentContactAttempt';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PrimaryButton, SecondaryButton, H3 } from '../../Util/Typography';
import { CustomModal } from '../../Util/Layout';

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

export class CreateContactAttempt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    
    render(){
        const { target } = this.props;

        return(
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
                            sort: {createdAt: 'DESC'}
    
                        }
                    }
                },
                {
                    query: GET_CONTACT_ATTEMPT,
                    variables:{
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
                            this.setState({open: false});
                            actions.resetForm({content: "", disposition: "", method: ""});
    
                        }
                    }
                        render={props => (
                            <React.Fragment>
                            <SecondaryButton uppercase onClick={() =>  this.setState({open: true})}>Create</SecondaryButton>
                            <CustomModal 
                                show={this.state.open} 
                                onHide={() => this.setState({open: false})}
                                centered
                            >
                                <CustomModal.Header closeButton>
                                    <H3 uppercase>Create Contact Attempt</H3>
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
                                                    options={props.values.method === 'IN_PERSON' ? inPersonOptions : phoneOptions}
                                                    component={SelectField}
                                                />
                                            </Col>
                                        </Row>
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
                                    </Row>
                             
                                        <Row>
                                            <Col md={6}>
                                                <SubmitButton 
                                                    loading={loading}
                                                    value={loading ? "Creating" : "Create"}
                                                />
                                            </Col>
    
                                        </Row>
                             
    
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
