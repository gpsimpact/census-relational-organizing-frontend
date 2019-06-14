import React from "react";
import styled from 'styled-components';

import { Container, Row, Col } from '../Util/Grid';
import  LoginForm  from '../Auth/LoginForm';


const Hero = styled('section')`
    margin-top: -100px;
    padding-top: 100px;
    position: relative;
    z-index: 1;
    background-image: url('https://civic-promotor.s3-us-west-2.amazonaws.com/images/flag.jpg');
    padding: 250px 0px;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    &:after {
        content: "";
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
        position: absolute;
        z-index: 2;
        opacity: .8;
        background-color: ${props => props.theme.colors.black};
    }
    * {
        position: relative;
        z-index: 25;
    }
`;

const IntroTitle = styled('h1')`
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
`;
const IntroP = styled('p')`
    color: ${props => props.theme.colors.white};
`;
export const Marketing = styled('section')`
    padding: 75px 0px;
`;
export class AnonHome extends React.Component {
    render(){
        return(
            <React.Fragment>
                <Hero>
                    <Container>
                        <Row classNames="justify-content-center">
                            <Col classNames="col-lg-8">
                                <IntroTitle> Welcome to Civic Promoter</IntroTitle>
                                <IntroP> Introduction to the app / content </IntroP>
                            </Col>
                            <Col classNames="col-lg-4">
                                <LoginForm />
                            </Col>
                        </Row>
                    </Container>

                </Hero>
                <Marketing>

                <Container>
                    <Row classNames={"justify-content-center"}>
                        <Col classNames={"col-lg-4"}>
                            Marketing Content?
                        </Col>
                        <Col classNames={"col-lg-4"}>
                        Marketing Content?

                        </Col>
                        <Col classNames={"col-lg-4"}>
                        Marketing Content?

                        </Col>
                    </Row>
                </Container>
                </Marketing>
            </React.Fragment>
        )
    }
}