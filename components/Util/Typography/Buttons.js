import styled from 'styled-components';


export const Button = styled('button')`
    -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 30px;
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.tertiary};
    border: 1px solid ${props => props.theme.colors.g2};
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        cursor: pointer;
    }
`;