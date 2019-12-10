import React from "react";
import Link from "next/link";
import _ from "lodash";
import { Card, CardHeader, CardInner, CardFooter, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import { DashPaths, AdminPaths } from '../../paths';
import styled from 'styled-components';
import { gql } from "apollo-boost";

import { Mutation } from 'react-apollo';
import { ErrorMessage } from '../Util/Loading';
import { CancelTeamApplication } from '../Auth/CancelTeamApplication';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ApplicationUnavailable = styled('h4')`
    text-align: center;
    background-color: ${props => props.theme.colors.tertiary};
    text-transform: uppercase;
    font-style: italic;
    padding: 12px 25px;
    font-weight: 700;
    font-size: .8rem;
    color: ${props => props.theme.colors.white};
`;

const SuccessPending = styled('h4')`
    text-align: center;
    background-color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    font-style: italic;
    padding: 12px 25px;
    font-weight: 700;
    font-size: .8rem;
    color: ${props => props.theme.colors.white};
`;

export const ApplicationPending = styled('div')`
    background-color: ${props => props.theme.colors.tertiary};
    h4 {
        text-align: center;
    background-color: ${props => props.theme.colors.tertiary};
    text-transform: uppercase;
    font-style: italic;
    padding: 12px 25px;
    font-weight: 700;
    font-size: .8rem;
    color: ${props => props.theme.colors.white};
    }
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
 
            </CardHeader>
            <CardInner>
                <CardTitle>
                    {
                        currentUser && (currentUser.hasTeamPermission(team.id, 'MEMBER') || currentUser.hasTeamPermission(team.id, 'ADMIN'))
                        ?
                        <Link href={{pathname: `${DashPaths.index}`, query: { team: team.id}}}>{team.name}</Link>
                        :
                        <span>{team.name}</span>
                    }
                </CardTitle>
                <CardParagraph>{team.description}</CardParagraph>

            </CardInner>

            <CardFooter>
               {
                    currentUser && (currentUser.hasTeamPermission(team.id, 'MEMBER') || currentUser.hasTeamPermission(team.id, 'ADMIN'))
                    ?
                    <Link href={{pathname: `${DashPaths.index}`, query: { team: team.id}}}><IconLink href={`${DashPaths.index}?team=${team.id}`}><i className="fas fa-tachometer-alt"></i> Dashboard </IconLink></Link>
                    :
                    currentUser && currentUser.hasTeamPermission(team.id, 'APPLICANT') 
                    ?
                    <ApplicationPending>
                        <Row>
                            <Col md={6}>
                                <h4>Application Pending.</h4>

                            </Col>
                            <Col md={6}>
                                <CancelTeamApplication team={team}/>

                            </Col>
                        </Row>
                    </ApplicationPending>
                    :
                    currentUser && currentUser.hasTeamPermission(team.id, 'DENIED')
                    ?
                    <ApplicationUnavailable>Unavailable </ApplicationUnavailable>
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
                                <ApplicationPending>
                                        <Row>
                                        <Col md={6}>
                                            <h4>{data.requestTeamMembership.message ? data.requestTeamMembership.message : "Application Pending."}</h4>

                                        </Col>
                                        <Col md={6}>
                                            <CancelTeamApplication team={team}/>

                                        </Col>
                                    </Row>
                                </ApplicationPending>

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
                    <Link href={{pathname: `/register`, query: { team: team.id}}}><IconLink href={`/register?team=${team.id}`}><i className="fas fa-tachometer-alt"></i> Register </IconLink></Link>
                }
            </CardFooter>
        </Card>
    )
}