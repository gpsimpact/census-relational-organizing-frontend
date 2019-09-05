import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { FormError, FormSuccess,TextField,SubmitButton, CheckBoxArrayField, FormIcon, CheckBoxBlock, CheckBox,DirtyFormMessage } from '../Util/Forms';
import { Formik, Form, Field, FieldArray } from "formik";
import { H3, Info } from '../Util/Typography';

const UPDATE_TARGET_TIBS = gql`
    mutation updateTarget($id: String!, $input: UpdateTargetInput!){
        updateTarget(id:$id, input: $input){
            code
            success
            message
            item {
                id
                tibs {
                    id
                    text
                    isApplied
                }
            }
        }
    }
`;
export class EditContactTibs extends React.Component {

    render(){
        let { target } = this.props;
        let activeTibs = _.map(_.filter(target.tibs, {isApplied: true}), 'id');
        let questionTibs = _.filter(target.tibs, {tibType: 'QUESTION'});
        let actionTibs = _.filter(target.tibs, {tibType: 'ACTION'});
        
        return(
            <Mutation mutation={UPDATE_TARGET_TIBS}>
                {(mutation, {data,loading,error}) => (
                    <Formik 
                        initialValues={{
                           tibIds: activeTibs,
                        }}
                        onSubmit={ async (values, actions)=> {
                            let payload={
                                id: target.id,
                                input: {
                                    activeTibs: values.tibIds,
                                }
                            }
                            let response = await submitMutation(mutation, payload);
                            const result = await marshallMutationResponse(response, 'updateTarget');
                            if(!result.success){
                                actions.setStatus({
                                    form:{
                                        code: result.code,
                                        message: result.message
                                    }
                                });
                                return;
                            } else {
                                let currentTibs = _.map(_.filter(result.item.tibs, {isApplied: true}), 'id');
                                actions.resetForm({tibIds: currentTibs});
                            }
                        }}
                        render={props =>{
                            return(
                            <Form noValidate>
                                    {
                                        props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                                    }
                                    {
                                        props.status && props.status.form && props.status.form.code === 'Success' && <FormSuccess message={props.status.form}/>
                                    }
                                <Row>
                                    <Col md={6}>

                                        <H3 uppercase tertiary>About</H3>
                                        <Info>Please check all of the statements below that you know are true about {target.firstName}</Info>
                                            {questionTibs.map((tib, idx) => {
                                            return(
                                                    <Row key={idx}>
                                                        <Col>
                                                            <CheckBoxArrayField id={tib.id} name="tibIds" value={tib.id} label={tib.text}/>
                                                        </Col>
                                                    </Row>
                                                )
                                            })}

                                    </Col>

                                    <Col md={6}>

                                        <H3 uppercase tertiary>Actions</H3>
                                        <Info>Please mark if you have completed the following actions for {target.firstName}</Info>
                                            {actionTibs.map((tib, idx) => {
                                            return(
                                                    <Row key={idx}>
                                                        <Col>
                                                            <CheckBoxArrayField id={tib.id} name="tibIds" value={tib.id} label={tib.text}/>
                                                        </Col>
                                                    </Row>
                                                )
                                            })}

                                        </Col>


                                </Row>
                                
                                <SubmitButton 
                                    loading={loading}
                                    value={loading ? "Saving" : "Save"}
                                />

                                {props && props.dirty &&
                                    <DirtyFormMessage> This form has unsaved changes </DirtyFormMessage>
                                }
                        
                            </Form>
                        )}}
                    
                    />
                )}
            </Mutation>


        )
    }
}


EditContactTibs.propTypes = {
    target: PropTypes.object.isRequired,
}