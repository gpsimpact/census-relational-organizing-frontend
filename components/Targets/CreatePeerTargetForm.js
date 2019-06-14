import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { FormError, FormSuccess,TextField,SubmitButton, CheckBoxArrayField, FormIcon, CheckBoxBlock, CheckBox } from '../Util/Forms';
import { LoadingBar } from '../Util/Loading';
import { SectionTitle } from '../Util/Typography';
import redirect from '../../lib/redirect'
import { DashPaths } from '../../paths';
import { Row, Col } from '../Util/Grid';
import PropTypes from 'prop-types';

export const CREATE_PEER_TARGET = gql`
    mutation createPeer($input:CreateTargetInput!){
        createTarget(input:$input){
            code
            success
            message
            item {
                id
            }
        }
    }
`;

export const CreatePeerTargetForm = (props) => {
    const { team, currentUser, tibs } = props;
    console.log(tibs);
    return(
        <Mutation mutation={CREATE_PEER_TARGET}>
            {(mutation, { data, loading, error}) => (
                <Formik
                    initialValues={
                        {
                            firstName:"", 
                            lastName:"",
                            email:"",
                            address:"",
                            city:"",
                            state:"",
                            zip5:"",
                            phone:"",
                            twitterHandle:"",
                            facebookProfile:"",
                            householdSize:1,
                            tibIds:[],
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
                                activeTibs: values.tibIds,
                                retainAddress: values.retainAddress,
                                teamId: team.id,
                            }
                        }
                        let response = await submitMutation(mutation, payload);
                        const result = await marshallMutationResponse(response, 'createTarget')
                        if(!result.success){
                            actions.setStatus({
                                form:{
                                    code: result.code,
                                    message: result.message
                                }
                            });
                            return;
                        }
                        redirect({}, `${DashPaths.targets.detail}?team=${team.slug}&target=${result.item.id}`)                        

                    }}
                    render={({status}) => (
                        <Form noValidate>
                            <LoadingBar active={loading}/>
                            {
                                status && status.form && status.form.code != 'Success' && <FormError error={status.form}/>
                            }
                            {
                                status && status.form && status.form.code === 'Success' && <FormSuccess message={status.form}/>
                            }
                            <SectionTitle>General Information</SectionTitle>
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
                            <SectionTitle>To the best of your knowledge mark all that are true</SectionTitle>

                            {tibs.map((tib, idx) => {
                                return(
                                    <Row key={idx}>
                                        <Col>
                                            <CheckBoxArrayField id={tib.id} name="tibIds" value={tib.id} label={tib.text}/>
                                        </Col>
                                    </Row>
                                )
                            })}

                                <SubmitButton 
                                    loading={loading}
                                    value="Create"
                                />
                        



                        </Form>
                    )}
                />
            )}
        </Mutation>
    )
}

CreatePeerTargetForm.propTypes = {
    team: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    tibs: PropTypes.array.isRequired
}