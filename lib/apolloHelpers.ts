import { SIDENAV_OPEN_QUERY } from '../graphql/local/sidenav';

export const submitMutation = async (mutation:any, payload:any) => {
    let response:any;
    try{
        response = await mutation({variables: {...payload}});
    } catch(e) {
        response = e;
    }
    return response;
}

export const destructResponse = async (response:any, returnName: string) => {
    if(response.networkError && response.networkError.result && response.networkError.result.errors && response.networkError.result.errors.length > 0){
        return{
            code: "Uh Oh",
            success: false,
            message: response.networkError.result.errors[0].message
        }
    }
  
    if(!response['data'] || !response['data'][returnName]){
        let message = "Invalid response";
        if(response.message) {
            message = response.message
        }
        return {
            code: "Uh Oh",
            success: false,
            message: message,
        }
    }
    return response['data'][returnName];
}

export const toggleSideNav = (_, variables, { cache }) => {
    const { sideNavOpen } = cache.readQuery({
      query: SIDENAV_OPEN_QUERY,
    });
    const data = {
      data: { sideNavOpen: !sideNavOpen },
    };
    cache.writeData(data);
    return data;
}