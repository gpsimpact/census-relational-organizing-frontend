import { NavUL, NavLI, NavA } from '../Util/Typography/Navs';
import { AccountNav } from './AccountNav';

export const AuthedNav = (props:any) => {
    return(
        <NavUL>

                <AccountNav currentUser={props.currentUser}/>
        </NavUL>
    )
}