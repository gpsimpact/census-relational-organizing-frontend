
import { gql } from "apollo-boost";

export const LOGIN_MUTATION = gql`
mutation requestLogin($email: String!, $nextPage: String) {
    requestLogin(email: $email, nextPage: $nextPage) {
      code
      success
      message
      securityCode
    }
  }
`;

