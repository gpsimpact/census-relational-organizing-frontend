import { gql } from "apollo-boost";

export const CREATE_TEAM_ADMIN_MUTATION = gql`
    mutation createTeamAdmin($input: CreateTeamInput!){
        createTeam(input: $input){
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