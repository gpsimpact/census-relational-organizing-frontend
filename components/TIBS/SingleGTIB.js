import React from "react";
import PropTypes from 'prop-types';
import { Row, Col } from '../Util/Grid';
import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo'
import { GET_GTIBS } from "../QueryComponents/GTIBS";
import { FormError } from '../Util/Forms';
import { SingleTIBContainer, ToggleButton, DeleteTIB, ConfirmDelete,BoolButton,ConfirmDeleteButton } from './Styles';

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
    
                <Col>
                <Mutation mutation={TOGGLE_GTIB}
                        variables={{
                            id: gtib.id,
                            input: {
                                visible: !gtib.visible,
                                active: true,
                                tibType: gtib.tibType
                            }
                        }}
                        refetchQueries={
                            [
                                {
                                    query: GET_GTIBS,
                                    variables: {
                                        input:{active:true, tibType:gtib.tibType}
                                    }
                                }
                            ]
                        }
                    >
                        {(toggleGTIB, {data,loading,error}) => {
                        return(
                            <Row>
                                {error && <Col><FormError error={{code: "Uh Oh", message: error.message}}/></Col>}
                                <Col classNames={'col-md-2'}>
                                    <ToggleButton visible={gtib.visible} disabled={loading}
                                        onClick={() => {
                                            console.log('hi')
                                            toggleGTIB();
                                        }}
                                    ><i className="checkem fas fa-check"></i></ToggleButton>
                                </Col>

                                <Col classNames={'col-md-8'}>
                                    {gtib.text}
                                </Col>

                                <Col classNames={'col-md-2'}>
                                    <DeleteTIB type="button" onClick={() => this.toggle()}>
                                        <i className="far fa-trash-alt"></i>
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
                                <Row classNames={'align-items-center justify-content-center'}>
                                    <Col classNames={'col-md-8'}>
                                            <h3>Are you sure you want to delete:</h3> 
                                            <p>{gtib.text}</p>
                                    </Col>
                                    <Col classNames={'col-md-2'}>
                                        <ConfirmDeleteButton type="button" onClick={() => {
                                            this.toggle();
                                            deleteGTIB();
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

SingleGTIB.propTypes = {
    gtib: PropTypes.object.isRequired
}