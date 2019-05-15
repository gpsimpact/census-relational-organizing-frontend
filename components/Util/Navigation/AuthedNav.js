import {NavUl, NavLi, NavA } from './Styles';
import { AccountNav } from './AccountNav';
import { AdminPaths } from '../../../paths';
import Link from 'next/link';

export const AuthedNav = (props) => {
    if(!props.currentUser){
        return null;
    }
    let { currentUser } = props;
    return(
        <NavUl>
            {currentUser.hasGlobalPermission('ADMIN') && <NavLi><Link href={AdminPaths.index}><NavA>Admin</NavA></Link></NavLi>}
             <AccountNav currentUser={currentUser}/>
        </NavUl>
    )
}