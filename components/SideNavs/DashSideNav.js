import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { DashPaths } from '../../paths';
import { H3 } from '../Util/Typography';
import { SendGlobalAdminEmail } from '../Auth';
import { SendTeamAdminEmail } from '../Auth';
import { useTranslation } from 'react-i18next';

export const DashSideNav = (props) => {
    const { t } = useTranslation();
    const { currentUser, currentTeam } = props;
    return(
        <React.Fragment>
            <H3 uppercase primary> {currentTeam.name} {t('DASHBOARD')} </H3>

            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'MEMBER')) && 
                <Link href={{pathname: `${DashPaths.index}`, query: {team: currentTeam.id}}}>
                    <Nav.Link href={`${DashPaths.index}?team=${currentTeam.id}`}>
                    {t('DASHBOARD')}
                    </Nav.Link>
                </Link>
            }
             {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'MEMBER')) && 
                <Link href={{pathname: `${DashPaths.contacts.index}`, query: {team: currentTeam.id}}}>
                    <Nav.Link href={`${DashPaths.contacts.index}?team=${currentTeam.id}`}>
                        {
                            currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN')
                            ?
                            <span> {t('MY CONTACTS')} </span>
                            :
                            <span>{t('HOUSEHOLD CONTACTS')}</span>
                        }
                    </Nav.Link>
                </Link>
            }
                   {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.contacts.all}`, query: {team: currentTeam.id}}}>
                    <Nav.Link href={`${DashPaths.contacts.all}?team=${currentTeam.id}`}>
                        {t('ALL CONTACTS')}
                    </Nav.Link>
                </Link>
            }
              {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.vols.index}`, query: {team: currentTeam.id}}}>
                    <Nav.Link href={`${DashPaths.vols.index}?team=${currentTeam.id}`}>
                        {t('MESSENGERS')}
                    </Nav.Link>
                </Link>
            }
            {/* {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.tibs.questions}`, query: {team: currentTeam.id}}}>
                    <Nav.Link href={`${DashPaths.tibs.questions}?team=${currentTeam.id}`}>
                        Questions
                    </Nav.Link>
                </Link>
            }
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.tibs.actions}`, query: {team: currentTeam.id}}}>
                    <Nav.Link href={`${DashPaths.tibs.actions}?team=${currentTeam.id}`}>
                        Actions
                    </Nav.Link>
                </Link>
            } */}
            {/* {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN')) && 
                <Link href={{pathname: `${DashPaths.tasks.index}`, query: {team: currentTeam.id}}}>
                    <Nav.Link href={`${DashPaths.tasks.index}?team=${currentTeam.id}`}>
                        Tasks
                    </Nav.Link>
                </Link>
            } */}

            {
                currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.id, 'ADMIN')
                ?
                <SendGlobalAdminEmail dataFromParent={ t }/>
                :
                currentUser.hasTeamPermission(currentTeam.id, 'MEMBER')
                ?
                <SendTeamAdminEmail team={currentTeam} dataFromParent={ t }/>
                :
                null
            }



            


        </React.Fragment>
    )
}

DashSideNav.propTypes = {
    currentUser: PropTypes.object,
    currentTeam: PropTypes.object
}