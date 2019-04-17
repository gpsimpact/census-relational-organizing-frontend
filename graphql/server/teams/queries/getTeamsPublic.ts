import { gql } from "apollo-boost";

export const GET_TEAMS_PUBLIC_QUERY = gql`
    query getTeamsPublic($input: TeamsInput){
        teams(input:$input){
            hasMore
            totalCount
            items {
                id
                name
                description
                active
                slug
                createdAt
                updatedAt
            }
        }
    }
`;