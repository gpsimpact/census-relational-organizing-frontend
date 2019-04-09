
import * as React from "react";
import styled from '../../lib/styled';
import { NavLI, NavA } from '../Util/Typography/Navs';
import Logout from "../Auth/Logout";
import { CURRENT_USER_QUERY } from '../../graphql/server/user/queries/me';
import  Router  from 'next/router';
import Link from 'next/link';


const AccountNavDropDown = styled('div')<{accountNavOpen: boolean}>`
    overflow:visible;
    position: relative;

`;

const AccountDropDownInner = styled('div')<{accountNavOpen: boolean}>`
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

    ${({accountNavOpen}) => (accountNavOpen) && `
         width: 100%;
         height: auto;
         border-width: 3px;
         padding: 1rem .5rem;

    `}

`;
interface State {
    accountNavOpen: boolean
}
export class AccountNav extends React.Component<any> {
    state: State = {
        accountNavOpen: false
    }
    toggleAccountNav(){
        this.setState({accountNavOpen: !this.state.accountNavOpen})
    }

    logout(){
        client
    }

    render(){
        return (
            
                <AccountNavDropDown accountNavOpen={this.state.accountNavOpen}>
                  <NavLI> <NavA onClick={() => this.toggleAccountNav()}> Account <i className="fas fa-caret-down"></i></NavA> </NavLI>

                    <AccountDropDownInner accountNavOpen={this.state.accountNavOpen}>
                        <NavLI>
                             <Link href="/profile"><NavA>Profile</NavA></Link>
                         </NavLI>

                         <NavLI><NavA><Logout/></NavA></NavLI>

                         
                    </AccountDropDownInner>
                
                </AccountNavDropDown>
           
        )
    }
}