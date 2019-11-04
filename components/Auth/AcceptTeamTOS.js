import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormError, FormSuccess, SingleCheckBox, SubmitButton } from '../Util/Forms';

import { H3, H4 } from '../Util/Typography';
import { CustomModal } from '../Util/Layout/Modal';
import { submitMutation, marshallMutationResponse } from '../../lib/helpers';

export const SET_TOS_ACCEPTANCE = gql`
    mutation setTeamTosAcceptance($input: SetTeamTosAcceptanceInput!){
        setTeamTosAcceptance(input:$input){
            code
            success
            message
            item {
                id
                email
                firstName
                lastName
                address
                city
                state
                zip5
                phone
                active
                globalPermissions
                teamPermissions{
                    team {
                        id
                        name
                        description
                        active
                        slug
                    }
                    permissions
                    acceptedTos
                }
            }
        }
    }
`;

export class AcceptTeamTOS extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open:true
        }
    }

    // componentDidMount(){
    //     this.setState({open: true})
    // }

    render(){
        const { currentUser, team } = this.props;
        console.log(this.state)
        return(
            <Mutation mutation={SET_TOS_ACCEPTANCE}>
                {(mutation, { data, loading, error}) => (
                    <Formik 
                        initialValues={{acceptedTos: currentUser.hasAcceptedTOS(team.id)}}
                        validationSchema={
                            Yup.object().shape({
                                acceptedTos: Yup.boolean().oneOf([true], 'Must Accept Terms of Service before continuing')
                            })
                        }
                        onSubmit={ async (values, actions) => {
                            let payload = {
                                input: {
                                    teamId: team.id,
                                    acceptTos: values.acceptedTos
                                }
                            }
                            let response = await submitMutation(mutation, payload);
                            let result = await marshallMutationResponse(response, 'setTeamTosAcceptance');
                            if(!result.success){
                                actions.setStatus({
                                    form:{
                                        code: result.code,
                                        message: result.message
                                    }
                                })
                            } else {
                                this.setState({open:false});
                                actions.resetForm({acceptedTos: true});
                            }
                        }}
                        render={props => (
                            <React.Fragment>
                                {/* <div onClick={() => this.setState({open: true})}>Hi</div> */}
                            <CustomModal
                                show={this.state.open}
                                onHide={() => console.log("hide")}
                                centered
                                >
                                <Modal.Header>
                                    <H3 uppercase> Terms of Service</H3>
                                </Modal.Header>
                                <Modal.Body>
                                <Form noValidate>

                                    <Row>
                                        <Col md={12}>
                                                {
                                                    team && team.tos 
                                                    ?
                                                    <p>{team.tos}</p>
                                                    :
                                                    <p> TOS coming soon.  Accept.</p>
                                                }

                                        </Col>
                                        <Col md={12}>
                                        {
                                            props.status && props.status.form && props.status.form.code != 'Success' && <FormError error={props.status.form}/>
                                        }
                                        {
                                            props.status && props.status.form && props.status.form.code === 'Success' && <FormSuccess message={props.status.form}/>
                                        }
                                            <Field
                                                component={SingleCheckBox}
                                                name="acceptedTos"
                                                id="acceptedTos"
                                                labelTop
                                                label="Accept Terms Of Service"
                                            />
                                        </Col>
                                        <Col md={12}>
                                        <Col md={12}>
                                                 <SubmitButton 
                                                    loading={loading}
                                                    value={loading ? "Saving" : "Save"}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                    </Form>
                                </Modal.Body>
                            </CustomModal>
                                </React.Fragment>
                        )}
                    />
                )}

            </Mutation>
        )
    }

}