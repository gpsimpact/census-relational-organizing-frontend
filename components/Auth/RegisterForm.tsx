import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { RegisterComponent } from "../../generated/apolloComponents";
import { TextField } from '../Util/Forms/TextField';
import SubmitButton from '../Util/Forms/SubmitButton';
import { submitMutation, destructResponse } from "../../lib/apolloHelpers";
import { FormError } from '../Util/Forms/FormError';
import { LoadingBar } from '../Util/Loading/LoadingBar';

export default ({routeResponse}) => {
    return(
        <RegisterComponent>
            {(mutation, { data, loading, error}) => (
                <Formik 
                initialValues={{ 
                    email:"",
                    firstName: "",
                    lastName: "",
                    address: "",
                    city: "",
                    state: "",
                    zip5: "",
                    phone: "",
                }}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string().email('Valid Email Required').required('Valid Email Required'),
                        firstName: Yup.string().required(),
                        lastName: Yup.string().required(),
                        address: Yup.string().required(),
                        city: Yup.string().required(),
                        state: Yup.string().required(),
                        zip5: Yup.string().required(),
                        phone: Yup.string().required(),
                    })
                }
                onSubmit={ async (values, actions) => {
                    let payload = {
                        input: {
                            email: values.email,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            address: values.address,
                            city: values.city,
                            state: values.state,
                            zip5: values.zip5,
                            phone: values.phone,
                        }
                    }
                    let response = await submitMutation(mutation, payload);
                    const result = await destructResponse(response, 'register');
                    if(!result.success){
                        actions.setStatus({
                            form: {
                                code: result.code,
                                message: result.message,
                            }
                        })
                        return;
                    }
                    routeResponse(`/check-email?code=${response.data.register.securityCode || null}`);
                }}
                render={({status}) => (
                    <Form noValidate>
                        <LoadingBar active={loading}/>

                        {
                            status && status.form && <FormError error={status.form}/>
                        }

                        <fieldset>

                        <div className="row">
                                <div className="col-md-6">
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        placeholder="First Name"
                                        component={TextField}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        component={TextField}
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <Field
                                        id="email"
                                        name="email"
                                        label="Email"
                                        placeholder="email"
                                        component={TextField}
                                    />
                                </div>
                            </div>

                        

                            <div className="row">
                                <div className="col-md-12">
                                    <Field
                                        id="address"
                                        name="address"
                                        label="Address"
                                        placeholder="Address"
                                        component={TextField}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-5">
                                    <Field
                                        id="city"
                                        name="city"
                                        label="City"
                                        placeholder="City"
                                        component={TextField}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Field
                                        id="state"
                                        name="state"
                                        label="State"
                                        placeholder="State"
                                        component={TextField}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <Field
                                        id="zip5"
                                        name="zip5"
                                        label="Zip Code"
                                        placeholder="Zip Code"
                                        component={TextField}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <Field
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        placeholder="Phone"
                                        component={TextField}
                                    />
                                </div>
                        
                            </div>

                            
                            <div className="row">
                                <div className="col-md-12">
                                <SubmitButton 
                                    loading={loading}
                                    value="Register"
                                />
                                
                                </div>
                            </div>
                           

                        </fieldset>
                    </Form>
                )}
                />
            )}
        </RegisterComponent>
    )
}