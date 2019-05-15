import React from "react";
import styled from "styled-components";
import Link from 'next/link';

import { NavToggler } from './NavToggler';
import { NavUl, NavLi, NavA } from './Styles';
import { AuthedNav } from './AuthedNav';
import { AnonNav } from './AnonNav';

const NavHeader = styled('div')`
    background: ${props => props.theme.colors.g2};
    position: relative;
    z-index: 50;
`;

const NavBarContainer = styled('nav')`
    width: 100%;
    padding: 10px;
    display: -ms-flexbox !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
`
const LeftNav = styled('div')`
    margin-right: auto;
    display: -ms-flexbox !important;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    padding-left: 2rem;
`;
const RightNav = styled('div')`
    margin-left: auto;
    display: -ms-flexbox !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    padding-right: calc(2rem + 50px);

`;

export const NavBar = (props) => (
    <NavHeader>
        <NavBarContainer>
            <LeftNav>
                <NavUl>
                    <NavToggler disableSideNav={props.disableSideNav}/>
                    <Link href="/"><NavLi><NavA> Brand </NavA></NavLi></Link>
                </NavUl>
            </LeftNav>
            <RightNav>
                {!props.currentUser && <AnonNav/>}
                {props.currentUser && <AuthedNav currentUser={props.currentUser}/>}
            </RightNav>
        </NavBarContainer>
    </NavHeader>
)