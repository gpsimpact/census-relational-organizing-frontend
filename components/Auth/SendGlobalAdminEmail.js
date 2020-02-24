import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormError, FormSuccess, TextAreaField, TextField, SubmitButton } from '../Util/Forms';
import { i18n, withTranslation } from '../../lib/i18';
import { useTranslation } from 'react-i18next';

import { H3, H4 } from '../Util/Typography';
import { CustomModal } from '../Util/Layout/Modal';
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';

export const SEND_GLOBAL_ADMIN_EMAIL = gql`
    mutation sendGlobalAdminsEmail($input: SendGlobalAdminsEmailInput!){
        sendGlobalAdminsEmail(input:$input){
            code
            success
            message
        }
    }
`;

export class SendGlobalAdminEmail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
    }

    render(){
        const {dataFromParent} = this.props;

        return(

            <Mutation mutation={SEND_GLOBAL_ADMIN_EMAIL}>
            {(mutation, { data, loading, error}) => (
                <Formik
                initialValues={{body: "", subject: ""}}
                validationSchema={
                    Yup.object().shape({
                        body: Yup.string().required('Required'),
                        subject: Yup.string().required('Required')
                    })
                }
                onSubmit={ async (values, actions) => {
                    let payload = {
                        input: {
                            body: values.body,
                            subject: values.subject
                        }
                    }

                    let response = await submitMutation(mutation, payload);
                    let result = await marshallMutationResponse(response, 'sendGlobalAdminsEmail');
                    if(!result.success){
                        actions.setStatus({
                            form:{
                                code: result.code,
                                message: result.message
                            }
                        })
                    } else {
                        this.setState({open:false});
                        actions.resetForm({body:'', subject: ''});
                    }
                    
                }}
                render={props =>(
                    <React.Fragment>
                <a className="nav-link" onClick={() =>  this.setState({open: true})}>{dataFromParent('HELP')}</a>
                            <CustomModal 
                                show={this.state.open}
                                onHide={() => this.setState({open:false})}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <H3 uppercase>{dataFromParent('HELP')}</H3>
                                </Modal.Header>

                                <Modal.Body>
                                    <Form noValidate>
                                        <H4>This form will send a message to the admins of the website.</H4>
                                        <hr/>
                                        {
                                            props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                                        }
                                        {
                                            props.status && props.status.form && props.status.form.code === 'Success' && <FormSuccess message={props.status.form}/>
                                        }


                                        <Row>
                                            <Col md={12}>
                                                <Field
                                                    id="subject"
                                                    name={"subject"}
                                                    label={dataFromParent('EMAIL SUBJECT')}
                                                    placeHolder={dataFromParent('EMAIL SUBJECT')}
                                                    component={TextField}
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <Field
                                                    id="body"
                                                    label={dataFromParent('EMAIL MESSAGE')}
                                                    name={"body"}
                                                    placeHolder={dataFromParent('EMAIL MESSAGE')}
                                                    component={TextAreaField}
                                                />
                                            </Col>
                                            <Col md={12}>
                                                 <SubmitButton 
                                                    loading={loading}
                                                    value={loading ? "Sending" : "Send"}
                                                />
                                            </Col>
                                        </Row>

                                    </Form>
                                </Modal.Body>
                               
                            </CustomModal>
                               

                                
                        </React.Fragment>
                    )}
                    />
                    )}
            </Mutation>
        )
    }
}