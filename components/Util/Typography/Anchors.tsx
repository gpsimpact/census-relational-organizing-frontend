import styled from '../../../lib/styled';


export const SimpleAnchor = styled('a')`
         padding: .5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        color: ${props => props.theme.colors.black};
        font-weight: 700;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.green};
            cursor: pointer;
        }
`