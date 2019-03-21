import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { RegisterComponent, RequestLoginComponent } from "../../generated/apolloComponents";
import { TextField } from '../Util/Forms/TextField';
import SubmitButton from '../Util/Forms/SubmitButton';
import { submitMutation, destructResponse } from "../../lib/apolloHelpers";
import { FormError } from '../Util/Forms/FormError';
import { LoadingBar } from '../Util/Loading/LoadingBar';

export default ({routeResponse}) => {
    return(
        <RequestLoginComponent>
            {(mutation, { data, loading, error}) => (
                <Formik 
                initialValues={{ 
                    email:"",
                }}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string().email('Valid Email Required').required('Valid Email Required'),
                 
                    })
                }
                onSubmit={ async (values, actions) => {
                    let payload = {
                            email: values.email,
                    
                    }
                    let response = await submitMutation(mutation, payload);
                    const result = await destructResponse(response, 'requestLogin');
                    if(!result.success){
                        actions.setStatus({
                            form: {
                                code: result.code,
                                message: result.message,
                            }
                        })
                        return;
                    }
                    routeResponse(`/check-email?code=${response.data.requestLogin.securityCode || null}`);
                }}
                render={({status}) => (
                    <Form noValidate>
                       <LoadingBar active={loading}/>
                        {
                            status && status.form && <FormError error={status.form}/>
                        }

                        <fieldset>


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
                                <SubmitButton 
                                    loading={loading}
                                    value="Login"
                                />
                                
                                </div>
                            </div>
                           

                        </fieldset>
                    </Form>
                )}
                />
            )}
        </RequestLoginComponent>
    )
}