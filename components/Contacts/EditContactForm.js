import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { H4,FormDisclaimer } from '../Util/Typography';
import { FormError,TextField,PhoneField,SubmitButton, FormIcon, CheckBox,DirtyFormMessage, SelectField, AddContactButton, RemoveContactButton } from '../Util/Forms';
import { CheckBoxGroupContainer, DynamicCheckboxLabel } from '../Util/Forms/Styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import _ from 'lodash';

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

const getOtherValue = (options, value) => {
    if(value === '' || !value){
        return '';
    }
    const inOptionsList = _.find(options, (o) => { return o.value == value});

    if(inOptionsList){
        return value
    }

    return 'OTHER'
}

const extractAdditionalRaceEthnicity = (values) => {
    const optionsArray = ['AMERICAN INDIAN OR ALASKA NATIVE', 'ASIAN', 'BLACK OR AFRICAN AMERICAN', 'HISPANIC', 'LATINO', 'NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER', 'WHITE']
    if(values){
        const extraArray = values.filter(e => !optionsArray.includes(e));
        return extraArray.join(', ');
    }
    return [];
}

const cleanRaceEthnicityArray = (values) => {
    const optionsArray = ['AMERICAN INDIAN OR ALASKA NATIVE', 'ASIAN', 'BLACK OR AFRICAN AMERICAN', 'HISPANIC', 'LATINO', 'NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER', 'WHITE']
    if(values){
        const cleanArray = values.filter(e => optionsArray.includes(e));
        return cleanArray;
    }
    return [];
}

