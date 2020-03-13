import React from "react";
import _ from "lodash";
import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import { useTranslation } from 'react-i18next';

import { SelectField, SubmitButton, DirtyFormMessage } from '../Util/Forms';

import { Card, CardHeader, CardInner, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import { CardInfoPoint } from './CardInfoPoint';
import { LoadingBar } from '../Util/Loading'; 
import { submitMutation, marshallMutationResponse } from "../../lib/helpers";

import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Place from '@material-ui/icons/Place';

export const TOGGLE_TEAM_PERMISSION = gql`
    mutation toggleTeamPermission($input:ToggleTeamPermissionInput!){
        toggleTeamPermission(input:$input){
            code
            success
            message
            item {
                id
                firstName
                lastName
                email
                address
                city
                state
                zip5
                phone
                active
                globalPermissions
                teamPermissions {
                    team {
                        id
                        name
                    }
                    permissions
                }
            
            }
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
    const { t } = useTranslation();

    
    const permissionOptions = [
        {
            value: "DENIED",
            label: `${t('DENIED')}`
        },
        {
            value: 'APPLICANT',
            label: `${t('APPLICANT')}`
        },
        {
            value: 'MEMBER',
            label: `${t('MEMBER')}`,
        },
        {
            value: 'ADMIN',
            label: `${t('ADMIN')}`
        }
    ]


    return(

                <Mutation mutation={TOGGLE_TEAM_PERMISSION}
                >
                    
                    {(mutation, {data, loading, error}) => (
        <Card>
            <CardInner>
                <CardTitle>{vol.firstName} {vol.lastName}</CardTitle>
                <LoadingBar active={loading}/>
                <CardInfoPoint icon={<Phone/>} infoPoint={vol.phone}/>
                <CardInfoPoint icon={<Email/>} infoPoint={vol.email}/>
                <CardInfoPoint icon={<Place/>} infoPoint={`${vol.address}`} infoPoint2={`${vol.city}, ${vol.state} ${vol.zip5}`}/>
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
                                } else {
                                    actions.resetForm({permission: values.permission});

                                }
                            }}
                            render={props => (
                                <Form noValidate>
                                    <Field 
                                        id="permission"
                                        label={t('TEAM PERMISSIONS')}
                                        name={"permission"}
                                            placeholderOption={t('-- Select --')}
                                        options={permissionOptions}
                                        component={SelectField}
                                    />
                                      <SubmitButton 
                                        loading={loading}
                                    value={loading ? t("SAVING") : t('SAVE')}
                                />
                                
                                {props && props.dirty &&
                                    <DirtyFormMessage> This form has unsaved changes </DirtyFormMessage>
                                }

                        
                                </Form>
                            )}
                        />
            </CardInner>

        </Card>
                    )}
                </Mutation>
    )
}
