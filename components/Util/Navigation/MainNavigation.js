import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { CNavbar, Brand, CNav, CNavDropdown } from './Styles';
import {AuthedNav} from './AuthedNav';
import { AnonNav } from './AnonNav';
import  MenuIcon  from '@material-ui/icons/Menu';


export const MainNavigation = (props) => {
    const { currentUser } = props;

    return(

    <CNavbar expand="lg">
        <Link href="/"><Brand href="/"><img src="https://civic-promotor.s3-us-west-2.amazonaws.com/images/CivicPromotor_Logo_H_FullColor.png" alt="Civic Promotor"/></Brand></Link>
            <CNavbar.Toggle bsPrefix={'navbar-toggler ml-auto'} aria-controls="main-nav" label={'Main Navigation'}> Main Menu <MenuIcon/></CNavbar.Toggle>


            <CNavbar.Collapse id="main-nav">
                <CNav className="ml-auto">
                    {!currentUser && <AnonNav/>}
                    {currentUser && <AuthedNav currentUser={currentUser}/>}
               
                </CNav>
            </CNavbar.Collapse>
    </CNavbar>

    )
}


MainNavigation.propTypes = {
    currentUser: PropTypes.object
}