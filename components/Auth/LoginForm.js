import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Link from 'next/link';

import { H2, BlockAnchor, SecondaryButton, PrimaryButton } from '../Util/Typography';
import { LoadingBar } from '../Util/Loading';
import { TextField, SubmitButton, FormError } from '../Util/Forms';
import { Box } from '../Util/Layout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import redirect from '../../lib/redirect'
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';


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



export const LoginForm = (props) => {
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
                                <H2 uppercase black>Login</H2>
                                <LoadingBar active={loading}/>
                                    {
                                        status && status.form && <FormError error={status.form}/>
                                    }

                                <Field id="email" name="email" label={"Email"}component={TextField}/>
                          
                                <Row>
                                    <Col>
                                    
                                        <PrimaryButton
                                            type="submit" 
                                            loading={loading}
                                            full
                                            small
                                        >
                                            {loading ? "Logging In" : "Login"}
                                            </PrimaryButton>
                                       </Col>
                                       <Col>                           
                                        <Link href="/register"><SecondaryButton full small>Register</SecondaryButton></Link>
                                    
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