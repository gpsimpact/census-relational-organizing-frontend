import styled from '../../lib/styled';
import Link from 'next/link';
import { NavA } from '../Util/Typography/Navs';
import { CurrentUserInterface } from '../../interfaces/CurrentUserInterface';



const AdminNavHeader = styled('div')`
    background: ${props => props.theme.colors.g3};
    position: relative;
    z-index: 50;

`;
const AdminNavBarContainer = styled('nav')`
    width: 100%;
    padding: 10px;
    display: -ms-flexbox !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`
const AdminLeftNav = styled('div')`
    margin-right: auto;
    display: -ms-flexbox !important;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
`;
const AdminRightNav = styled('div')`
    margin-left: auto;
    display: -ms-flexbox !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
`;

interface AdminNav {
    currentUser: CurrentUserInterface
}

export const AdminDashNav = (props:AdminNav) => {
    const { currentUser } = props;
    return(
        <AdminNavHeader>
                    <AdminNavBarContainer>
                        <AdminLeftNav>
                            {currentUser.hasGlobalPermission('ADMIN') && 
                                <Link href="/a/dash"><NavA>Admin Home</NavA></Link>
                            }

                        </AdminLeftNav>
                            

                        <AdminRightNav>
                            {
                                currentUser.hasGlobalPermission('ADMIN_TEAMS') &&
                                <Link href="/a/dash/teams"><NavA>Teams</NavA></Link>
                            }
                             {
                                currentUser.hasGlobalPermission('ADMIN_USERS') &&
                                <Link href="/a/dash/users"><NavA>Users</NavA></Link>
                            }
                        </AdminRightNav>
                    </AdminNavBarContainer>
        </AdminNavHeader>
    )
}