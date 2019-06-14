import React from "react";
import _ from "lodash";
import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";


import { Card, CardHeader, CardInner, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import { Row, Col } from '../Util/Grid';
import { DashPaths } from '../../paths';
import { CardInfoPoint } from './CardInfoPoint';
import { LoadingBar } from '../Util/Loading'; 
import { FormTitle } from '../Util/Typography';

export const TOGGLE_TEAM_PERMISSION = gql`
    mutation toggleTeamPermission($input:GrantTeamPermissionInput!){
        grantTeamPermission(input:$input){
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
    const { vol } = props;

    //find team perm
    const teamPerms = _.find(vol.teamPermissions, {team:{id:props.team.id}});
    


    return(
        <Card>
            <CardInner>
                <CardTitle>{vol.firstName} {vol.lastName}</CardTitle>
                <CardInfoPoint icon={'fas fa-phone'} infoPoint={vol.phone}/>
                <CardInfoPoint icon={'far fa-envelope'} infoPoint={vol.email}/>
                <CardInfoPoint icon={'fas fa-map-marker-alt'} infoPoint={`${vol.address}`} infoPoint2={`${vol.city}, ${vol.state} ${vol.zip5}`}/>

                <Mutation mutation={TOGGLE_TEAM_PERMISSION}>
                    {(mutation, {data, loading, error}) => (
                        <Formik 
                            initialValues={{
                                denied: false,
                                applicant:false,
                                member: false,
                                admin: false,
                            }}
                            onSubmit={async (values, actions) => {
                                console.log(values)
                            }}
                            render={({status}) => (
                                <Form noValidate>
                                    <FormTitle>Permissions</FormTitle>
                                    <LoadingBar active={loading}/>
                                 
                                </Form>
                            )}
                        />
                    )}
                </Mutation>
            </CardInner>

        </Card>
    )
}
