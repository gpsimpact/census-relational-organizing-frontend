import styled from '../../../lib/styled';


export const VertBarSeparator = styled('div')`
    margin: 0px ${props => props.theme.spacing[2]};
    width: 5px;
    background-color: ${props => props.theme.colors.black};
`;


export const VertPadTop = styled('div')`
    width: 100%;
    height: ${props => props.theme.spacing[4]};
`;