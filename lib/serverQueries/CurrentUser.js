import { CURRENT_USER_QUERY } from '../../components/QueryComponents/Me';

export const GetCurrentUser = apolloClient =>
  apolloClient
    .query({
      query: CURRENT_USER_QUERY
    })
    .then(({ data }) => {
      return { currentUser: data }
    })
    .catch((e) => {
      // Fail gracefully
      console.log('failing')
      console.log(e)
      return { currentUser: {} }
    })