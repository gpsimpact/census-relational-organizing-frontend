import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { FormTitle } from '../Util/Typography';
import { Row, Col } from '../Util/Grid';
import { FormError, FormSuccess,TextField,SubmitButton, FormIcon, CheckBox,DirtyFormMessage } from '../Util/Forms';

export const EDIT_PEER_TARGET = gql`
    mutation updateTarget($id:String!, $input:UpdateTargetInput!){
        updateTarget(id:$id, input:$input) {
            code
            success
            message
            item {
                id
                firstName
                lastName
                email
                address
                city
                state
                zip5
                phone
                twitterHandle
                facebookProfile
                householdSize
                tibs {
                    id
                    text
                    isApplied
                }
                active
            }
        }
    }
`;

export const EditPeerTargetForm = (props) => {
    let {target} = props;
    return(
        <Mutation mutation={EDIT_PEER_TARGET}>
            {(mutation, {data, loading, error}) => (
                <Formik
                    initialValues={
                        {
                            firstName: target.firstName ? target.firstName : "",
                            lastName: target.lastName ? target.lastName : "",
                            email: target.email ? target.email : "", 
                            address: target.address ? target.address : "",
                            city: target.city ? target.city : "",
                            state: target.state ? target.state : "",
                            zip5: target.zip5 ? target.zip5 : "",
                            phone: target.phone ? target.phone : "",
                            twitterHandle: target.twitterHandle ? target.twitterHandle : "",
                            facebookProfile: target.facebookProfile ? target.facebookProfile : "",
                            householdSize: target.householdSize ? target.householdSize : "",
                            retainAddress: true
                        }
                
                    }
                    validationSchema={
                        Yup.object().shape({
                            firstName: Yup.string().required('First name is required'),
                            lastName: Yup.string().required('Last name is required'),
                            email: Yup.string().email('Valid Email required'),
                            address: Yup.string(),
                            city: Yup.string(),
                            state: Yup.string(),
                            zip5: Yup.string().min(5, '5 digit zip code').max(5, '5 digit zip code'),
                            phone: Yup.string(),
                            twitterHandle: Yup.string(),
                            facebookProfile: Yup.string(),
                            householdSize: Yup.number().positive(),

                        })
                    }
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            id: target.id,
                            input: {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                address: values.address,
                                city: values.city,
                                state: values.state,
                                zip5: values.zip5,
                                phone: values.phone,
                                twitterHandle: values.twitterHandle,
                                facebookProfile: values.facebookProfile,
                                householdSize: values.householdSize,
                                retainAddress: values.retainAddress,
                            }
                        }
                        let response = await submitMutation( mutation, payload);
                        let result = await marshallMutationResponse(response, 'updateTarget');
                        if(!result.success){
                            actions.setStatus({
                                form: {
                                    code: result.code,
                                    message: result.message,
                                }
                            })
                            return;
                        } else {
                            let currentVals = {
                                firstName: result.item.firstName ? result.item.firstName : "",
                                lastName: result.item.lastName ? result.item.lastName : "",
                                email: result.item.email ? result.item.email : "", 
                                address: result.item.address ? result.item.address : "",
                                city: result.item.city ? result.item.city : "",
                                state: result.item.state ? result.item.state : "",
                                zip5: result.item.zip5 ? result.item.zip5 : "",
                                phone: result.item.phone ? result.item.phone : "",
                                twitterHandle: result.item.twitterHandle ? result.item.twitterHandle : "",
                                facebookProfile: result.item.facebookProfile ? result.item.facebookProfile : "",
                                householdSize: result.item.householdSize ? result.item.householdSize : "",
                                retainAddress: values.retainAddress,
                            }
                            actions.resetForm(currentVals);

                        }

                    }}
                    render={props => (
                        <Form noValidate>
                            {
                                props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                            }
                          
                            <FormTitle>General Information</FormTitle>
                            <Row classNames={'align-items-center'}>
                                <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={"far fa-user"}/>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-5'}>
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        placeholder="First Name"
                                        component={TextField}
                                    />
                                </Col>
                                <Col classNames={'col-md-12 col-lg-6'}>
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        component={TextField}
                                    />
                                </Col>
                            </Row>

        

                            <Row classNames={'align-items-center'}>
                            <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={"far fa-envelope"}/>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-11'}>
                                    <Field
                                        id="email"
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                        component={TextField}
                                    />
                                </Col>
                            </Row>

                            <Row classNames={'align-items-center'}>
                                <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={"fas fa-location-arrow"}/>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-6'}>
                                    <Field
                                        id="address"
                                        name="address"
                                        label="Address"
                                        placeholder="Address"
                                        component={TextField}
                                    />
                                </Col>
                                <Col classNames={'col-md-12 col-lg-5'}>
                                    <Field
                                        id="retainAddress"
                                        name="retainAddress"
                                        label="Retain Address"
                                        component={CheckBox}
                                    />
                                </Col>
                              
                            </Row>

                            <Row classNames={'align-items-center'}>
                                <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-5'}>
                                    <Field
                                        id="city"
                                        name="city"
                                        label="City"
                                        placeholder="City"
                                        component={TextField}
                                    />
                                </Col>
                                <Col classNames={'col-md-12 col-lg-3'}>
                                    <Field
                                        id="state"
                                        name="state"
                                        label="State"
                                        placeholder="State"
                                        component={TextField}
                                    />
                                </Col>
                                <Col classNames={'col-md-12 col-lg-3'}>
                                    <Field
                                        id="zip5"
                                        name="zip5"
                                        label="Zip Code"
                                        placeholder="Zip Code"
                                        component={TextField}
                                    />
                                </Col>

                            </Row>

                            <Row classNames={'align-items-center'}>
                                <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={"fas fa-phone"}/>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-11'}>
                                    <Field
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        placeholder="Phone"
                                        component={TextField}
                                    />
                                </Col>
                              
                            </Row>

                            <Row classNames={'align-items-center'}>
                                <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={"fas fa-home"}/>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-3'}>
                                    <Field
                                        id="householdSize"
                                        name="householdSize"
                                        label="Household Size"
                                        placeholder="#"
                                        type="number"
                                        component={TextField}
                                    />
                                </Col>
                                <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={"fab fa-twitter"}/>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-3'}>
                                    <Field
                                        id="twitterHandle"
                                        name="twitterHandle"
                                        label="Twitter Handle"
                                        placeholder="@"
                                        component={TextField}
                                    />
                                </Col>

                                <Col classNames={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={"fab fa-facebook"}/>
                                </Col>
                                <Col classNames={'col-md-12 col-lg-3'}>
                                    <Field
                                        id="facebookProfile"
                                        name="facebookProfile"
                                        label="Facebook Profile"
                                        placeholder="Facebook URL"
                                        component={TextField}
                                    />
                                </Col>
                              
                            </Row>
                            <SubmitButton 
                                    loading={loading}
                                    value={loading ? "Saving" : "Save"}
                                />
                                 {props && props.dirty &&
                                    <DirtyFormMessage> This form has unsaved changes </DirtyFormMessage>
                                }
                        </Form>
                    )}
                />
            )}
        </Mutation>
    )
}