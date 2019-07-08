import styled from 'styled-components';

export const BooleanBar = styled('div')`
    background-color: ${props=>props.theme.colors.g2};
    padding: 3px;
    height: 26px;
    position: relative;
    &:after {
        content: "";
        background-color: ${props => props.theme.colors.secondary};
        height: 20px;
        top: 3px;
        right: 0;
        position: absolute;
        ${({falsePercent}) => falsePercent && `
            width: ${falsePercent};
        `}
    }
    &:before {
        content: "";
        background-color: ${props => props.theme.colors.primary};
        height: 20px;
        top: 3px;
        left: 0;
        position: absolute;
        ${({truePercent}) => truePercent && `
            width: ${truePercent};
        `}
    }
`;