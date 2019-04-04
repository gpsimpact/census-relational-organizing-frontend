import styled from '../../../lib/styled';


export const MainTitle = styled("h1")`
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
    margin-top: 0rem;
    margin-bottom: .5rem;

`;
export const MainTitleSpan = styled("span")`
    color: ${props => props.theme.colors.blue};
    font-size: .8em;
    font-style: italic;
`;

export const SubTitle = styled("h3")`
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
    margin-top: 0rem;
    margin-bottom: .5rem;
`;
export const SubTitleSpan = styled("span")`
    color: ${props => props.theme.colors.blue};
    font-size: .8em;
    font-style: italic;
`;
export const PageTitle = styled("h1")`
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
    margin-top: -${props => props.theme.spacing[3]};
    margin-bottom: -${props => props.theme.spacing[2]};
`;