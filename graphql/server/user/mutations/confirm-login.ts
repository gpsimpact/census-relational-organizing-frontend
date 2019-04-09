
import { gql } from "apollo-boost";

export const CONFIRM_LOGIN_MUTATION = gql`
mutation confirmLogin($token: String!) {
  confirmLogin(token: $token) {
    code
    success
    message
    token
  }
}
`;