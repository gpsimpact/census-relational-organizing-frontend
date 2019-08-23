import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { FormError, FormSuccess,TextField,SubmitButton, TextAreaField } from '../Util/Forms';
import { LoadingBar } from '../Util/Loading';
import redirect from '../../lib/redirect'
import { DashPaths } from '../../paths';


export const UPDATE_TEAM_ADMIN_MUTATION = gql`
    mutation updateTeamAdmin($id: String!, $input: UpdateTeamInput!){
        updateTeam(id: $id, input: $input){
            code
            success
            message
            item {
                id
                name
                slug
                description
            }
        }
    }
`;


export const AdminEditTeamForm = (props) => {
    const { team } = props;

    return(
        <Mutation mutation={UPDATE_TEAM_ADMIN_MUTATION}>
            {(mutation, { data, loading, error}) => (
                <Formik 
                    initialValues={{name:team.name ? team.name : "",description:team.description ? team.description: ""}}
                    validationSchema={
                        Yup.object().shape({
                            name: Yup.string().required('I need a name'),
                            description: Yup.string().required("Give me a brief description")
                        })
                    }
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            id: team.id,
                            input: {
                                name: values.name,
                                description: values.description,
                            }
                        };
                        let response = await submitMutation(mutation, payload);
                        const result = await marshallMutationResponse(response, 'updateTeam');

                        if(!result.success){
                            actions.setStatus({
                                form:{
                                    code: result.code,
                                    message: result.message
                                }
                            });
                            return;
                        }
                        actions.setStatus({
                            form: {
                                code: "Success",
                                message: "Team Updated"
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
                                <Field
                                    id="name"
                                    name="name"
                                    label="Team Name"
                                    placeholder="Team Name"
                                    component={TextField}
                                />
                                <Field
                                    id="description"
                                    name="description"
                                    label="Team Description"
                                    placeholder="Team Description"
                                    component={TextAreaField}
                                />
                                <SubmitButton 
                                    loading={loading}
                                    value="Edit Team"
                                />
                        </Form>
                    )}
                />
            )}
        
        </Mutation>
    )
}