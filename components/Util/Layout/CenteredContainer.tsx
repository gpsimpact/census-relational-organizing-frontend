import React from 'react';
import styled from '../../../lib/styled';


export const CCWrapperContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;


export const CCContainer = styled("div")`
    width: 500px;
`;


export const CenteredContainer = (props) => (
    <CCWrapperContainer>
        <CCContainer { ... props }>
            {props.children}
        </CCContainer>
    </CCWrapperContainer>
)

