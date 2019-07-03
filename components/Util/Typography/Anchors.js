import styled from 'styled-components';

export const BlockAnchor = styled('a')`
    display: inline-block;
    font-size: .75rem;
    font-style: italic;
    margin: .5rem 0rem;
    text-transform: uppercase;
    color: ${props => props.theme.colors.tertiary} !important;
    &:hover,
    &:focus,
    &:active {
            color: ${props=>props.theme.colors.primary} !important;
            cursor: pointer;
        }

`;
