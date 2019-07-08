import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { FormError, FormSuccess,TextField,SubmitButton, CheckBoxArrayField, FormIcon, CheckBox } from '../Util/Forms';
import { LoadingBar } from '../Util/Loading';
import { H2, H3, FormDisclaimer } from '../Util/Typography';
import redirect from '../../lib/redirect'
import { DashPaths } from '../../paths';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import Place from '@material-ui/icons/Place';
import Phone from '@material-ui/icons/Phone';
import Home from '@material-ui/icons/Home';

export const CREATE_CONTACT = gql`
    mutation createContact($input:CreateTargetInput!){
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
export const CreateContactForm = (props) => {
    const { team, currentUser, tibs } = props;

    return(
        <Mutation mutation={CREATE_CONTACT}>
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
                        redirect({}, `${DashPaths.contacts.detail}?team=${team.slug}&target=${result.item.id}`)                        

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
                            <H2>General Information</H2>
                            <Row bsPrefix={'row align-items-center'}>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={<Person/>}/>
                                </Col>
                                <Col md={12} lg={5}>
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        placeholder="First Name"
                                        component={TextField}
                                    />
                                </Col>
                                <Col md={12} lg={6}>
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        component={TextField}
                                    />
                                </Col>
                            </Row>

        

                            <Row bsPrefix={'row align-items-center'}>
                            <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={<Email/>}/>
                                </Col>
                                <Col md={12} lg={11}>
                                    <Field
                                        id="email"
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                        component={TextField}
                                    />
                                </Col>
                            </Row>

                            <Row bsPrefix={'row align-items-center'}>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={<Place/>}/>
                                </Col>
                                <Col md={12}lg={6}>
                                    <Field
                                        id="address"
                                        name="address"
                                        label="Address"
                                        placeholder="Address"
                                        component={TextField}
                                    />
                                </Col>
                                <Col md={12} lg={5}>
                                    <FormDisclaimer>Retain address dislcaimer/explainer</FormDisclaimer>
                                    <Field
                                        id="retainAddress"
                                        name="retainAddress"
                                        label="Retain Address"
                                        component={CheckBox}
                                    />


                                </Col>
                              
                              
                            </Row>

                            <Row bsPrefix={'row align-items-center'}>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                </Col>
                                <Col md={12} lg={5}>
                                    <Field
                                        id="city"
                                        name="city"
                                        label="City"
                                        placeholder="City"
                                        component={TextField}
                                    />
                                </Col>
                                <Col md={12} lg={3}>
                                    <Field
                                        id="state"
                                        name="state"
                                        label="State"
                                        placeholder="State"
                                        component={TextField}
                                    />
                                </Col>
                                <Col md={12} lg={3}>
                                    <Field
                                        id="zip5"
                                        name="zip5"
                                        label="Zip Code"
                                        placeholder="Zip Code"
                                        component={TextField}
                                    />
                                </Col>

                            </Row>

                            <Row bsPrefix={'row align-items-center'}>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                        <FormIcon icon={<Phone/>}/>
                                </Col>
                                <Col lg={11} md={12}>
                                    <Field
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        placeholder="Phone"
                                        component={TextField}
                                    />
                                </Col>
                              
                            </Row>

                            <Row bsPrefix={'row align-items-center'}>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={<Home/>}/>
                                </Col>
                                <Col lg={3} md={12}>
                                    <Field
                                        id="householdSize"
                                        name="householdSize"
                                        label="Household Size"
                                        placeholder="#"
                                        type="number"
                                        component={TextField}
                                    />
                                </Col>
    
                                <Col md={12} lg={4}>
                                    <Field
                                        id="twitterHandle"
                                        name="twitterHandle"
                                        label="Twitter Handle"
                                        placeholder="@"
                                        component={TextField}
                                    />
                                </Col>

                           
                                <Col lg={4} md={12}>
                                    <Field
                                        id="facebookProfile"
                                        name="facebookProfile"
                                        label="Facebook Profile"
                                        placeholder="Facebook URL"
                                        component={TextField}
                                    />
                                </Col>
                              
                            </Row>
                            <H3>To the best of your knowledge mark all that are true</H3>

                            {tibs.map((tib, idx) => {
                                console.log(tib);
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