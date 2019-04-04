import Link from 'next/link';
import { SNavUL, SNavA, SNavLI } from '../../Util/Typography/Navs';
import { CurrentUserInterface } from '../../../interfaces/CurrentUserInterface';
import { AdminPaths } from '../../../paths/index';




interface AdminNav {
    currentUser: CurrentUserInterface
}

export const AdminDashNav = (props:AdminNav) => {
    const { currentUser } = props;
    return(
        <SNavUL>
                {currentUser.hasGlobalPermission('ADMIN') && 
                    <SNavLI><Link href={AdminPaths.index}><SNavA>Admin</SNavA></Link></SNavLI>
                }
                {currentUser.hasGlobalPermission('ADMIN_TEAMS') &&
                    <SNavLI> <Link href={AdminPaths.teams.index}><SNavA>Teams</SNavA></Link></SNavLI>
                }
                {currentUser.hasGlobalPermission('ADMIN_USERS') &&
                    <SNavLI><Link href={AdminPaths.users.index}><SNavA>Users</SNavA></Link></SNavLI>
                }
        </SNavUL>
   
    )
}