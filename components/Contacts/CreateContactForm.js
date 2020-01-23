import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { FormError, FormSuccess,TextField,SubmitButton, CheckBoxArrayField, FormIcon, CheckBox, PhoneField, SelectField, AddContactButton, RemoveContactButton } from '../Util/Forms';
import { LoadingBar } from '../Util/Loading';
import { H2, H3, H4, FormDisclaimer } from '../Util/Typography';
import redirect from '../../lib/redirect'
import { DashPaths } from '../../paths';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import Place from '@material-ui/icons/Place';
import Phone from '@material-ui/icons/Phone';
import Home from '@material-ui/icons/Home';
import Accessibility from '@material-ui/icons/Accessibility';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { CheckBoxGroupContainer, DynamicCheckboxLabel } from '../Util/Forms/Styles';

import { sexualOrientationOptions, genderIdentityOptions, raceEthnicityOptions,householdRelationOptions, cleanRaceEthnicityArray, extractAdditionalRaceEthnicity } from './Options';


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
    const raceEthnicity = cleanRaceEthnicityArray([]);
    const additionalRaceEthnicityArray = extractAdditionalRaceEthnicity([]);

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
                            retainAddress: true,
                            isNameAlias: false,
                            isPhoneMobile: true,
                            householdMembers: [],
                            sexualOrientation: '',
                            tempSexualOrientation: '',
                            genderIdentity: '',
                            tempGenderIdentity: '',
                            raceEthnicity: raceEthnicity,
                            additionalRaceEthnicity: additionalRaceEthnicityArray,
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
                                isPhoneMobile: values.isPhoneMobile,
                                teamId: team.id,
                                householdMembers: values.householdMembers,
                                sexualOrientation: values.sexualOrientation,
                                genderIdentity: values.genderIdentity,
                                raceEthnicity: raceE,

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
                       
                        redirect({}, `${DashPaths.contacts.detail}?team=${team.id}&target=${result.item.id}`)                        

                    }}
                    render={props => (
                        <Form noValidate>
                            <LoadingBar active={loading}/>
                            {
                                props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                            }
                            {
                                props.status && props.status.form && props.status.form.code === 'Success' && <FormSuccess message={props.status.form}/>
                            }
                            <H2>General Information</H2>
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
                                <Col lg={6} md={12}>
                                    <Field
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        placeholder="Phone"
                                        component={PhoneField}
                                    />
                                </Col>
                                <Col lg={5} md={12}>
                                      <FormDisclaimer>This is a mobile phone.</FormDisclaimer>
                                    <Field
                                        id="isPhoneMobile"
                                        name="isPhoneMobile"
                                        label="Mobile Phone"
                                        component={CheckBox}
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
                                    value={loading ? "Creating" : "Create"}

                                />
                        



                        </Form>
                    )}
                />
            )}
        </Mutation>
    )
}