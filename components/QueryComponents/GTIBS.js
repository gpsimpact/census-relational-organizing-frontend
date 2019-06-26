import { gql } from "apollo-boost";

export const GET_GTIBS = gql`
    query getGTIBS($input: GtibsInput!){
        gtibs(input:$input){
            id
            text
            active
            visible
            tibType
        }
    }
`;