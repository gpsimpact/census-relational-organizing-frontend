import {NavUl, NavLi, NavA } from './Styles';
import Link from 'next/link';

export const AnonNav = (props) => {
    return(
        <NavUl>
            <Link href="/register"><NavLi><NavA> Register </NavA></NavLi></Link>
        </NavUl>
    )
}