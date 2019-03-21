
import { gql } from "apollo-boost";

export const LOGOUT_MUTATION = gql`
mutation logout {
  logout {
    code
    success
    message
  }
}
`;