import styled from '../../../lib/styled';

export const Pending = styled('p')`
    font-style: italic;
    color: ${props => props.theme.colors.red};
    text-transform: uppercase;
`;
export const GroupContainer = styled('div')`
    display: block;
    width: 100%;
`;
export const Label = styled('label')`
    display: block;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSize[1]};
    font-weight: ${props => props.theme.fontWeight[2]};
    padding-left: ${props => props.theme.spacing[2]};
`;

export const Input = styled('input')`
    display: block;
    width: 100%;
    padding: ${props => props.theme.spacing[2]};
    border: none;
    border-left: 3px solid ${props => props.theme.colors.g1};
    border-bottom: 2px solid ${props => props.theme.colors.g3};
    background: ${props => props.theme.colors.g1};
    :focus {
        background: ${props => props.theme.colors.g2};
        border-left: 3px solid ${props => props.theme.colors.g3};
        border-bottom: 2px solid ${props => props.theme.colors.g3};

    }
`;