import React from "react";
import styled from "styled-components";
import {  NavLi, NavA } from './Styles';
import Link from 'next/link';
import Logout from "../../Auth/Logout";


const AccountNavDropDown = styled('div')`
    overflow:visible;
    position: relative;
`;

const AccountDropDownInner = styled('div')`
    position: absolute;
    z-index: 50;
    top: 100%;
    overflow: hidden;
    background-color: ${props => props.theme.colors.white};
    height: 0;
    width: 0;
    border-color: ${props=> props.theme.colors.g3};
    border-style: solid;
    border-width: 0px;
    transition: all .3s ease-in-out;

    ${({open}) => (open) && `
         width: 100%;
         height: auto;
         border-width: 3px;
         padding: 1rem .5rem;

    `}

`;

export class AccountNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }

    }
    toggleAccountNav() {
        this.setState({open: !this.state.open})
    }

    render(){
        return(
            <AccountNavDropDown>
                  <NavLi> <NavA onClick={() => this.toggleAccountNav()}> Account <i className="fas fa-caret-down"></i></NavA> </NavLi>
                    <AccountDropDownInner open={this.state.open}>
                        <Link href="/profile"><NavLi><NavA>Profile</NavA></NavLi></Link>
                        <NavLi><NavA><Logout/></NavA></NavLi>
                    </AccountDropDownInner>
            </AccountNavDropDown>
        )
    }
}