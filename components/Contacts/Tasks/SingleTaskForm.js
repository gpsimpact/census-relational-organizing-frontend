import React from 'react';
import { CustomModal } from '../../Util/Layout';
import { PrimaryButton,H3 } from '../../Util/Typography';
import { Formik, Form, Field } from "formik";


export class SingleTaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    render(){
        const { task, target } = this.props;
        return(
            <React.Fragment>
                <PrimaryButton uppercase onClick={() =>  this.setState({open: true})}>Edit</PrimaryButton>
                <CustomModal 
                        show={this.state.open} 
                        onHide={() => this.setState({open: false})}
                        centered
                >
                    <CustomModal.Header closeButton>
                                <H3 uppercase>{task && task.definition && task.definition.form && task.definition.form.title ? task.definition.form.title : "Task"}</H3>
                    </CustomModal.Header>
                    <CustomModal.Body>
                        {task.id}
                    </CustomModal.Body>


                </CustomModal>
            </React.Fragment>
        )
    }
}