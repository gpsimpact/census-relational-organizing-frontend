import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, FormSuccess, TextAreaField, SelectField, SubmitButton, FormIcon, CheckBox, DirtyFormMessage } from '../../Util/Forms';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';
import { GET_CONTACT_NOTES } from './ListNotes';
import { GET_CONTACT_NOTE } from './LatestNote';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PrimaryButton, SecondaryButton, H3 } from '../../Util/Typography';
import { CustomModal } from '../../Util/Layout';
import { useTranslation } from 'react-i18next';

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
export class CreateNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    
    render(){
        const { target, t } = this.props;
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
                        this.setState({open: false});
                        actions.resetForm({content:""});
                    }}
                    render={props => (
                        <React.Fragment>
                        <SecondaryButton uppercase onClick={() =>  this.setState({open: true})}>{t('CREATE')}</SecondaryButton>
                        <CustomModal 
                            show={this.state.open} 
                            onHide={() => this.setState({open: false})}
                            centered
                        >
                            <CustomModal.Header closeButton>
                                <H3 uppercase>{t('Create Contact Attempt')}</H3>
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
                                            placeholderOption={t('-- Select --')}
                                            component={TextAreaField}
                                        />
                                        </Col>
                                        <Col md={12}>
                                            <SubmitButton 
                                                loading={loading}
                                                value={loading ? "Creating" : t("CREATE")}
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

