import React from "react";
import { NavBar } from './Navigation/Navbar';
import { CurrentUserInterface } from '../interfaces/CurrentUserInterface';
import { PageContainer, PageContent, Footer, PageContainerInner } from './Util/Layout/PageComponents';
import { SideNav } from "./Navigation/SideNav";


interface PageInterface {
    currentUser: CurrentUserInterface;
    navComponent?: any;
    crudNavComponent?: any;
}

export default class Page extends React.Component<PageInterface> {
    render(){
        return(
            <PageContainer>
                <NavBar currentUser={this.props.currentUser} disableSideNav={this.props.navComponent ? false : true}/>

                <PageContent>
                    {this.props.navComponent && <SideNav navComponent={this.props.navComponent} />}
                     <PageContainerInner disableSideNav={this.props.navComponent ? false : true}>
                            {this.props.crudNavComponent && this.props.crudNavComponent}
                            {this.props.children}
                     </PageContainerInner>
                </PageContent>

                <Footer>
                    <h3> Brand </h3>
                    <p> Footer info?</p>
                    <p> Social links? </p>
                    <p> Disclaimer? </p>
                </Footer>

            </PageContainer>
        )
    }
}