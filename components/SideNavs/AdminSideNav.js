import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { AdminPaths } from '../../paths';

export const AdminSideNav = (props) => {
    const { currentUser } = props;
    return(
        <React.Fragment>
            {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.index}>
                    <Nav.Link href={AdminPaths.index}>
                        Admin
                    </Nav.Link>
                </Link>
            }
            {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.teams.index}>
                    <Nav.Link href={AdminPaths.teams.index}>
                        Teams
                    </Nav.Link>
                </Link>
            }
            {currentUser.hasGlobalPermission('ADMIN') &&
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
            }
              {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={AdminPaths.tasks.index}>
                    <Nav.Link href={AdminPaths.tasks.index}>
                        Tasks
                    </Nav.Link>
                </Link>
            }

        </React.Fragment>
    )
}

AdminSideNav.propTypes = {
    currentUser: PropTypes.object
}