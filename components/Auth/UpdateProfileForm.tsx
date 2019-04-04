import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { UpdateMeComponent } from "../../generated/apolloComponents";
import { TextField } from '../Util/Forms/TextField';
import SubmitButton from '../Util/Forms/SubmitButton';
import { submitMutation, destructResponse } from "../../lib/apolloHelpers";
import { FormError } from '../Util/Forms/FormError';
import { FormSuccess } from '../Util/Forms/FormSuccess';
import { LoadingBar } from '../Util/Loading/LoadingBar';
import { CURRENT_USER_QUERY } from "../../graphql/server/user/queries/me";

export default ({currentUser}) => {
    return(
        <UpdateMeComponent
            refetchQueries={[{query: CURRENT_USER_QUERY}]}
        >
            {(mutation, { data, loading, error}) => (
                <Formik 
                initialValues={{ 
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    address: currentUser.address,
                    city: currentUser.city,
                    state: currentUser.state,
                    zip5: currentUser.zip5,
                    phone: currentUser.phone,
                }}
                validationSchema={
                    Yup.object().shape({
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
                    const result = await destructResponse(response, 'updateUser');
                    if(!result.success){
                        actions.setStatus({
                            form: {
                                code: result.code,
                                message: result.message,
                            }
                        })
                        return;
                    }
                    actions.setStatus({
                        form: {
                            code: "Success",
                            message: "Profile Updated"
                        }
                    })

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
                                    value="Update"
                                />
                                
                                </div>
                            </div>
                           

                        </fieldset>
                    </Form>
                )}
                />
            )}
        </UpdateMeComponent>
    )
}