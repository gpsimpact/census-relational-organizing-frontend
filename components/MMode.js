import React from "react";
import { H1 } from './Util/Typography';
import { PageContainer, PageContent } from './Page';
import styled from 'styled-components';

const MModeContainer = styled('div')`
    padding: 250px 0px;
    background-color: ${props => props.theme.colors.primary};
    min-height: 100vh;
    .inner-wrap {
        background-color: #fff;
        padding: 30px;
    }
`;
export default class MMode extends React.Component {
    render() {
        return(
            <MModeContainer>
                    <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div class="inner-wrap">
                    <H1 uppercase> Attention: </H1>
                    <p> This is a staging application. Please visit <a href="https://civicpromotor.org"> https://civicpromotor.org </a> to access the site.</p>
                    </div>
                    </div>
                    </div>
            </MModeContainer>
        )
    }
}