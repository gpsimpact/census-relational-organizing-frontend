import { Mutation, withApollo } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { TextField, SubmitButton, FormError } from '../Util/Forms';
import { Box } from '../Util/Layout';
import { LoadingBar } from '../Util/Loading'; 
import { H1 } from '../Util/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import redirect from '../../lib/redirect'

export const REGISTER_MUTATION = gql`
    mutation register($input: RegisterInput!){
        register(input: $input){
            code
            success
            message
            securityCode
        }
    }  
`;
export const RegisterForm = ({teamSlug}) => {
    const { t } = useTranslation();
    return(
        <Mutation mutation={REGISTER_MUTATION}>
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
                    if(teamSlug) {
                        payload.input.teamSlug = teamSlug;
                    }
                    let response = await submitMutation( mutation, payload);
                    let result = await marshallMutationResponse(response, 'register');
                    if(!result.success){
                        actions.setStatus({
                            form: {
                                code: result.code,
                                message: result.message,
                            }
                        })
                        return;
                    }
                    redirect({}, `/check-email?code=${response.data.register.securityCode || null}`)  
                }}
                render={({status}) => (
                    <Form noValidate>
                        <Box>
                            <H1> Register </H1>
                            <LoadingBar active={loading}/>
                            {
                                status && status.form && <FormError error={status.form}/>
                            }
                            <fieldset>
                            <Row>
                                <Col bsPrefix={'col-md-6'}>
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        label={t('FIRST_NAME')}
                                        placeholder={t('FIRST_NAME')}
                                        component={TextField}
                                    />
                                </Col>
                                <Col bsPrefix={'col-md-6'}>
                                    <Field
                                            id="lastName"
                                            name="lastName"
                                            label={t('LAST_NAME(S)')}
                                            placeholder={t('LAST_NAME(S)')}
                                            component={TextField}
                                        />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                <Field
                                        id="email"
                                        name="email"
                                        label={t('EMAIL')}
                                        placeholder={t('EMAIL')}
                                        component={TextField}
                                    />
                                </Col>
                            </Row>



                            <Row>
                                <Col>
                                    <Field
                                        id="address"
                                        name="address"
                                        label={t('ADDRESS')}
                                        placeholder={t('ADDRESS')}
                                        component={TextField}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col bsPrefix={'col-md-5'}>
                                <Field
                                        id="city"
                                        name="city"
                                        label={t('CITY')}
                                        placeholder={t('CITY')}
                                        component={TextField}
                                    />
                                </Col>

                                <Col bsPrefix={'col-md-3'}>
                                <Field
                                        id="state"
                                        name="state"
                                        label={t('STATE')}
                                        placeholder={t('STATE')}
                                        component={TextField}
                                    />
                                </Col>

                                <Col bsPrefix={'col-md-4'}>
                                <Field
                                        id="zip5"
                                        name="zip5"
                                        label={t('ZIP_CODE')}
                                        placeholder={t('ZIP_CODE')}
                                        component={TextField}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                <Field
                                        id="phone"
                                        name="phone"
                                        label={t('PHONE')}
                                        placeholder={t('PHONE')}
                                        component={TextField}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                <SubmitButton 
                                    loading={loading}
                                    value="Register"
                                />
                                </Col>
                            </Row>
                            </fieldset>
                        </Box>
                    </Form>
                )}
            
            />
        )}
        </Mutation>
    )
}