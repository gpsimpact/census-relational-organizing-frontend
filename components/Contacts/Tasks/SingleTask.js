import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { H4, H5, H6, SecondaryButton } from '../../Util/Typography';

import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentLate from '@material-ui/icons/AssignmentLate';
import styled from 'styled-components';
import Moment from 'react-moment';
import { SingleTaskForm } from './SingleTaskForm';

const SingleTaskContainer = styled('div')`
    margin-bottom: 30px;
    padding-bottom: 15px;
    padding-top: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.g2};
    border-left: 5px solid ${props => props.theme.colors.secondary};
    padding-left: 10px;
    ${({complete, theme}) => complete && `
            border-left: 5px solid ${theme.colors.primary};
            opacity: .6;
            &:hover,
            &:focus,
            &:active{
                opacity: 1;
            }
    `};
    ${({available, theme}) => !available && `
            opacity: .5;
            background-color: ${theme.colors.g1};            
    `};
`;

export class SingleTask extends React.Component {

    render(){
        const { target, task, currentUser, t } = this.props;
        const complete = task && task.complete;
        const available = task && task.available && task.available.available;
        console.log(task);
        return(
            <SingleTaskContainer complete={complete ? 1 : 0} available={available ? 1 : 0}>
                <Row bsPrefix={"row "}>
                    <Col md={4}>
                        <H4 tertiary uppercase className="pb-1">Info</H4>
                        {task && task.definition && task.definition.form && task.definition.form.title && <H5>{task.definition.form.title}</H5>}
                    </Col>
                    <Col md={2}>
                        <H4 tertiary uppercase className="pb-1">Status</H4>
                            {
                                task && task.complete 
                                ?
                                <H5 primary><AssignmentTurnedIn/> Complete </H5>
                                :
                                <H5 secondary><AssignmentLate/> Incomplete </H5>
                            }
                    </Col>
                    <Col md={2}>
                        <TaskDates task={task}/>
                    </Col>
                    <Col md={2}>
                        <H4 tertiary uppercase className="pb-1">Availability</H4>

                        {
                                task && task.available && task.available.available 
                                ?
                                <H5 primary><AssignmentTurnedIn/> Available </H5>
                                :
                                <H5 secondary><AssignmentLate/> Unavailable </H5>
                            }
                    </Col>
                    <Col md={2}>
                        { available &&
                            <SingleTaskForm task={task} target={target} currentUser={currentUser} t={t}/>
                        }
                    </Col>
                </Row>
                


            </SingleTaskContainer>
        )
    }
}

const TaskDates = (props) => {
    const task = props.task;
    const taskStart = task && task.notAvailableBeforeTs ? task.notAvailableBeforeTs : null;
    const taskEnd = task && task.notAvailableAfterTs ? task.notAvailableAfterTs : null;
    if(taskStart && !taskEnd){
        return(
            <>
            <H4 tertiary uppercase className="pb-1">Task Start Date</H4>
            <H6 secondary><Moment format="MM/DD">{taskStart}</Moment></H6>
            </>

        )
    }
    if(taskEnd && !taskStart){
        return(
            <>
            <H4 tertiary uppercase className="pb-1">Task End Date</H4>
            <H6 secondary><Moment format="MM/DD">{taskEnd}</Moment></H6>
            </>

        )
    }
    if(taskStart && taskEnd){
        return(
            <>
            <H4 tertiary uppercase className="pb-1">Task Dates</H4>
            <H6 secondary><Moment format="MM/DD">{taskStart}</Moment> - <Moment format="MM/DD">{taskEnd}</Moment></H6>
            </>

        )
    }
    return(
            <>
            <H4 tertiary uppercase className="pb-1">Task Dates</H4>
            <H6>No date requirements</H6>
            </>
    )
    
}