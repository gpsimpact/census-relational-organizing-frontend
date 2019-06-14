import React from "react";
import Link from "next/link";
import _ from "lodash";
import { Card, CardHeader, CardInner, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import { DashPaths, AdminPaths } from '../../paths';
import styled from 'styled-components';
import { gql } from "apollo-boost";

import { Mutation } from 'react-apollo';
import { ErrorMessage } from '../Util/Loading';



const ApplicationPending = styled('h4')`
    text-align: center;
    background-color: ${props => props.theme.colors.tertiary};
    text-transform: uppercase;
    font-style: italic;
    padding: 10px 30px;
    font-weight: 700;
    font-size: .8rem;
    color: ${props => props.theme.colors.white};
`;

const SuccessPending = styled('h4')`
    text-align: center;
    background-color: ${props => props.theme.colors.blue};
    text-transform: uppercase;
    font-style: italic;
    padding: 10px 30px;
    font-weight: 700;
    font-size: .8rem;
    color: ${props => props.theme.colors.white};
`;



export const REQUEST_TEAM_MEMBERSHIP_PUBLIC = gql`
    mutation requestTeamMembershipPublic($teamId: String!){
        requestTeamMembership(teamId: $teamId){
            code
            success
            message
        }
    }
`;


export const TeamPermissionCard = (props) => {
    if(!props.team){
        return null;
    }
    const { team, currentUser } = props;

    return(
        <Card>
            <CardHeader>
                {
                    currentUser && (currentUser.hasTeamPermission(team.slug, 'MEMBER') || currentUser.hasTeamPermission(team.slug, 'ADMIN'))
                    ?
                    <Link href={{pathname: `${DashPaths.index}`, query: { team: team.slug}}}><IconLink href={`${DashPaths.index}?team=${team.slug}`}><i className="fas fa-tachometer-alt"></i> Dashboard </IconLink></Link>
                    :
                    currentUser && currentUser.hasTeamPermission(team.slug, 'APPLICANT') 
                    ?
                    <ApplicationPending>Application Pending.</ApplicationPending>
                    :
                    currentUser
                    ?
                    <Mutation mutation={REQUEST_TEAM_MEMBERSHIP_PUBLIC}
                        variables={{teamId:team.id}}
                    >
                    {(mutate, {data, loading, error}) => {
                        if(error) return(
                            <ErrorMessage error={error}/>
                        )
                        if(data && data.requestTeamMembership && data.requestTeamMembership.success) {
                            return(
                                <SuccessPending>{data.requestTeamMembership.message ? data.requestTeamMembership.message : "Application Pending."}</SuccessPending>

                            )
                        }
                        if(data && data.requestTeamMembership && !data.requestTeamMembership.success) {
                            return(
                                <SuccessPending>{data.requestTeamMembership.message ? data.requestTeamMembership.message : "Application Error."}</SuccessPending>
                            )
                        }
                        return(
                            <IconLink onClick={() => mutate()}>
                                Apply for membership
                            </IconLink>
                        )
                    }}
                        
                    </Mutation>
                    :
                    <Link href={{pathname: `/register`, query: { team: team.slug}}}><IconLink href={`/register?team=${team.slug}`}><i className="fas fa-tachometer-alt"></i> Register </IconLink></Link>
                }
            </CardHeader>
            <CardInner>
                <CardTitle>{team.name}</CardTitle>
                <CardParagraph>{team.description}</CardParagraph>

            </CardInner>
        </Card>
    )
}