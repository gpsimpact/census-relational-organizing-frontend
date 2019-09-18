import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Button } from '../Util/Typography/Buttons';
import styled from 'styled-components';
import { darken } from 'polished';


export const CancelButton = styled(Button)`
    background-color: ${props=>props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    width: 100%;
    font-size: .8rem;
    text-transform: uppercase;
    font-style: italic;
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props => darken(0.1, props.theme.colors.secondary)};
    }

`;
export const CANCEL_TEAM_APPLICATION = gql`
    mutation cancelTeamMembershipRequest($teamId: String!){
        cancelTeamMembershipRequest(teamId: $teamId){
            code
            success
            message
        }
    }
`;
export const CancelTeamApplication = (props) => {
    const team  = props.team;
    return(
        <Mutation mutation={CANCEL_TEAM_APPLICATION}
            variables={{
                teamId: team.id
            }}
            onCompleted={() => {
                window.location.reload();
            }}
        >
            {(mutation, { data, loading, error}) => (
                <CancelButton onClick={() => mutation()}>Cancel</CancelButton>
            )}
        </Mutation>
    )
}