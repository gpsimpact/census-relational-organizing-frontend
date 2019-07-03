import styled from 'styled-components';

export const H1 = styled('h1')`
    margin-top: 0rem;
    margin-bottom: 0rem;
    ${({uppercase}) => uppercase && `text-transform: uppercase;`};
    
    ${props => props.black && ({
        color: `${props.theme.colors.black}`,
    })};

    ${props => props.primary && ({
        color: `${props.theme.colors.primary}`
    })};
     ${props => props.secondary && ({
        color: `${props.theme.colors.secondary}`
    })};
     ${props => props.tertiary && ({
        color: `${props.theme.colors.tertiary}`
    })};
`;

export const H2 = styled('h2')`
    margin-top: 0rem;
    margin-bottom: 0rem;
    ${({uppercase}) => uppercase && `text-transform: uppercase;`};

    ${props => props.black && ({
        color: `${props.theme.colors.black}`,
    })};

    ${props => props.primary && ({
        color: `${props.theme.colors.primary}`
    })};
     ${props => props.secondary && ({
        color: `${props.theme.colors.secondary}`
    })};
     ${props => props.tertiary && ({
        color: `${props.theme.colors.tertiary}`
    })};
`;

export const H3 = styled('h3')`
    margin-top: 0rem;
    margin-bottom: 0rem;
    ${({uppercase}) => uppercase && `text-transform: uppercase;`};

    ${props => props.black && ({
        color: `${props.theme.colors.black}`,
    })};

    ${props => props.primary && ({
        color: `${props.theme.colors.primary}`
    })};
     ${props => props.secondary && ({
        color: `${props.theme.colors.secondary}`
    })};
     ${props => props.tertiary && ({
        color: `${props.theme.colors.tertiary}`
    })};

`;


export const H4 = styled('h4')`
    margin-top: 0rem;
    margin-bottom: 0rem;
    ${({uppercase}) => uppercase && `text-transform: uppercase;`};

    ${props => props.black && ({
        color: `${props.theme.colors.black}`,
    })};

    ${props => props.primary && ({
        color: `${props.theme.colors.primary}`
    })};
     ${props => props.secondary && ({
        color: `${props.theme.colors.secondary}`
    })};
     ${props => props.tertiary && ({
        color: `${props.theme.colors.tertiary}`
    })};

`;


export const H5 = styled('h5')`
    margin-top: 0rem;
    margin-bottom: 0rem;
    ${({uppercase}) => uppercase && `text-transform: uppercase;`};

    ${props => props.black && ({
        color: `${props.theme.colors.black}`,
    })};

    ${props => props.primary && ({
        color: `${props.theme.colors.primary}`
    })};
     ${props => props.secondary && ({
        color: `${props.theme.colors.secondary}`
    })};
     ${props => props.tertiary && ({
        color: `${props.theme.colors.tertiary}`
    })};
`;

export const H6 = styled('h6')`
    margin-top: 0rem;
    margin-bottom: 0rem;
    ${({uppercase}) => uppercase && `text-transform: uppercase;`};

    ${props => props.black && ({
        color: `${props.theme.colors.black}`,
    })};

    ${props => props.primary && ({
        color: `${props.theme.colors.primary}`
    })};
     ${props => props.secondary && ({
        color: `${props.theme.colors.secondary}`
    })};
     ${props => props.tertiary && ({
        color: `${props.theme.colors.tertiary}`
    })};
`;