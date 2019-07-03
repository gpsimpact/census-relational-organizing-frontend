import React from "react";
import cookie from "cookie";
import Link from 'next/link';
import { ApolloConsumer } from 'react-apollo'
import PropTypes from 'prop-types';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import { CNavDropdown } from './Styles';
import { AdminPaths,PublicPaths } from '../../../paths';
import redirect from '../../../lib/redirect';

export class AuthedNav extends React.Component {
    logout = apolloClient => () => {
        document.cookie = cookie.serialize('token', '', {
          maxAge: -1 // Expire the cookie immediately
        })
    
        // Force a reload of all the current queries now that the user is
        // logged in, so we don't accidentally leave any state around.
        apolloClient.cache.reset().then(() => {
          // Redirect to a more useful page when signed out
          redirect({}, '/')
        })
      }

    render(){
        const { currentUser } = this.props;
        
        return(
            <React.Fragment>
                {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.index}>
                    <Nav.Link href={AdminPaths.index}>
                        Admin
                    </Nav.Link>
                </Link>
                }
                <CNavDropdown id="account" title="Account">
                    <Link href={PublicPaths.profile}>
                        <NavDropdown.Item href={PublicPaths.profile}> Profile </NavDropdown.Item>
                    </Link>
                    <ApolloConsumer>
                        {client => (
                            <NavDropdown.Item onClick={this.logout(client)}>
                                Logout
                            </NavDropdown.Item>
                        )}
                    </ApolloConsumer>

                </CNavDropdown>
            </React.Fragment>
        )
    }

};

AuthedNav.propTypes = {
    currentUser: PropTypes.object.isRequired
}