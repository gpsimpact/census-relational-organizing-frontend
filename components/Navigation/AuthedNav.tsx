import { NavUL, NavLI, NavA } from '../Util/Typography/Navs';
import { AccountNav } from './AccountNav';
import { CurrentUserInterface } from '../../interfaces/CurrentUserInterface';
import { AdminPath } from '../../paths';
import Link from 'next/link';

interface AuthedNavInterface {
    currentUser: CurrentUserInterface;
}
export const AuthedNav = (props:AuthedNavInterface) => {
    const { currentUser } = props;
    return(
        <NavUL>
                {currentUser.hasGlobalPermission('ADMIN') && <NavLI><Link href={AdminPath}><NavA>Admin</NavA></Link></NavLI>}

                <AccountNav currentUser={currentUser}/>
        </NavUL>
    )
}