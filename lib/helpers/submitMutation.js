
export const submitMutation = async (mutation, payload) => {
    let response;
    try{
        response = await mutation({variables: {...payload}});
    } catch(e) {
        response = e;
    }
    return response;
}