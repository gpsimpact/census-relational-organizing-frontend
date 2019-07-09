import _ from 'lodash';
import { H5 } from '../Util/Typography';
import { BooleanBar } from '../Util/Layout';
import { SingleTIBContainer, ProgTitle, ProgTitleRight } from './Styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const SingleQuestionProgress = ({tib}) => {
    let total = tib.appliedCount + tib.unappliedCount;
    let truePercent = 0;
    if(tib.appliedCount > 0){
        truePercent = (tib.appliedCount / total) * 100;
    }
    const falsePercent = 100 - truePercent;

    return(
        <SingleTIBContainer>
            <H5 uppercase> {tib.text}</H5>
            <BooleanBar truePercent={`${truePercent}%`} falsePercent={`${falsePercent}%`}/>
            <Row>
                <Col>
                  <ProgTitle>True: <span>{Math.round(truePercent, 2)}%</span></ProgTitle>
                </Col>
                <Col>
                    <ProgTitleRight>False: <span>{Math.round(falsePercent, 2)}%</span></ProgTitleRight>
                </Col>
            </Row>
        </SingleTIBContainer>
    )
}
