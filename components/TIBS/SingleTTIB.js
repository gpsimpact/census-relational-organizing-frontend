import React from "react";
import PropTypes from 'prop-types';
import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo'

import { SingleTIBContainer, ToggleButton, DeleteTIB, ConfirmDelete,BoolButton,ConfirmDeleteButton } from './Styles';
import { Row, Col } from '../Util/Grid';
import { FormError } from '../Util/Forms';
import { GET_TTIBS } from "../QueryComponents/TTIBS";

export const TOGGLE_TTIB = gql`
    mutation toggleTtib($id: String!, $input: UpdateTtibInput!){
        updateTtib(id:$id, input:$input){
            code
            success
            message
            item {
                id
                text
                active
                visible
                userId
                tibType
            }
        }
    }
`;

export class SingleTTIB extends React.Component{
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
        const { ttib, teamId, tibType } = this.props;
        return(
            <SingleTIBContainer>
                <Row>
                    <Col>
                        <Mutation mutation={TOGGLE_TTIB}
                            variables={{
                                id: ttib.id,
                                input: {
                                    visible: !ttib.visible,
                                    active: true,
                                    tibType: tibType
                                }
                            }}
                            refetchQueries={[{query: GET_TTIBS, variables:{input: {teamId: teamId, active:true, tibType:tibType}}}]}
                        >
                            {(toggleTTIB, { data, loading, error}) => {
                                return(
                                    <Row>
                                        {error && <Col><FormError error={{code: "Uh Oh", message: error.message}}/></Col>}
                                        <Col classNames={'col-md-2'}>
                                            <ToggleButton visible={ttib.visible} disabled={loading} 
                                                onClick={() => {
                                                    toggleTTIB();
                                                }}
                                            >
                                                <i className="checkem fas fa-check"></i>
                                            </ToggleButton>
                                        </Col>
                                        <Col classNames={'col-md-8'}>
                                            {ttib.text}
                                        </Col>
                                        <Col classNames={'col-md-2'}>
                                            <DeleteTIB type="button" onClick={() => this.toggle()}>
                                                    <i className="far fa-trash-alt"></i>
                                            </DeleteTIB>
                                        </Col>
                                    </Row>
                                )
                            }}

                            
                        </Mutation>
                    
                    </Col>
                    <Col>
                        <ConfirmDelete open={this.state.open}>
                            <Mutation mutation={TOGGLE_TTIB}
                                variables={{
                                    id: ttib.id,
                                    input: {
                                        active: false,
                                        visible: false
                                    }
                                }}
                                refetchQueries={[{query: GET_TTIBS, variables:{input: {teamId: teamId, active:true, tibType:tibType}}}]}
                            >
                                {(deleteTTIB, {data,loading,error}) => {
                                    return(
                                        <Row classNames="align-items-center justify-content-center">
                                            <Col classNames={'col-md-8'}>
                                                <h3>Are you sure you want to delete:</h3> 
                                                <p>{ttib.text}</p>
                                            </Col>
                                            <Col classNames={'col-md-2'}>
                                                <ConfirmDeleteButton type="button" onClick={() => {
                                                    this.toggle();
                                                    deleteTTIB();
                                                }}>
                                                    Confirm
                                                </ConfirmDeleteButton>
                                            </Col>
                                            <Col classNames={'col-md-2'}>
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

SingleTTIB.propTypes = {
    ttib: PropTypes.object.isRequired,
    teamId: PropTypes.string.isRequired
}