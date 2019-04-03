import Link from 'next/link';
import { SNavUL, SNavA, SNavLI } from '../Util/Typography/Navs';
import { CurrentUserInterface } from '../../interfaces/CurrentUserInterface';
import { AdminPath, AdminTeamPath, AdminUserPath } from '../../paths/index';




interface AdminNav {
    currentUser: CurrentUserInterface
}

export const AdminDashNav = (props:AdminNav) => {
    const { currentUser } = props;
    return(
        <SNavUL>
                {currentUser.hasGlobalPermission('ADMIN') && 
                    <SNavLI><Link href={AdminPath}><SNavA>Admin Home</SNavA></Link></SNavLI>
                }
                {currentUser.hasGlobalPermission('ADMIN_TEAMS') &&
                    <SNavLI> <Link href={AdminTeamPath}><SNavA>Teams</SNavA></Link></SNavLI>
                }
                {currentUser.hasGlobalPermission('ADMIN_USERS') &&
                    <SNavLI><Link href={AdminUserPath}><SNavA>Users</SNavA></Link></SNavLI>
                }
        </SNavUL>
   
    )
}