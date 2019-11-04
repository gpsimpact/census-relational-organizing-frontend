
import { gql } from "apollo-boost";

export const CURRENT_USER_QUERY = gql`
query Me{
    me {
      id
      email
      firstName
      lastName
      address
      city
      state
      zip5
      phone
      active
      globalPermissions
      teamPermissions{
          team {
              id
              name
              description
              active
              slug
          }
          permissions
          acceptedTos
      }

    }
  }
`;