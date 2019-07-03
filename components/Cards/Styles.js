import styled from "styled-components";

export const Card = styled('div')`
    background: ${props => props.theme.colors.white};
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid ${props => props.theme.colors.g2};
    border-bottom: 2px solid ${props => props.theme.colors.g2};
`;

export const CardHeader = styled('div')`

`;

export const CardInner = styled('div')`
    padding: 30px 30px; 

`;

export const CardFooter = styled('div')`

`;

export const PermContainer = styled('div')`
    padding: .5rem;
    border: 1px solid ${props => props.theme.colors.g2};
`;
export const PermTitle = styled('h4')`
    text-transform: uppercase;
    font-size: .9rem;
`;

export const PermCount = styled('h4')`
    text-align: right;
`;


export const CardTitle = styled('h2')`
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
    margin-top: 0rem;
    margin-bottom: 0rem;
    line-height: 1.65rem;
`;
export const CardSubTitle = styled('h4')`
    background-color: ${props => props.theme.colors.secondary};
    text-transform: uppercase;
    color: ${props => props.theme.colors.white};
    padding: .25rem .5rem;
    margin-top: .5rem;
    margin-bottom: 0rem;
    line-height: 1.65rem;
    font-style: italic;
    border-bottom: 1px solid ${props => props.theme.colors.g2};
`;

export const IconLink = styled('a')`
    width: 100%;
    -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    display: inline-block;
    padding: 10px 30px;
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.tertiary};
    border-bottom: 1px solid ${props => props.theme.colors.g2};
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
    }
`;


export const CardParagraph = styled('p')`
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: .75rem;
`;