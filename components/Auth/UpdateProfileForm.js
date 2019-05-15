import { Mutation, withApollo } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

import { TextField, SubmitButton, FormError, FormSuccess } from '../Util/Forms';
import { Box } from '../Util/Layout';
import { LoadingBar } from '../Util/Loading'; 
import { FormTitle, BlockAnchor } from '../Util/Typography';
import { Row, Col } from '../Util/Grid';
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { CURRENT_USER_QUERY } from '../QueryComponents/Me';


export const UPDATE_ME_MUTATION = gql`
mutation updateMe($input: UpdateUserInput!) {
  updateUser(input: $input) {
    code
    success
    message
    item {
        id
        firstName
        email
    }
  }
}
`;

export const UpdateProfileForm = ({currentUser}) => {
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
                <Form noValidate>
                <Box>
                    <FormTitle> Profile </FormTitle>
                    <LoadingBar active={loading}/>
                        {
                            status && status.form && status.form.code != 'Success' && <FormError error={status.form}/>
                        }
                        {
                            status && status.form && status.form.code === 'Success' && <FormSuccess message={status.form}/>
                        }
                    <fieldset>
                    <Row>
                        <Col classNames={'col-md-6'}>
                            <Field
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                placeholder="First Name"
                                component={TextField}
                            />
                        </Col>
                        <Col classNames={'col-md-6'}>
                            <Field
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    component={TextField}
                                />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Field
                                id="address"
                                name="address"
                                label="Address"
                                placeholder="Address"
                                component={TextField}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col classNames={'col-md-5'}>
                        <Field
                                id="city"
                                name="city"
                                label="City"
                                placeholder="City"
                                component={TextField}
                            />
                        </Col>

                        <Col classNames={'col-md-3'}>
                        <Field
                                id="state"
                                name="state"
                                label="State"
                                placeholder="State"
                                component={TextField}
                            />
                        </Col>

                        <Col classNames={'col-md-4'}>
                        <Field
                                id="zip5"
                                name="zip5"
                                label="Zip Code"
                                placeholder="Zip Code"
                                component={TextField}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <Field
                                id="phone"
                                name="phone"
                                label="Phone"
                                placeholder="Phone"
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