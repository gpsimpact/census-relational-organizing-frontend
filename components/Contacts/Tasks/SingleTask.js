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
    border-bottom: 1px solid ${props => props.theme.colors.g2};

`;

export class SingleTask extends React.Component {

    render(){
        const { target, task } = this.props;
        return(
            <SingleTaskContainer>
                <Row bsPrefix={"row "}>
                    <Col md={3}>
                        <H4 tertiary uppercase className="pb-1">Info</H4>
                        {task && task.definition && task.definition.form && task.definition.form.title && <H5>{task.definition.form.title}</H5>}
                    </Col>
                    <Col md={3}>
                        <H4 tertiary uppercase className="pb-1">Status</H4>
                            {
                                task && task.complete 
                                ?
                                <H5 primary><AssignmentTurnedIn/> Complete </H5>
                                :
                                <H5 secondary><AssignmentLate/> Incomplete </H5>
                            }
                    </Col>
                    <Col md={3}>
                        <H4 tertiary uppercase className="pb-1">Availability</H4>
                        <TaskDates task={task}/>
                    </Col>
                    <Col md={3}>
                        <SingleTaskForm task={task} target={target}/>
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
            <H5 uppercase>Task Start Date:</H5>
            <H6 secondary><Moment format="MM/DD">{taskStart}</Moment></H6>
            </>

        )
    }
    if(taskEnd && !taskStart){
        return(
            <>
            <H5 uppercase>Task End Date:</H5>
            <H6 secondary><Moment format="MM/DD">{taskEnd}</Moment></H6>
            </>

        )
    }
    if(taskStart && taskEnd){
        return(
            <>
            <H5 uppercase> Task Dates: </H5>
            <H6 secondary><Moment format="MM/DD">{taskStart}</Moment> - <Moment format="MM/DD">{taskEnd}</Moment></H6>
            </>

        )
    }
    return(
        <>
        <H5 uppercase>Task Dates: </H5>
        <H6 secondary>No date requirements</H6>
        </>
    )
    
}