import React from 'react';
import styled from 'styled-components';
import { PageContainerInner } from './QueryComponents/SideNavContainer';
import { NavBar } from './Util/Navigation/NavBar';
import { SideNav } from './Util/Navigation/SideNav';


export const PageContainer = styled('div')`
    margin: 0 0;
    min-height: 100%;
    width: 100%;
    position: relative;
    -ms-overflow-style: scrollbar;
`;

export const PageContent = styled('div')`
    min-height: 55vh;
    position: relative;
`;

export const Footer = styled('footer')`
    padding: 75px 0px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    text-align: center;
    .footer-logo {
        display: block;
        margin: 15px auto;
        width: 200px;
        max-width: 100%;
    }
`;

export default class Page extends React.Component {
    render(){
        return(

            <PageContainer>
            <NavBar 
                currentUser={this.props.currentUser} 
                disableSideNav={this.props.navComponent ? false : true}/>
        
                <PageContent >
                    {this.props.navComponent && <SideNav navComponent={this.props.navComponent} />}
                        <PageContainerInner 
                                padTop={this.props.padTop ? this.props.padTop : false}
                                disableSideNav={this.props.navComponent ? false : true}
                            >
                                {this.props.crudNavComponent && this.props.crudNavComponent}
                                {this.props.children}
                        </PageContainerInner>
                </PageContent>


            <Footer>
                   <img className="footer-logo" src="https://civic-promotor.s3-us-west-2.amazonaws.com/images/CivicPromotor_Logo_V_White.png"/>
            </Footer>

        </PageContainer>

)
    }
}