export const EditContactForm = (props) => {
    let {target} = props;
    const sexualOrientationOptions = [
        {
            value: "CHOOSE NOT TO IDENTIFY",
            label: "Choose Not To Identify"
        },
        {
            value: 'STRAIGHT',
            label: 'Straight'
        },
        {
            value: "GAY",
            label: "Gay"
        },
        {
            value: "BISEXUAL",
            label: "Bisexual"
        },
        {
            value: "ASEXUAL",
            label: "Asexual"
        },
        {
            value: "QUEER",
            label: "Queer"
        },
        {
            value: "OTHER",
            label: "Other"
        }
    ]

    const genderIdentityOptions = [
        {
            value: "CHOOSE NOT TO IDENTIFY",
            label: "Choose Not To Identify"
        },
        {
            value: "WOMAN",
            label: "Woman"
        },
        {
            value: "MAN",
            label: "Man"
        },
        {
            value: "TRANSGENDER",
            label: "Transgender"
        },
        {
            value: "CIS MAN",
            label: "Cis Man"
        },
        {
            value: "CIS WOMAN",
            label: "Cis Woman"
        },
        {
            value: "GENDER NONCONFORMING",
            label: "Gender Non Conforming"
        },
        {
            value: "TRANS MAN",
            label: "Trans Man"
        },
        {
            value: "TRANS WOMAN",
            label: "Trans Woman"
        },
        {
            value: "OTHER",
            label: "Other"
        }
     
    ]

    const raceEthnicityOptions = [
        {
            value: "AMERICAN INDIAN OR ALASKA NATIVE",
            label: "American Indian or Alaska Native"
        },
        {
            value: 'ASIAN',
            label: 'Asian'
        },
        {
            value: "BLACK OR AFRICAN AMERICAN",
            label: "Black or African American"
        },
        {
            value: "HISPANIC",
            label: "Hispanic"
        },
        {
            value: "LATINO",
            label: "Latino"
        },
        {
            value: "NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER",
            label: "Native Hawaiin or Other Pacific Islander"
        },
        {
            value: "WHITE",
            label: "White"
        }
     
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

    const raceEthnicity = cleanRaceEthnicityArray(target.raceEthnicity);
    const genderIdentity = getOtherValue(genderIdentityOptions, target.genderIdentity);
    const sexualOrientation = getOtherValue(sexualOrientationOptions, target.sexualOrientation);
    const additionalRaceEthnicityArray = extractAdditionalRaceEthnicity(target.raceEthnicity);
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
                            tempGenderIdentity: genderIdentity,
                            genderIdentity: target.genderIdentity,
                            tempSexualOrientation: sexualOrientation,
                            sexualOrientation: target.sexualOrientation,
                            raceEthnicity: raceEthnicity,
                            additionalRaceEthnicity: additionalRaceEthnicityArray,
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
                        let raceE = values.raceEthnicity;
                        if(values.additionalRaceEthnicity && values.additionalRaceEthnicity.length > 0){
                            raceE.push(values.additionalRaceEthnicity);
                        }
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
                                phone: values.phone.replace(/\D/g,''),
                                twitterHandle: values.twitterHandle,
                                facebookProfile: values.facebookProfile,
                                householdSize: values.householdSize,
                                retainAddress: values.retainAddress,
                                isNameAlias: values.isNameAlias,
                                genderIdentity: values.genderIdentity,
                                sexualOrientation: values.sexualOrientation,
                                raceEthnicity: raceE,
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
                                tempGenderIdentity: getOtherValue(genderIdentityOptions, result.item.genderIdentity),
                                genderIdentity: result.item.genderIdentity,
                                tempSexualOrientation: getOtherValue(sexualOrientationOptions, result.item.sexualOrientation),
                                sexualOrientation: result.item.sexualOrientation,
                                raceEthnicity: cleanRaceEthnicityArray(result.item.raceEthnicity),
                                additionalRaceEthnicity: extractAdditionalRaceEthnicity(result.item.raceEthnicity),
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
                                        component={PhoneField}
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
                                <Col lg={5} md={12}>
                                      <Field 
                                        id="tempSexualOrientation"
                                        label={"Sexual Orientation"} 
                                        name={"tempSexualOrientation"}
                                        placeholderOption="-- Select --"
                                        onChange={(e) => {
                                            props.setFieldValue('tempSexualOrientation', e.target.value);
                                            if(e.target.value !== 'OTHER'){
                                                props.setFieldValue('sexualOrientation', e.target.value);
                                            } else {
                                                props.setFieldValue('sexualOrientation', '');
                                            }
                                        }}
                                        options={sexualOrientationOptions}
                                        component={SelectField}
                                    />
                                 
                                </Col>
                             
                                <Col lg={5} md={12}>
                                 <Field 
                                        id="sexualOrientation"
                                        label={"Please Specify: Sexual Orientation"}
                                        name={"sexualOrientation"}
                                        component={TextField}
                                        hidden={props.values.tempSexualOrientation !== 'OTHER' ? 1 : 0}
                                    />

                                </Col>

                            </Row>
                            <Row bsPrefix={"row align-items-center"}>
                                <Col bsPrefix={"col-lg-1 d-none d-lg-block"}></Col>
                                    <Col lg={5} md={12}>
                                    <Field 
                                            id="tempGenderIdentity"
                                            label={"Gender Identity"} 
                                            name={"tempGenderIdentity"}
                                            placeholderOption="-- Select --"
                                            onChange={(e) => {
                                                props.setFieldValue('tempGenderIdentity', e.target.value);
                                                if(e.target.value !== 'OTHER'){
                                                    props.setFieldValue('genderIdentity', e.target.value);
                                                } else {
                                                    props.setFieldValue('genderIdentity', '');
                                                }
                                            }}
                                            options={genderIdentityOptions}
                                            component={SelectField}
                                        />
                                    </Col>
                                    <Col lg={6} md={12}>
                                      <Field 
                                        id="genderIdentity"
                                        label={"Please Specify: Gender Identity"}
                                        name={"genderIdentity"}
                                        component={TextField}
                                        hidden={props.values.tempGenderIdentity !== 'OTHER' ? 1 : 0}

                                    />
                                    </Col>
                            </Row>
                            <Row bsPrefix={"row align-items-center"}>
                            <Col bsPrefix={'col-lg-1 d-none d-lg-block'}>
                                </Col>
                            <Col lg={11} md={12}>
                                <FieldArray
                                    name={"raceEthnicity"}
                                    render={arrayHelpers => {
                                        return(
                                            <CheckBoxGroupContainer>
                                                <fieldset>
                                                    <legend>Race / Ethnicity <small> (check all that apply) </small></legend>
                                                    {raceEthnicityOptions.map((option, idx) => {
                                                        return(
                                                            <DynamicCheckboxLabel key={idx}>
                                                            <input
                                                                name={"raceEthnicity"}
                                                                type="checkbox"
                                                                checked={props.values.raceEthnicity.includes(option.value)}
                                                                onChange={e=> {
                                                                    if(e.target.checked){
                                                                        arrayHelpers.push(option.value)
                                                                    } else {
                                                                        const idx = props.values.raceEthnicity.indexOf(option.value);
                                                                        arrayHelpers.remove(idx);
                                                                    }
                                                                }}
                                                                />
                                                            <span>{option.label}</span>
            
                                                        </DynamicCheckboxLabel>
                                                        )
                                                    })}
                                                </fieldset>
                                            </CheckBoxGroupContainer>
                                        )
                                    }}
                                />
                                    <Field 
                                        id="additionalRaceEthnicity"
                                        label={"Please Specify: Race/Ethnicity"}
                                        name={"additionalRaceEthnicity"}
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