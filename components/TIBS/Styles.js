import styled from 'styled-components';

export const SingleTIBContainer = styled('div')`
    margin: 5px 0px 20px;
`;
export const ToggleButton = styled('button')`
        background-color: ${props => props.theme.colors.g3};
        border: none;
        width: 60px;
        height: 34px;
        display: block;
        position: relative;
        cursor: pointer;
        border-radius: 5px;
        transition: .25s;
        .checkem {
            transition: .25s;
            position: absolute;
            right: 8px;
            bottom: 8px;
            z-index: 50;
            opacity: 0;
            color: ${props => props.theme.colors.primary};
        }
        ${({active, theme}) => active && `
            background-color: ${theme.colors.primary};
            .checkem {
                opacity:1;
            }
        `}
    :before {
        background-color: ${props => props.theme.colors.white};
        bottom: 4px;
        content: "";
        height: 26px;
        left: 4px;
        position: absolute;
        border-radius: 5px;
        transition: .25s;
        width: 26px;
        ${({active}) => active && `
            transform: translateX(26px);
        `}
    }
`;

export const DeleteTIB = styled('button')`
    position: relative;
    width: 38px;
    display: block;
    margin: 0 auto;
    height: 38px;
    border-radius: 50%;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.g3};
    color: ${props => props.theme.colors.white};
        font-weight: 700;
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.secondary};
        cursor: pointer;
    }
`;

export const ConfirmDelete = styled('div')`
    position: relative;

    overflow: hidden;
    background-color: ${props => props.theme.colors.white};
    height: 0;
    width: 100%;
    transition: all .3s ease-in-out;
    margin-bottom: 20px;
    ${({open}) => (open) && `
         height: auto;
         border-width: 3px;
    `}
    h3 {
        text-transform: uppercase;
    }
    p {
        border-left: 3px solid ${props => props.theme.colors.secondary};
        padding-left: 5px;
    }
`;

export const BoolButton = styled('button')`
    position: relative;
    padding: 10px 10px;
    width: 100%;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.g3};
    color: ${props => props.theme.colors.white};
    font-weight: 700;
    font-size: .8rem;
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.secondary};
        cursor: pointer;
    }
`;

export const ConfirmDeleteButton = styled(BoolButton)`
    background-color: ${props=>props.theme.colors.primary};
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.secondary};
        cursor: pointer;
    }
`;