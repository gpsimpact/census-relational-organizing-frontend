import { gql } from "apollo-boost";

export const GET_TTIBS = gql`
    query getTTIBS($input: TtibsInput!){
        ttibs(input:$input){
            id
            text
            active
            visible
            userId
            gtibLink
        }
    }
`;