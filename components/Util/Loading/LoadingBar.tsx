import React from 'react';
import styled from '../../../lib/styled';



export const LoadingBarContainer = styled('div')<{active:boolean}>`
    margin-bottom: ${props => props.theme.spacing[3]};
    height: 10px;
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, ${props => props.theme.colors.green} 0%, ${props => props.theme.colors.black} 50%, ${props => props.theme.colors.green} 100%);
    ${({active}) => active && `
        background-size: 50% auto;
        animation: loading 0.75s linear infinite;
    
    `}
`;

export const LoadingBar = (props) => (
    <LoadingBarContainer {...props}/>
)

