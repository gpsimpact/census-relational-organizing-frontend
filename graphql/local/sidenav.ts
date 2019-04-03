import { gql } from "apollo-boost";

export const SIDENAV_OPEN_QUERY = gql`
    query {
        sideNavOpen @client
    }
`;

export const TOGGLE_SIDENAV_MUTATION = gql`
    mutation{
        toggleSideNav @client
    }
`;