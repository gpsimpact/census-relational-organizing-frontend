import React from 'react';
import styled from 'styled-components';
import { MainTitle } from '../Typography';
import { ApolloError } from 'apollo-boost';



export const ErrorContainer = styled('div')`
        padding: 2rem;
        background: white;
        display: block;
        margin: 2rem 0;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-left: 5px solid ${props => props.theme.colors.red};
`;

export const ErrorMessage = (props) => {
    return(
    <ErrorContainer>
        <MainTitle>Uh Oh</MainTitle>
        <p>{props.error.message}</p>
    </ErrorContainer>
)}

