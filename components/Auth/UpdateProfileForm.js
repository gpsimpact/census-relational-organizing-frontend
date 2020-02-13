import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { TextField, SubmitButton, FormError, FormSuccess } from '../Util/Forms';
import { Box } from '../Util/Layout';
import { LoadingBar } from '../Util/Loading'; 
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { CURRENT_USER_QUERY } from '../Queries/Me';
import { H1 } from '../Util/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const UPDATE_ME_MUTATION = gql`
mutation updateMe($input: UpdateUserInput!) {
  updateUser(input: $input) {
    code
    success
    message
    item {
        id
        email
    }
  }
}
`;

export const UpdateProfileForm = ({currentUser}) => {
    const { t } = useTranslation();

    return(
        <Mutation mutation={UPDATE_ME_MUTATION} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
        {(mutation, {data, loading, error}) => (
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
                let response = await submitMutation( mutation, payload);
                let result = await marshallMutationResponse(response, 'updateUser');
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
                <Form noValidate className="py-5">
                <Box>
                    <H1> {t('PROFILE')} </H1>
                    <LoadingBar active={loading}/>
                        {
                            status && status.form && status.form.code != 'Success' && <FormError error={status.form}/>
                        }
                        {
                            status && status.form && status.form.code === 'Success' && <FormSuccess message={status.form}/>
                        }
                    <fieldset>
                    <Row>
                        <Col md={6}>
                            <Field
                                id="firstName"
                                name="firstName"
                                label={t('FIRST_NAME')}
                                placeholder={t('FIRST_NAME')}
                                component={TextField}
                            />
                        </Col>
                        <Col md={6}>
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
                                id="address"
                                name="address"
                                label={t('ADDRESS')}                                
                                placeholder={t('ADDRESS')}                                
                                component={TextField}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}>
                        <Field
                                id="city"
                                name="city"
                                label={t('CITY')}
                                placeholder={t('CITY')}
                                component={TextField}
                            />
                        </Col>

                        <Col md={4}>
                        <Field
                                id="state"
                                name="state"
                                label={t('STATE')}
                                placeholder={t('STATE')}
                                component={TextField}
                            />
                        </Col>

                        <Col md={3}>
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
                            value="Update"
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