import React from "react";
import { NavBar } from './Navigation/Navbar';
import styled from '../lib/styled';


const Footer = styled('footer')`
    padding: 75px 0px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    text-align: center;
    margin-top: 75px;
`;

const PageContent = styled('div')`
    min-height: 55vh;
`;
export default class Page extends React.Component<any> {
    render(){
        return(
            <>
                <NavBar currentUser={this.props.currentUser}/>
                
                <PageContent>
                     {this.props.children}
                </PageContent>

                <Footer>
                    <h3> Brand </h3>
                    <p> Footer info?</p>
                    <p> Social links? </p>
                    <p> Disclaimer? </p>
                </Footer>

            </>
        )
    }
}