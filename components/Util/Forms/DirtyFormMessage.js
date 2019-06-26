import styled from 'styled-components';

export const DirtyFormMessage = styled('h3')`
    color: ${props => props.theme.colors.secondary};
    text-transform: uppercase;
    font-style: italic;
`;