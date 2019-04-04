
import { gql } from "apollo-boost";

export const UPDATE_ME_MUTATION = gql`
mutation updateMe($input: UpdateUserInput!) {
  updateUser(input: $input) {
    code
    success
    message
    item {
        id
        firstName
        email
    }
  }
}
`;