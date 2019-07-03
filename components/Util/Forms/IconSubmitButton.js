import React from 'react';
import styled from 'styled-components';


const Button = styled('button')`
    margin-top: 25px;
    position: relative;
    width: 38px;
    height: 38px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
        font-weight: 700;
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.secondary};
        cursor: pointer;
    }
`;
export const IconSubmitButton = ({loading, icon}) => (
    <Button disabled={loading} type="submit">
      {icon}
    </Button>
)

