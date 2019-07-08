import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { DashPaths } from '../../paths';

export const DashSideNav = (props) => {
    const { currentUser, currentTeam } = props;
    return(
        <React.Fragment>
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'MEMBER')) && 
                <Link href={{pathname: `${DashPaths.index}`, query: {team: currentTeam.slug}}}>
                    <Nav.Link href={`${DashPaths.index}?team=${currentTeam.slug}`}>
                        Dashboard
                    </Nav.Link>
                </Link>
            }
             {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'MEMBER')) && 
                <Link href={{pathname: `${DashPaths.contacts.index}`, query: {team: currentTeam.slug}}}>
                    <Nav.Link href={`${DashPaths.contacts.index}?team=${currentTeam.slug}`}>
                        Household Contacts
                    </Nav.Link>
                </Link>
            }
              {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.vols.index}`, query: {team: currentTeam.slug}}}>
                    <Nav.Link href={`${DashPaths.vols.index}?team=${currentTeam.slug}`}>
                        Volunteers
                    </Nav.Link>
                </Link>
            }
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.tibs.questions}`, query: {team: currentTeam.slug}}}>
                    <Nav.Link href={`${DashPaths.tibs.questions}?team=${currentTeam.slug}`}>
                        Questions
                    </Nav.Link>
                </Link>
            }
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.tibs.actions}`, query: {team: currentTeam.slug}}}>
                    <Nav.Link href={`${DashPaths.tibs.actions}?team=${currentTeam.slug}`}>
                        Actions
                    </Nav.Link>
                </Link>
            }
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.tasks.index}`, query: {team: currentTeam.slug}}}>
                    <Nav.Link href={`${DashPaths.tasks.index}?team=${currentTeam.slug}`}>
                        Tasks
                    </Nav.Link>
                </Link>
            }


            


        </React.Fragment>
    )
}

DashSideNav.propTypes = {
    currentUser: PropTypes.object,
    currentTeam: PropTypes.object
}