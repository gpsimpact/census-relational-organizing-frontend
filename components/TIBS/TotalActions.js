import _ from 'lodash';
import { H3 } from '../Util/Typography';
import { ProgressBar } from '../Util/Layout';
import { ProgTitle, ProgTitleRight } from './Styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export const TotalActions = ({actions, title}) => {
    const appliedCountSum = _.reduce(
        _.map(actions, "appliedCount"),
        (sum, n) => {
          return sum + n;
        },
        0
      );
    const unappliedCountSum = _.reduce(
        _.map(actions, "unappliedCount"),
        (sum, n) => {
          return sum + n;
        },
        0
      );
    let total = (appliedCountSum + unappliedCountSum);
    let percent = 0;
    if(appliedCountSum > 0 ){
      percent = (appliedCountSum / total ) * 100;
    }

    
    return(
        <React.Fragment>
            <H3 uppercase> {title}</H3>
            <ProgressBar percent={`${percent}%`}/>
            <Row>
                <Col>
                    <ProgTitle>Completed: {appliedCountSum} / {total}</ProgTitle>
                </Col>
                <Col>
                    <ProgTitleRight>Percent: <span>{Math.round(percent, 2)}%</span></ProgTitleRight>
                </Col>
            </Row>
        </React.Fragment>
    )
}
