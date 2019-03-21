import { CURRENT_USER_QUERY } from '../graphql/user/queries/me';

export default apolloClient =>
  apolloClient
    .query({
      query: CURRENT_USER_QUERY
    })
    .then(({ data }) => {
      return { currentUser: data }
    })
    .catch(() => {
      // Fail gracefully
      return { currentUser: {} }
    })