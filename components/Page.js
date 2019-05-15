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


            <Footer hi={true}>
                    <h3> Brand </h3>
                    <p> Footer info?</p>
                    <p> Social links? </p>
                    <p> Disclaimer? </p>
            </Footer>

        </PageContainer>

)
    }
}