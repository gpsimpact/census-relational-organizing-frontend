import * as React from "react";
import cookie from "cookie";
import { withApollo } from "react-apollo";
import { Box } from '../components/Util/Layout/Box';
import { MainTitle } from '../components/Util/Typography/Titles';
import { VertPadTop } from '../components/Util/Layout/Separators';
import { LoadingBar } from '../components/Util/Loading/LoadingBar';
import { FormError } from '../components/Util/Forms/FormError';
import { ErrorMessage } from '../components/Util/Loading/ErrorMessage';
import redirect from "../lib/redirect";
import MutationOnMount from '../components/MutationOnMount';
import RouteResponseComponent from '../components/RouteResponseComponent';
import { CONFIRM_LOGIN_MUTATION } from '../graphql/server/user/mutations/confirm-login';


class Confirm extends React.PureComponent<any> {

  render() {
    return(
        <div className="container">
          <VertPadTop/>
            <div className="row justify-content-center">
                <div className="col-md-6">
                  <Box>
                    <MainTitle> Logging In</MainTitle>
                    <MutationOnMount 
                          mutation={CONFIRM_LOGIN_MUTATION} 
                          variables={{token:this.props.query.token}}
                          onCompleted={async data => {
                            console.log(data);
                            if(data && data.confirmLogin && data.confirmLogin.token && data.confirmLogin.success){
                              document.cookie = cookie.serialize('token', data.confirmLogin.token, {
                                maxAge: 30 * 24 * 60 * 60 // 30 days
                              })
                              // Force a reload of all the current queries now that the user is
                              // logged in
                              this.props.client.cache.reset().then(() => {
                                redirect({}, '/')
                              })
                            }
                          }}
                        >
                      {(mutate, { data, loading, error}) => {
                        if(loading) {
                          return (<LoadingBar active={true}/>);
                        }
                        if(error) {
                          return(<ErrorMessage error={error}/>);
                        }
                        if(data && !data.confirmLogin.success) {
                          return(<FormError error={{code: data.confirmLogin.code, message:data.confirmLogin.message}}/>);
                        }

    

                        return null;

                        

                      
                     }}
                    </MutationOnMount>
                  </Box>
                </div>
            </div>
        </div>
    )}
}

export default withApollo(Confirm);