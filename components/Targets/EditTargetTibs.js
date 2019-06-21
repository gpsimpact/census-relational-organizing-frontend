import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo'
import { Row, Col } from '../Util/Grid';
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';
import { FormError, FormSuccess,TextField,SubmitButton, CheckBoxArrayField, FormIcon, CheckBoxBlock, CheckBox } from '../Util/Forms';
import { Formik, Form, Field, FieldArray } from "formik";
import { FormTitle, Info } from '../Util/Typography';

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
export class EditTargetTibs extends React.Component {

    render(){
        let { target } = this.props;
        let activeTibs = _.map(_.filter(target.tibs, {isApplied: true}), 'id');
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
                            }
                        }}
                        render={({status}) =>(
                            <Form noValidate>
                                 {
                                         status && status.form && status.form.code != 'Success' && <FormError error={status.form}/>
                                    }
                                    {
                                        status && status.form && status.form.code === 'Success' && <FormSuccess message={status.form}/>
                                    }
                                <FormTitle>About {target.firstName}</FormTitle>
                                <Info>Please check all of the statements below that you know are true about {target.firstName}</Info>
                                {target && target.tibs && target.tibs.map((tib, idx) => {
                                console.log(tib);
                                return(
                                    <Row key={idx}>
                                        <Col>
                                            <CheckBoxArrayField id={tib.id} name="tibIds" value={tib.id} label={tib.text}/>
                                        </Col>
                                    </Row>
                                )
                            })}

                                <SubmitButton 
                                    loading={loading}
                                    value={loading ? "Saving" : "Save"}
                                />
                        
                            </Form>
                        )}
                    
                    />
                )}
            </Mutation>


        )
    }
}


EditTargetTibs.propTypes = {
    target: PropTypes.object.isRequired,
}