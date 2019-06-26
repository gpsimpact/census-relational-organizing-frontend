import React from "react";
import _ from "lodash";
import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";

import { SelectField, SubmitButton, DirtyFormMessage } from '../Util/Forms';

import { Card, CardHeader, CardInner, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import { Row, Col } from '../Util/Grid';
import { DashPaths } from '../../paths';
import { CardInfoPoint } from './CardInfoPoint';
import { LoadingBar } from '../Util/Loading'; 
import { FormTitle } from '../Util/Typography';
import { submitMutation, marshallMutationResponse } from "../../lib/helpers";

export const TOGGLE_TEAM_PERMISSION = gql`
    mutation toggleTeamPermission($input:ToggleTeamPermissionInput!){
        toggleTeamPermission(input:$input){
            code
            success
            message
        }
    }
`;
export const TeamVolCard = (props) => {
    if(!props.vol || !props.team){
        return null;
    }
    const { vol, team } = props;
    //find team perm
    const teamPerms = _.find(vol.teamPermissions, {team:{id:props.team.id}});
    let currentPerm = teamPerms.permissions[0];


    
    const permissionOptions = [
        {
            value: 'APPLICANT',
            label: 'APPLICANT'
        },
        {
            value: 'MEMBER',
            label: 'MEMBER',
        },
        {
            value: 'ADMIN',
            label: 'ADMINISTRATOR'
        }
    ]


    return(

                <Mutation mutation={TOGGLE_TEAM_PERMISSION}>
                    {(mutation, {data, loading, error}) => (
        <Card>
            <CardInner>
                <CardTitle>{vol.firstName} {vol.lastName}</CardTitle>
                <LoadingBar active={loading}/>
                <CardInfoPoint icon={'fas fa-phone'} infoPoint={vol.phone}/>
                <CardInfoPoint icon={'far fa-envelope'} infoPoint={vol.email}/>
                <CardInfoPoint icon={'fas fa-map-marker-alt'} infoPoint={`${vol.address}`} infoPoint2={`${vol.city}, ${vol.state} ${vol.zip5}`}/>
                        <Formik 
                            initialValues={{
                                permission: currentPerm,
                            }}
                            onSubmit={async (values, actions) => {
                                let payload ={
                                    input: {
                                        userId: vol.id,
                                        teamId: team.id,
                                        permission: values.permission,
                                    }
                                }
                                let response = await submitMutation(mutation, payload);
                                const result = await marshallMutationResponse(response, 'toggleTeamPermission');

                                if(!result.success){
                                    actions.setStatus({
                                        form:{
                                            code: result.code,
                                            message: result.message
                                        }
                                    });
                                    return;
                                }
                            }}
                            render={props => (
                                <Form noValidate>
                                    <Field 
                                        id="permission"
                                        label={"Team Permission"} 
                                        name={"permission"}
                                        placeholderOption="-- Select --"
                                        options={permissionOptions}
                                        component={SelectField}
                                    />
                                      <SubmitButton 
                                        loading={loading}
                                    value={loading ? "Saving" : "Save"}
                                />

                        
                                </Form>
                            )}
                        />
            </CardInner>

        </Card>
                    )}
                </Mutation>
    )
}
