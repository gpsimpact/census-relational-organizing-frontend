import React from 'react';
import styled from '../../../lib/styled';

const BoxContainer = styled.div`
    background: ${props => props.theme.colors.white};
    padding: 30px;
    width: 100%;
    border: 1px solid ${props => props.theme.colors.g2};
    box-shadow: 0px 2px 5px 0px ${props => props.theme.colors.g3};
`;
export const Box = (props) => (
    <BoxContainer>
        {props.children}
    </BoxContainer>
)

