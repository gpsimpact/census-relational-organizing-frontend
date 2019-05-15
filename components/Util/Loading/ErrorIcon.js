import React from 'react';
import styled from 'styled-components';



export const ErrorIconContainer= styled('div')`
        position: relative;
        display: block;
        margin: .5rem auto;
        text-align: center;
        i {
            color: ${props => props.theme.colors.red}
        }
        .hover {
            position: absolute;
            z-index: 50;
            top: 100%;
            overflow:hidden;
            background-color: ${props => props.theme.colors.white};
            height: 0;
            width: 0;
            border-color: ${props=> props.theme.colors.red};
            border-style: solid;
            border-width: 0px;
            transition: all .3s ease-in-out;
            text-align: left;
            font-size: .75rem;
            color: ${props=> props.theme.colors.black};
        }
        &:hover,
        &:focus {
            .hover {
                width: 100%;
                max-width: 300px;
                height: auto;
                border-width: 1px;
                padding: .5rem .5rem;
            }
        }
`;

export const ErrorIcon = (props) => {
    return(
    <ErrorIconContainer>
        <div className="hover">{props.error.message}</div>
        <span className="sr-only">{props.error.message}</span>
        <i className="fas fa-exclamation-circle"></i>
    </ErrorIconContainer>
)}

