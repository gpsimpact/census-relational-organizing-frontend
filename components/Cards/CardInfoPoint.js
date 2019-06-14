import styled from "styled-components";
import { Row, Col } from '../Util/Grid';


export const CardInfoPointContainer = styled('div')`
    margin: 30px 0px;
    line-height: 1.2rem;
    i,svg {
        margin-right: 30px;
        font-size:1.2rem;
    }
`;

export const CardInfoPoint = (props) => {
    return(
        <CardInfoPointContainer>
            <Row classNames={'align-items-center'}>
                {props.icon &&
                    <Col classNames={'col col-2'}>
                         <i className={props.icon}></i>
                    </Col>
                }
                <Col classNames={'col col-10'}>
                    {props.infoPoint}
                    {props.infoPoint2 && <> <br/> {props.infoPoint2}</>}
                
                </Col>
            </Row>
        </CardInfoPointContainer>
    )
}