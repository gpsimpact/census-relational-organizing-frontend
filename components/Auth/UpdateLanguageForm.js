import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { TextField, SubmitButton, FormError, FormSuccess, SelectField } from '../Util/Forms';
import { Box } from '../Util/Layout';
import { LoadingBar } from '../Util/Loading'; 
import { CURRENT_USER_QUERY } from '../Queries/Me';
import { H1 } from '../Util/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Router from 'next/router'



export const UpdateLanguageForm = ({currentUser}) => {
    const { t } = useTranslation();
    const languageOptions = [
        {
            value: "en",
            label: "English"
        },
        {
            value: 'es',
            label: 'Español'
        },
    ];
    const cookies = parseCookies();
    const lang = cookies && cookies['next-i18next'] ? cookies['next-i18next'] : 'en';

    return(
        <Formik 
            initialValues={{ 
                language: lang,
            }}
            onSubmit={ async (values, actions) => {
                setCookie({}, 'next-i18next', values.language, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                actions.setStatus({
                    form: {
                        code: 'Success',
                        message: t('LANGUAGE UPDATED')
                    }
                });

                window.location.href = window.location.href
            }}
            render={({status}) => (
                <Form noValidate className="py-5">
                <Box>
                    <H1> {t('PREFERRED LANGUAGE')} </H1>
                    <LoadingBar active={false}/>
                        {
                            status && status.form && status.form.code != 'Success' && <FormError error={status.form}/>
                        }
                        {
                            status && status.form && status.form.code === 'Success' && <FormSuccess message={status.form}/>
                        }
                    <fieldset>
                    <Row>
                        <Col>
                            <Field
                                id={'language'}
                                name={'language'}
                                label={t('PREFERRED LANGUAGE')}
                                placeholder={t('PREFERRED LANGUAGE')}
                                options={languageOptions}
                                component={SelectField}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <SubmitButton 
                            loading={false}
                            value={t('UPDATE')}
                        />
                        </Col>
                    </Row>
                    </fieldset>
                </Box>
            </Form>
            )}
            
            />
      
    )
}