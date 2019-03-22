import styled from '../../../lib/styled';


export const NavUL = styled('ul')`
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

export const NavLI = styled('li')`
`;

export const NavA = styled('a')`
         padding: .5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        color: ${props => props.theme.colors.black};
        font-weight: 700;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.green};
            cursor: pointer;
        }

`;