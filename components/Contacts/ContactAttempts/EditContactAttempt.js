import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import { methodOptions, inPersonOptions, phoneOptions } from './Options';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GET_CONTACT_ATTEMPTS } from './ListContactAttempts';
import { GET_CONTACT_ATTEMPT } from './MostRecentContactAttempt';
import { PrimaryButton, SecondaryButton, H3 } from '../../Util/Typography';
import { CustomModal } from '../../Util/Layout';

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
export class EditContactAttempt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    render(){
        const { target, CA, dataFromParent0 } = this.props;
        return(
            <Mutation mutation={UPDATE_CONTACT_ATTEMPT}
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
                                edit: false,
                                content: CA.content,
                                disposition: CA.disposition,
                                method: CA.method
                            }
                        }
                        validationSchema={
                            Yup.object().shape({
                                content: Yup.string().when('edit', {
                                    is: true,
                                    then: Yup.string().required('required'),
                                    otherwise: Yup.string().notRequired()
                                }),
                                disposition: Yup.string().when('edit', {
                                    is: true,
                                    then: Yup.string().required('required'),
                                    otherwise: Yup.string().notRequired()
                                }),
                                method: Yup.string().when('edit', {
                                    is: true,
                                    then: Yup.string().required('required'),
                                    otherwise: Yup.string().notRequired()
                                })
                        
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
                            if(values.edit === false) {
                                payload.input.active = false;
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
                            else {
                                let currentVals = {
                                    content: result.item.content ? result.item.content : "",
                                    disposition: result.item.disposition ? result.item.disposition : "",
                                    method: result.item.method ? result.item.method : "",
                                }
                                actions.resetForm(currentVals);
                                if(values.edit === false) {
                                    this.setState({open: false});
                                }
                            }
    
                        }
                    }
                        render={props => (
                            <React.Fragment>
                            <PrimaryButton uppercase onClick={() =>  this.setState({open: true})}>Edit</PrimaryButton>
                            <CustomModal 
                                show={this.state.open} 
                                onHide={() => this.setState({open: false})}
                                centered
                            >
                            <CustomModal.Header closeButton>
                                <H3 uppercase>{dataFromParent0('EDIT CONTACT ATTEMPT')}</H3>
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
                                                    label={dataFromParent0('CONTACT METHOD')}
                                                    name={"method"}
                                                    placeholderOption={dataFromParent0('-- Select --')}
                                                    options={methodOptions(dataFromParent0)}
                                                    component={SelectField}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Field 
                                                    id="disposition"
                                                    label={dataFromParent0('CONTACT DISPOSITION')}
                                                    name={"disposition"}
                                                    placeholderOption={dataFromParent0('-- Select --')}
                                                    options={props.values.method === 'IN PERSON' ? inPersonOptions(dataFromParent0) : phoneOptions(dataFromParent0)}
                                                    component={SelectField}
                                                />
                                            </Col>
                                        </Row>
                                <Row>
                                    <Col md={12}>
                                    <Field 
                                            id="content"
                                            label={dataFromParent0('CONTACT NOTE')}
                                            name={"content"}
                                            placeholderOption={dataFromParent0('-- Select --')}
                                            component={TextAreaField}
                                        />
                                    </Col>
                                    </Row>
                                 
                                      
                                        <Row>
                                        <Col md={6}>
                                                <PrimaryButton
                                                    type="button" 
                                                   
                                                    onClick={() => {
                                                        props.setFieldValue('edit', true, false)
                                                        props.handleSubmit();
                                                    }}
                                                > {loading ? dataFromParent0("SAVING") : dataFromParent0("SAVE") }  </PrimaryButton>
                                            </Col>
                                            <Col md={6}>
                                                <SecondaryButton 
                                                    type="button"
                                                    value="Delete"
                                                    onClick={() => {
                                                        props.setFieldValue('edit', false, false);
                                                        props.handleSubmit();
                                                    }}
                                                > {loading ? dataFromParent0("DELETING") : dataFromParent0("DELETE") }</SecondaryButton>
                                            </Col>
                                            <Col md={12}>
                                                {props && props.dirty &&
                                                    <DirtyFormMessage> Contact attempt has unsaved changes </DirtyFormMessage>
                                                }
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
