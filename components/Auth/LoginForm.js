import { Mutation, withApollo } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Link from 'next/link';

import { TextField, SubmitButton, FormError } from '../Util/Forms';
import { Box } from '../Util/Layout';
import { LoadingBar } from '../Util/Loading'; 
import { FormTitle, BlockAnchor } from '../Util/Typography';
import { Row, Col } from '../Util/Grid';
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import redirect from '../../lib/redirect'

export const LOGIN_MUTATION = gql`
mutation requestLogin($email: String!, $nextPage: String) {
    requestLogin(email: $email, nextPage: $nextPage) {
      code
      success
      message
      securityCode
    }
  }
`;
const LoginForm = (props) => {
    return(
        <Mutation mutation={LOGIN_MUTATION}>
            {(mutation, { data, loading, error }) => (
                <Formik
                    initialValues={{email:""}}
                    validationSchema={Yup.object().shape({email:Yup.string().email('Valid Email Required').required('Valid Email Required')})}
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            email: values.email,
                        }
                        let response = await submitMutation( mutation, payload);
                        let result = await marshallMutationResponse(response, 'requestLogin');
                        
                        if(!result.success){
                            actions.setStatus({
                                form: {
                                    code: result.code,
                                    message: result.message,
                                }
                            })
                            return;
                        }
                        redirect({}, `/check-email?code=${response.data.requestLogin.securityCode || null}`)                        
                    }}
                    render={({status, error}) => (
                        
                        <Form noValidate>
                            <Box>
                                <FormTitle>Login</FormTitle>
                                <LoadingBar active={loading}/>
                                    {
                                        status && status.form && <FormError error={status.form}/>
                                    }

                                <Field id="email" name="email" label={"Email"}component={TextField}/>
                          
                                <Row classNames="align-items-center">
                                    <Col classNames="col">
                                        <SubmitButton 
                                            loading={loading}
                                            value="Login"
                                        />
                                    </Col>
                                    <Col classNames="col">                                
                                        <Link href="/register"><BlockAnchor>Need to register?</BlockAnchor></Link>
                                    </Col>

                                </Row>
                            </Box>
                        </Form>
                    )}
                />
            )}
            
        </Mutation>
    )
}

export default LoginForm;