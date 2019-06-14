import React from "react";
import PropTypes from 'prop-types';
import { Row, Col } from '../Util/Grid';
import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo'
import { SingleTIBContainer } from "./Styles";

export class SingleGTIBtoTTIB extends React.Component {
    render(){
        const { gtib } = this.props;
        return(
            <SingleTIBContainer>
                <Row>
                    <Col>
                        THink
                    </Col>
                </Row>
            </SingleTIBContainer>
        )
    }
}

SingleGTIBtoTTIB.propTypes = {
    gtib: PropTypes.object.isRequired
}