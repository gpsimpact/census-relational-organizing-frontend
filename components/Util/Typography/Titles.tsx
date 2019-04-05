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


export const TitleH1 = styled("h1")`
    text-transform: uppercase;
    margin-top: ${props => props.theme.spacing[1]};
    margin-bottom: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.black};
    span {
        margin-left: ${props => props.theme.spacing[1]};
        font-size: .9em;
    }
`;
export const TitleH2 = styled("h2")`
    text-transform: uppercase;
    margin-top: ${props => props.theme.spacing[1]};
    margin-bottom: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.black};
    span {
        margin-left: ${props => props.theme.spacing[1]};
        font-size: .9em;
    }
`;
export const TitleH3 = styled("h3")`
    text-transform: uppercase;
    margin-top: ${props => props.theme.spacing[1]};
    margin-bottom: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.black};
    span {
        margin-left: ${props => props.theme.spacing[1]};
        font-size: .9em;
    }
`;
export const TitleH4 = styled("h4")`
    text-transform: uppercase;
    margin-top: ${props => props.theme.spacing[1]};
    margin-bottom: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.black};
    span {
        margin-left: ${props => props.theme.spacing[1]};
        font-size: .9em;
    }
`;
export const TitleH5 = styled("h5")`
    text-transform: uppercase;
    margin-top: ${props => props.theme.spacing[1]};
    margin-bottom: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.black};
    span {
        margin-left: ${props => props.theme.spacing[1]};
        font-size: .9em;
    }
`;
export const TitleH6 = styled("h6")`
    text-transform: uppercase;
    margin-top: ${props => props.theme.spacing[1]};
    margin-bottom: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.black};
    span {
        margin-left: ${props => props.theme.spacing[1]};
        font-size: .9em;
    }
`;