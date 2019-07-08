import _ from 'lodash';
import { H3 } from '../Util/Typography';
import { ProgressBar } from '../Util/Layout';
import { ProgTitle, ProgTitleRight } from './Styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export const TotalActions = ({actions, title}) => {
    console.log(actions);
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
    const percent = (appliedCountSum / unappliedCountSum ) * 100;
    return(
        <React.Fragment>
            <H3 uppercase> {title}</H3>
            <ProgressBar percent={`${percent}%`}/>
            <Row>
                <Col>
                    <ProgTitle>Completed: {appliedCountSum} / {unappliedCountSum}</ProgTitle>
                </Col>
                <Col>
                    <ProgTitleRight>Percent: <span>{Math.round(percent, 2)}%</span></ProgTitleRight>
                </Col>
            </Row>
        </React.Fragment>
    )
}
