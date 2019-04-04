import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CreateTeamAdminComponent } from '../../generated/apolloComponents';
import { AdminPaths } from '../../paths/index';
import { submitMutation, destructResponse } from '../../lib/apolloHelpers';
import { LoadingBar } from '../Util/Loading/LoadingBar';
import { FormError } from '../Util/Forms/FormError';
import { FormSuccess } from '../Util/Forms/FormSuccess';
import { TextField } from '../Util/Forms/TextField';
import SubmitButton from '../Util/Forms/SubmitButton';
import { TextAreaField } from '../Util/Forms/TextAreaField';
import { GET_TEAMS_ADMIN_QUERY } from '../../graphql/server/teams/queries/getTeamsAdmin';


export const CreateTeamForm = ({routeResponse}) => {
    return(
        <CreateTeamAdminComponent
            refetchQueries={[{query: GET_TEAMS_ADMIN_QUERY}]}

        >
            {(mutation, { data, loading, error}) => (
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                    }}
                    validationSchema={
                        Yup.object().shape({
                            name: Yup.string().required('I need a name'),
                            description: Yup.string().required("Give me a brief description")
                        })
                    }
                    onSubmit={ async (values, actions) => {
                        let payload = {
                            input: {
                                name: values.name,
                                description: values.description,
                            }
                        };
                        let response = await submitMutation(mutation, payload);
                        const result = await destructResponse(response, 'createTeam');

                        if(!result.success){
                            actions.setStatus({
                                form:{
                                    code: result.code,
                                    message: result.message
                                }
                            });
                            return;
                        }
                        routeResponse(`${AdminPaths.teams.detail}/${result.item.slug}`);
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
                                    <div className="col-md-12">
                                        <Field
                                            id="name"
                                            name="name"
                                            label="Team Name"
                                            placeholder="Team Name"
                                            component={TextField}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <Field
                                            id="description"
                                            name="description"
                                            label="Team Description"
                                            placeholder="Team Description"
                                            component={TextAreaField}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <SubmitButton 
                                            loading={loading}
                                            value="Create Team"
                                        />
                                    </div>
                                </div>


                            </fieldset>
                        </Form>
                    )}

                
                />
            )}
        </CreateTeamAdminComponent>
    )
}