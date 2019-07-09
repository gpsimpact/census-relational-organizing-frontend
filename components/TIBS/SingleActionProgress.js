import _ from 'lodash';
import { H5 } from '../Util/Typography';
import { ProgressBar } from '../Util/Layout';
import { SingleTIBContainer, ProgTitle, ProgTitleRight } from './Styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const SingleActionProgress = ({tib}) => {
    let total = tib.appliedCount + tib.unappliedCount;
    let truePercent = 0;
    if(tib.appliedCount > 0){
        truePercent = (tib.appliedCount / total) * 100;
    }
    return(
        <SingleTIBContainer>
            <H5 uppercase> {tib.text}:</H5>
            <ProgressBar percent={`${truePercent}%`}/>
            <Row>
                <Col>
                    <ProgTitle>Completed: {tib.appliedCount} / {total}</ProgTitle>
                </Col>
                <Col>
                    <ProgTitleRight>Percent: <span>{Math.round(truePercent, 2)}%</span></ProgTitleRight>
                </Col>
            </Row>
        </SingleTIBContainer>
    )
}
