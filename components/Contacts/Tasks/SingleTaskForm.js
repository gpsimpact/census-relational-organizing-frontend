import React from 'react';
import { CustomModal } from '../../Util/Layout';
import { PrimaryButton, SecondaryButton, H3, H4 } from '../../Util/Typography';
import { HR } from '../../Util/Layout';
import { Formik, Form, Field } from "formik";
import { DynamicField, DirtyFormMessage, SingleCheckBox } from '../../Util/Forms';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { transformAll } from '@overgear/yup-ast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Yup from "yup";

import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';

const UPDATE_TARGET_TASK = gql`
    mutation updateTargetTask($taskAssignmentId: String!, $targetId: String!, $input: UpdateTargetTaskInput!){
        updateTargetTask(taskAssignmentId: $taskAssignmentId, targetId: $targetId, input: $input){
            code
            success
            message
            item {
                id
                definition {
                    id
                    active
                    form {
                        id
                        title
                        buttonText
                        redirectRoute
                        description
                        fields {
                            label
                            type
                            name
                            value(targetId: $targetId)
                            selectOptions {
                                value
                                label
                            }
                            placeholder
                            validationTests
                        }
                    }
                    points
                   
                    isGloballyAvailable
                  
                }
                available(targetId: $targetId){
                    available
                    nonAvailableCode
                }
                availableTo{
                    role
                    available
                }
                complete(targetId: $targetId)
                notAvailableBeforeTs
                notAvailableAfterTs
                sortValue
                supplementalFields {
                    label
                    type
                    name
                    value(targetId: $targetId)
                    selectOptions {
                        value
                        label
                    }
                    placeholder
                    validationTests
                }
            }
        }
    }
`;

export class SingleTaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        }
    }
    render(){
        const { target, task, currentUser } = this.props;
      
        let transformedValidation = null;
        
        const taskForm = task && task.definition && task.definition.form ? task.definition.form : null;
        let initialValues = { 
            complete: task && task.complete ? task.complete : false,
        };
        const formFields = task && task.definition && task.definition.form && task.definition.form.fields ? task.definition.form.fields : [];
        const supplementalFields = task.supplementalFields ? task.supplementalFields : [];
        const taskFields = [...formFields, ...supplementalFields];

    
        if(taskFields.length > 0) {
            let shape = {};

            taskFields.map(field => {                
                let value = field.value ? field.value : "";
                try {
                    value = JSON.parse(value);
                }
                catch(e){
                }
                initialValues[field.name] = value;
              

                if(field.validationTests){
                    const vTest = JSON.parse(field.validationTests);

                    shape[field.name] = vTest;
                }
                if(field.validationTests){
                        const vTest = JSON.parse(field.validationTests);
                        shape[field.name] = vTest;
                    }
            });


            

            let schema = [
                ["yup.object"],
                ["yup.shape", shape]
            ];

            transformedValidation = transformAll(schema)

            
        }
        return(
            <Mutation mutation={UPDATE_TARGET_TASK}>
            {(mutation, {data, loading, error}) => (
                <React.Fragment>
                <PrimaryButton uppercase onClick={() =>  this.setState({open: true})}>Edit</PrimaryButton>
                <CustomModal 
                    show={this.state.open} 
                    onHide={() => this.setState({open: false})}
                    centered
                    size="lg"
                >
                    <CustomModal.Header closeButton>
                        <H3 uppercase>{task && task.definition && task.definition.form && task.definition.form.title ? task.definition.form.title : "Task"}</H3>
                    </CustomModal.Header>
                    
                    <CustomModal.Body>
                        
                        {
                            taskForm && this.state.open &&
                            
                            <Formik 
                            initialValues={initialValues}
                            validationSchema={transformedValidation}
                            onSubmit={ async (values, actions) => {

                                let payload = {
                                    taskAssignmentId: task.id,
                                    targetId: target.id,
                                    input: {
                                        fieldValues: [],
                                        complete: values.complete,
                                    }

                                }

                                Object.keys(values).forEach((key) => {
                                    if(key !== 'complete'){
                                        let val = values[key];
                                        if(typeof val !== 'string'){
                                            val = JSON.stringify(values[key]);
                                        }
                                        payload.input.fieldValues.push({
                                            value: val,
                                            name: key
                                        })
                                    }
                                })
                                let response = await submitMutation(mutation, payload);
                                let result = await marshallMutationResponse(response, 'updateTargetTask');
                                if(!result.success){
                                    actions.setStatus({
                                        form: {
                                            code: result.code,
                                            message: result.message
                                        }
                                    });
                                    
                                } else {
                                    let currentVals = {
                                        complete: result && result.item && result.item.complete ? result.item.complete : false,
                                    };
                                    result.item.definition.form.fields.map(field => {
                                        const value = field.value ? field.value : "";
                                        currentVals[field.name] = value;
                                        
                                    });
                                    result.item.supplementalFields.map(field => {
                                        const value = field.value ? field.value : "";
                                        currentVals[field.name] = value;

                                    })
                                    
                                    actions.resetForm(currentVals);
                                    
                                    this.setState({open: false});
                                    
                                }
                                
                            }}
                            render={(props) => {
                                return(
                                    <Form noValidate>
                                            {
                                             taskForm.description &&
                                            <p>{taskForm.description}</p>
                                            }
                                             {
                                                 taskFields && taskFields.length > 0 &&
                                                 taskFields.map((fieldDef, idx) => {
                                                     switch(fieldDef.type){
                                                         case "instruction":
                                                             return null;
                                                             default:
                                                                 return (
                                                                     <DynamicField key={idx} fieldDef={fieldDef} formProps={props}/>
                                                                     )
                                                                    }
                                                                    
                                                                })
                                            }
                                          
                                                <HR/>
                                                <Row>
                                                    <Col md={12}>
                                                            <Field
                                                                component={SingleCheckBox}
                                                                name="complete"
                                                                id="complete"
                                                                label="Mark this task as complete?"
                                                            />

                                                    </Col>
                                                </Row>
                                            <Row>
                                                <Col md={6}>
                                                <PrimaryButton
                                                    type="button" 
                                                    
                                                    onClick={() => {
                                                       
                                                        props.handleSubmit();
                                                    }}
                                                    > {loading ? "Saving" : "Save" } </PrimaryButton>
                                                </Col>
                                                <Col md={6}>
                                                    <SecondaryButton 
                                                        type="button"
                                                        value="Cancel"
                                                        onClick={() => {
                                                            this.setState({open: false})
                                                        }}
                                                        >
                                                            Close 
                                                    </SecondaryButton>
                                                </Col>
                                            </Row>

                                            {props && props.dirty && 
                                                    <DirtyFormMessage>This task has unsaved changes </DirtyFormMessage>
                                                }
                                      

                                         </Form>
                                     )
                                    }}
                                    />
                                }

                        
                        
                    </CustomModal.Body>


                </CustomModal>
                </React.Fragment>
            )}
            </Mutation>
            )
        }
}