import styled from 'styled-components';

export const NavUl = styled('ul')`
           display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            list-style: none;
            @media (max-width: 768px){
                flex-direction: column;
            }
`;


export const NavLi = styled('li')`

`;
export const NavA = styled('a')`
         padding: .5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        color: ${props => props.theme.colors.tertiary};
        font-weight: 700;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.primary};
            cursor: pointer;
        }
`

export const SNavUl = styled('ul')`
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            list-style: none;
            flex-direction: column;
`;

export const SNavLi = styled('li')`
`;

export const SNavA = styled('a')`
         padding: .5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: .9rem;
        color: ${props => props.theme.colors.white};
        font-weight: 700;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.primary};
            cursor: pointer;
        }

`;

export const CrudNavUl = styled('ul')`

            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            padding: 1rem 0 1rem;
            list-style: none;
            -webkit-box-pack: end!important;
            -ms-flex-pack: end!important;
            justify-content: flex-end!important;
            @media (max-width: 768px){
                flex-direction: column;
            }
`;

export const CrudNavLi = styled('li')`
    margin: 0 .25rem;
`;

export const CrudNavA = styled('a')`
    -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 10px;
    display: inline-block;
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