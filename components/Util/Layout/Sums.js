import styled from 'styled-components';

export const SumWrapper = styled('div')`
    border: 3px solid ${props => props.theme.colors.primary};
`;
export const SumCountTitle = styled('h3')`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    text-align: center;
`;

export const SumCountNum = styled('h2')`
    color: ${props => props.theme.colors.black};
    margin: 1rem 0;
    text-align: center;
    font-weight: bold;
`;
