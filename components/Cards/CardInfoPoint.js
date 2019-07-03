import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            <Row bsPrefix={'row align-items-center'}>
                {props.icon &&
                    <Col xs={2}>
                         {props.icon}
                    </Col>
                }
                <Col xs={10}>
                    {props.infoPoint}
                    {props.infoPoint2 && <> <br/> {props.infoPoint2}</>}
                
                </Col>
            </Row>
        </CardInfoPointContainer>
    )
}