import React from 'react';
import styled from 'styled-components';
import { H1 } from '../Typography';
import { ApolloError } from 'apollo-boost';



export const ErrorContainer = styled('div')`
        padding: 2rem;
        background: white;
        display: block;
        margin: 2rem 0;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-left: 5px solid ${props => props.theme.colors.secondary};
`;

export const ErrorMessage = (props) => {
    return(
    <ErrorContainer>
        <H1>Uh Oh</H1>
        <p>{props.error.message}</p>
    </ErrorContainer>
)}