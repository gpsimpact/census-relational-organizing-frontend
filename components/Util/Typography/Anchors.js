import styled from 'styled-components';

export const BlockAnchor = styled('a')`
    display: inline-block;
    font-size: .75rem;
    font-style: italic;
    margin: .5rem 0rem;
    text-transform: uppercase;
`;

export const ButtonAnchor = styled('a')`
    -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 20px;
    margin: .5rem .5rem;
    display: inline-block;
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.blue};
    border: 1px solid ${props => props.theme.colors.g2};
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.green};
        color: ${props => props.theme.colors.white};
        cursor: pointer;
    }
`;