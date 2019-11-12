import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { H4,FormDisclaimer } from '../Util/Typography';
import { FormError,TextField,SubmitButton, FormIcon, CheckBox,DirtyFormMessage, SelectField, AddContactButton, RemoveContactButton } from '../Util/Forms';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import Place from '@material-ui/icons/Place';
import Phone from '@material-ui/icons/Phone';
import Home from '@material-ui/icons/Home';
import Accessibility from '@material-ui/icons/Accessibility'
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

export const EDIT_TARGET = gql`
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
                retainAddress
                tibs {
                    id
                    text
                    isApplied
                }
                active
                genderIdentity
                sexualOrientation
                raceEthnicity
                isNameAlias
                householdMembers {
                    relationship
                    name
                }
            }
        }
    }
`;

export const EditContactForm = (props) => {
    let {target} = props;
    const sexualOrientationOptions = [
        {
            value: "TBD1",
            label: "TBD1"
        },
        {
            value: 'TBD2',
            label: 'TBD2'
        },
     
    ]
    const genderIdentityOptions = [
        {
            value: "TBD1",
            label: "TBD1"
        },
        {
            value: 'TBD2',
            label: 'TBD2'
        },
     
    ]
    const raceEthnicityOptions = [
        {
            value: "TBD1",
            label: "TBD1"
        },
        {
            value: 'TBD2',
            label: 'TBD2'
        },
     
    ]

    const householdRelationOptions = [
        {
            value: "",
            label: "-- Select --"
        },
        {
            value: "PRIMARY",
            label: "Primary"
        },
        {
            value: 'CHILD',
            label: 'Child'
        },
             {
            value: "ELDER",
            label: "Elder"
        },
        {
            value: 'SIBLING',
            label: 'Sibling'
        },
    ]

    return(
        <Mutation mutation={EDIT_TARGET}>
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
                            retainAddress: target.retainAddress,
                            isNameAlias: target.isNameAlias,
                            genderIdentity: target.genderIdentity ? target.genderIdentity : 'TBD1',
                            sexualOrientation: target.sexualOrientation ? target.sexualOrientation : 'TBD1',
                            raceEthnicity: target.raceEthnicity ? target.raceEthnicity : 'TBD1',
                            householdMembers: target.householdMembers ? target.householdMembers : [],
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
                                isNameAlias: values.isNameAlias,
                                genderIdentity: values.genderIdentity,
                                sexualOrientation: values.sexualOrientation,
                                raceEthnicity: values.raceEthnicity,
                            }
                        }
                        if(values.householdMembers && values.householdMembers.length > 0){
                            payload.input.householdMembers = values.householdMembers.map(member => ({name: member.name, relationship: member.relationship}))
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
                                retainAddress: result.item.retainAddress,
                                isNameAlias: result.item.isNameAlias,
                                genderIdentity: result.item.genderIdentity ? result.item.genderIdentity : 'TBD1',
                                sexualOrientation: result.item.sexualOrientation ? result.item.sexualOrientation : 'TBD1',
                                raceEthnicity: result.item.raceEthnicity ? result.item.raceEthnicity : 'TBD1',
                                householdMembers: result.item.householdMembers ? result.item.householdMembers : [],
                            }
                            actions.resetForm(currentVals);

                        }

                    }}
                    render={props => (
                        <Form noValidate>
                            {
                                props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                            }
                          
                            <Row bsPrefix={'row align-items-center'}>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={<Person/>}/>
                                </Col>
                                <Col md={12} lg={4}>
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        placeholder="First Name"
                                        component={TextField}
                                    />
                                
                                </Col>
                                <Col md={12} lg={4}>
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        component={TextField}
                                    /> 
                                </Col>
                                <Col md={12} lg={3}>
                                    <FormDisclaimer>This is not the contact's real name.</FormDisclaimer>
                                    <Field
                                        id="isNameAlias"
                                        name="isNameAlias"
                                        label="Name Alias"
                                        component={CheckBox}
                                    />

                                </Col>
                               
                            </Row>

                            <Row>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                </Col>

                                <Col md={12} lg={11}>
                                    <H4 uppercase>Additional Household Members</H4>
                                    <FieldArray
                                        name="householdMembers"
                                        render={arrayHelpers => (
                                            <div>
                                                {props.values.householdMembers && props.values.householdMembers.length > 0 
                                                &&
                                                (
                                                    props.values.householdMembers.map((member, idx) => (
                                                        <Row bsPrefix={'row align-items-center py-1'} key={idx}>
                                                            <Col md={1}>
                                                                <RemoveContactButton onClick={() => arrayHelpers.remove(idx)}>
                                                                    <RemoveCircle/>
                                                                </RemoveContactButton>
                                                            </Col>
                                                            <Col md={5}>
                                                                <Field 
                                                                    name={`householdMembers.${idx}.name`}
                                                                    label="Household Member's Name"
                                                                    placeholder="Household Member's Name"
                                                                    component={TextField}
                                                                />
                                                            </Col>
                                                            <Col md={5}>
                                                                <Field
                                                                    id={`householdMembers.${idx}.relationship`}
                                                                    name={`householdMembers.${idx}.relationship`}
                                                                    label="Household Member's Relationship"
                                                                    placeholder="Household Member's Relationship"
                                                                    options={householdRelationOptions}
                                                                    component={SelectField}
                                                                />
                                                            </Col>
                                                            
                                                        </Row>
                                                    ))
                                                   
                                                ) }
                                                <Row>
                                                        <Col md={12}>
                                                            <AddContactButton onClick={() => arrayHelpers.push({relationship: "", name:""})}>
                                                                <AddCircle/>  <span>Add a household member</span>
                                                            </AddContactButton>
                                                        </Col>
                                                        
                                                    </Row>
                                            </div>
                                        )}
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
                                <FormDisclaimer>Address will not be saved, we will use for census tract.</FormDisclaimer>

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

                            <Row bsPrefix={"row align-items-center"}>
                                <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                    <FormIcon icon={<Accessibility/>}/>
                                </Col>
                                <Col lg={3} md={12}>
                                      <Field 
                                        id="sexualOrientation"
                                        label={"Sexual Orientation"} 
                                        name={"sexualOrientation"}
                                        placeholderOption="-- Select --"
                                        options={sexualOrientationOptions}
                                        component={SelectField}
                                    />
                                </Col>
                                <Col lg={4} md={12}>
                                      <Field 
                                        id="genderIdentity"
                                        label={"Gender Identity"} 
                                        name={"genderIdentity"}
                                        placeholderOption="-- Select --"
                                        options={genderIdentityOptions}
                                        component={SelectField}
                                    />
                                </Col>
                                <Col lg={4} md={12}>
                                      <Field 
                                        id="raceEthnicity"
                                        label={"Race / Ethnicity"} 
                                        name={"raceEthnicity"}
                                        placeholderOption="-- Select --"
                                        options={raceEthnicityOptions}
                                        component={SelectField}
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