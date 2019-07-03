import React from "react";
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo'
import { GET_GTIBS } from "../Queries/GTIBS";
import { FormError } from '../Util/Forms';
import { SingleTIBContainer, ToggleButton, DeleteTIB, ConfirmDelete,BoolButton,ConfirmDeleteButton } from './Styles';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Check from '@material-ui/icons/Check';

export const TOGGLE_GTIB = gql`
    mutation toggleGtib($id: String!, $input:UpdateGtibInput!){
        updateGtib(id: $id, input:$input){
            code
            success
            message
            item {
                id
                text
                active
                visible
                tibType
            }
        }
    }
`;


export class SingleGTIB extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open:false
        }
    }
    toggle(){
        this.setState({open: !this.state.open})
    }
    render(){
        const { gtib, tipType } = this.props;
        return(
            <SingleTIBContainer>
            <Row>
    
                <Col md={12}>
                <Mutation mutation={TOGGLE_GTIB}
                        variables={{
                            id: gtib.id,
                            input: {
                                visible: !gtib.visible,
                                active: true,
                                tibType: gtib.tibType
                            }
                        }}
                    >
                        {(toggleGTIB, {data,loading,error}) => {
                        return(
                            <Row>
                                {error && <Col><FormError error={{code: "Uh Oh", message: error.message}}/></Col>}
                                <Col md={2}>
                                    <ToggleButton visible={gtib.visible} disabled={loading}
                                        onClick={() => {
                                            console.log('hi')
                                            toggleGTIB();
                                        }}
                                    >
                                         <span className="checkem">
                                                    <Check/>
                                                </span>
                                    </ToggleButton>
                                </Col>

                                <Col md={8}>
                                    {gtib.text}
                                </Col>

                                <Col md={2}>
                                    <DeleteTIB type="button" onClick={() => this.toggle()}>
                                        <DeleteForever/>
                                    </DeleteTIB>
                                </Col>
                            </Row>
                   )}}
                    </Mutation>
                </Col>

                <Col>
                    <ConfirmDelete open={this.state.open}>
                    <Mutation mutation={TOGGLE_GTIB}
                        variables={{
                            id: gtib.id,
                            input: {
                                active: false,
                                visible: false,
                            }
                        }}
                        refetchQueries={[{query: GET_GTIBS, variables:{input:{active:true, tibType:gtib.tibType}}}]}
                    >
                        {(deleteGTIB, {data,loading,error}) => {
                            return(
                                <Row bsPrefix={'row align-items-center justify-content-center'}>
                                    <Col md={8}>
                                            <h3>Are you sure you want to delete:</h3> 
                                            <p>{gtib.text}</p>
                                    </Col>
                                    <Col md={2}>
                                        <ConfirmDeleteButton type="button" onClick={() => {
                                            this.toggle();
                                            deleteGTIB();
                                        }}>
                                            Confirm
                                        </ConfirmDeleteButton>
                                    </Col>
                                    <Col md={2}>
                                        <BoolButton type="button" onClick={()=>this.toggle()}>Cancel</BoolButton>
                                    </Col>
                                    {error && <Col><FormError error={{code: "Uh Oh", message: error.message}}/></Col>}

                                </Row>
                            )
                        }}
                        </Mutation>
                    </ConfirmDelete>

                </Col>
            </Row>
            </SingleTIBContainer>
        )
    }
}

SingleGTIB.propTypes = {
    gtib: PropTypes.object.isRequired
}