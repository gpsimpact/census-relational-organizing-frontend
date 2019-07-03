import React from 'react';
import styled from 'styled-components';


export const LoadingBarContainer = styled('div')`
    margin-bottom: 1rem;
    height: 10px;
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.black} 50%, ${props => props.theme.colors.primary} 100%);
    ${({active}) => active && `
        background-size: 50% auto;
        animation: loading 0.75s linear infinite;
    
    `}
`;

export const LoadingBar = (props) => (
    <LoadingBarContainer {...props}/>
)
