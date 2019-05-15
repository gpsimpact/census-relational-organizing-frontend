import React from "react";
import cookie from "cookie";
import { withApollo } from "react-apollo";
import redirect from '../../lib/redirect';


class Logout extends React.Component {
    async logout(){
        document.cookie = cookie.serialize('token', '', {
            maxAge: -1 // Expire the cookie immediately
          })
      
          // Force a reload of all the current queries now that the user is
          // logged in, so we don't accidentally leave any state around.
          this.props.client.cache.reset().then(() => {
            // Redirect to a more useful page when signed out
            redirect({}, '/')
          })
    }
    render(){

        return(
           <span onClick={() => this.logout()}>Logout</span>
        )
    }
}

export default withApollo(Logout);