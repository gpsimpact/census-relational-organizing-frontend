import React from "react";
import { NavBar } from './Navigation/Navbar';
import { CurrentUserInterface } from '../interfaces/CurrentUserInterface';
import { PageContainer, PageContent, Footer } from './Util/Layout/PageComponents';
import { SideNav } from "./Navigation/SideNav";


interface PageInterface {
    currentUser: CurrentUserInterface;
    navComponent?: any;
}

export default class Page extends React.Component<PageInterface> {
    render(){
        return(
            <PageContainer>
                <NavBar currentUser={this.props.currentUser} disableSideNav={this.props.navComponent ? false : true}/>
                {this.props.navComponent && <SideNav navComponent={this.props.navComponent} />}

                <PageContent>
                     {this.props.children}
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