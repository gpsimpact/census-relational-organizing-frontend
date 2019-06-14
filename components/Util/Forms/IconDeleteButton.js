import React from 'react';
import styled from 'styled-components';


const Button = styled('button')`
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.g2};
    opacity:.5;
    color: ${props => props.theme.colors.white};
        font-weight: 700;
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.secondary};
        cursor: pointer;
    }
`;
export const IconDeleteButton = ({loading, icon}) => (
    <Button disabled={loading} type="submit">
      <i className={icon}></i>
    </Button>
)

