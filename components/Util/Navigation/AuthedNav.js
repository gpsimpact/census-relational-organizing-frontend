import React from "react";
import Link from 'next/link';
import PropTypes from 'prop-types';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import { CNavDropdown } from './Styles';
import { AdminPaths,PublicPaths } from '../../../paths';

export class AuthedNav extends React.Component {

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
                    <Link href="/logout">
                        <NavDropdown.Item href={'/logout'}>Logout</NavDropdown.Item>
                    </Link>

                </CNavDropdown>
            </React.Fragment>
        )
    }

};

AuthedNav.propTypes = {
    currentUser: PropTypes.object.isRequired
}