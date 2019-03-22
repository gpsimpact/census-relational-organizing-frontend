import Link from 'next/link';
import { NavUL, NavLI, NavA } from '../Util/Typography/Navs';

export const LoginNav = (props:any) => {
    return(
        <NavUL>
            <NavLI>
                <Link href="/login"><NavA>Login</NavA></Link>

            </NavLI>

            <NavLI>
                <Link href="/register"><NavA>Register</NavA></Link>

            </NavLI>
        </NavUL>
    )
}