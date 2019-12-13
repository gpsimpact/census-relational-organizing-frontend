import React from "react";
import styled from 'styled-components';
import { MainNavigation, SideNav } from "./Util/Navigation";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import  MMode  from './MMode';

export const PageContainer = styled('div')`
    margin: 0 0;
    min-height: 100%;
    width: 100%;
    position: relative;
    -ms-overflow-style: scrollbar;
`;
export const PageContent = styled('main')`
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

export const PageTitle = styled('h1')`
    margin-bottom: -30px;
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
`;


export default class Page extends React.Component {
    render(){
        return(
            <PageContainer>
                {process.env.WARN_STAGING 
                                    && <MMode/>
                                }
                <MainNavigation currentUser={this.props.currentUser}/>

                <PageContent>
                    {this.props.sideNavComponent ?
                        <Container bsPrefix="container-fluid h-100 no-gutters px-0">
                            
                            <Row bsPrefix="row h-100 no-gutters">
                                <Col xs={12} md={3} xl={2}>
                                    <SideNav sideNavComponent={this.props.sideNavComponent}/>
                                </Col> 
                                <Col xs={12} md={9} xl={10}>
                                    {
                                        this.props.pageTitle &&
                                        <Container>
                                            <Row bsPrefix={"row justify-content-center pt-4"}>
                                                <Col>
                                                    <PageTitle>{this.props.pageTitle}</PageTitle>
                                                </Col>
                                            </Row>
                                        </Container>
                                    }
                                    {this.props.children}
                                </Col>
                            </Row>
                        </Container>
                    :
                    <React.Fragment>
                        {this.props.children}
                    </React.Fragment>
                    }
                </PageContent>

                <Footer>
                   <img className="footer-logo" src="https://civic-promotor.s3-us-west-2.amazonaws.com/images/CivicPromotor_Logo_V_White.png"/>
                </Footer>

            </PageContainer>
        )
    }
}

Page.propTypes = {
    currentUser: PropTypes.object,
}