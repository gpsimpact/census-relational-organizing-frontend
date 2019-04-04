import { gql } from "apollo-boost";

export const GET_TEAM_ADMIN_QUERY= gql`
    query getTeamAdmin($id: String, $slug: String){
        team(id:$id, slug:$slug){
            id
            name
            description
            active
            userPermissions {
                user {
                    id
                    firstName
                    lastName
                    email
                }
                permissions
            }
            slug
            createdAt
            updatedAt
        }
    }
`;