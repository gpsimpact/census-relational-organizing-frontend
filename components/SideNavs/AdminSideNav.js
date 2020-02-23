import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { AdminPaths } from '../../paths';
import { H3 } from '../Util/Typography';
import { useTranslation } from 'react-i18next';

export const AdminSideNav = (props) => {
    const { t } = useTranslation();
    const { currentUser } = props;
    return(
        <React.Fragment>
              <H3 uppercase primary> Global Admin {t('DASHBOARD')}</H3>
            {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.index}>
                    <Nav.Link href={AdminPaths.index}>
                        {t('ADMIN')}
                    </Nav.Link>
                </Link>
            }
            {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.teams.index}>
                    <Nav.Link href={AdminPaths.teams.index}>
                        {t("TEAMS")}
                    </Nav.Link>
                </Link>
            }
            {/* {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.tibs.questions}>
                    <Nav.Link href={AdminPaths.tibs.questions}>
                        Questions
                    </Nav.Link>
                </Link>
            }
            {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.tibs.actions}>
                    <Nav.Link href={AdminPaths.tibs.actions}>
                        Actions
                    </Nav.Link>
                </Link>
            } */}
              {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.tasks.index}>
                    <Nav.Link href={AdminPaths.tasks.index}>
                        {t('TASKS')}
                    </Nav.Link>
                </Link>
            }

        </React.Fragment>
    )
}

AdminSideNav.propTypes = {
    currentUser: PropTypes.object
}