import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
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
                                <H2 uppercase black>{t('LOGIN')}</H2>
                                <LoadingBar active={loading}/>
                                    {
                                        status && status.form && <FormError error={status.form}/>
                                    }

                                <Field 
                                id="email" 
                                name="email" 
                                label={t('EMAIL')}
                                component={TextField}
                                />
                          
                                <Row>
                                    <Col>
                                    
                                        <PrimaryButton
                                            type="submit" 
                                            full
                                            small
                                        >
                                            {loading ? t("LOGGING IN") : t('LOGIN')}
                                            </PrimaryButton>
                                       </Col>
                                       <Col> 
                                       <br/>                          
                                        <Link href="/register"><SecondaryButton full small>{t('NEED TO REGISTER?')}</SecondaryButton></Link>
                                    
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