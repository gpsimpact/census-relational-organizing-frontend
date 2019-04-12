import { gql } from "apollo-boost";

export const ADMIN_GET_TEAM_COUNTS_QUERY= gql`
    query adminGetTeamCounts{
        summaryCountTeams
    }
`;
