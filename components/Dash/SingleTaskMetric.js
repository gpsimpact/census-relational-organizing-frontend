import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { H4, H5, H6 } from '../Util/Typography';
import { ProgressBar } from '../Util/Layout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const TaskMetricContainer = styled('div')`
    border-left: 5px solid ${props => props.theme.colors.black};
    /* background-color: ${props => props.theme.colors.g3}; */
    border: 3px solid ${props => props.theme.colors.g3};
    h4 {
        background-color: ${props => props.theme.colors.g3};
        padding: 15px;
    }
`;

const TaskMetricInner = styled('div')`
    padding: 15px;
`;

export class SingleTaskMetric extends React.Component {
    render() {
        const { task, currentUser, dataFromParent0 } = this.props;
        const language = currentUser.getLanguage();
        let content = _.find(task.languageVariations, f => f.language === language);
        if (!content) {
            content = _.find(task.languageVariations, f => f.language === 'EN');
        }

        const complete = task.countComplete;
        const total = task.teamTargetsCount;

        const completionPercentage = Math.round((complete / total) * 100);
        return (
            <TaskMetricContainer>
                <H4 uppercase>{content.title}</H4>
                <TaskMetricInner>
                    <Row bsPrefix={'row align-items-center'}>
                        <Col md={3}>
                            <H5 uppercase>{dataFromParent0('COMPLETION_RATE_')}</H5>
                            <Row>
                                <Col md={6}>
                                    <H6> {complete} / {total}</H6>
                                </Col>
                                <Col md={6}>
                                    <H6> {completionPercentage}% </H6>
                                </Col>
                            </Row>

                        </Col>
                        <Col md={9}>
                            <H5 uppercase> {dataFromParent0('PROGRESS')}: </H5>
                            <ProgressBar percent={`${completionPercentage}%`} />
                        </Col>
                    </Row>
                </TaskMetricInner>
            </TaskMetricContainer>
        )
    }

}
