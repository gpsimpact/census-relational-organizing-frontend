import { gql } from "apollo-boost";

export const GET_GTIBS = gql`
    query getGTIBS($visible: Boolean){
        gtibs(visible:$visible){
            id
            text
            active
            visible
        }
    }
`;