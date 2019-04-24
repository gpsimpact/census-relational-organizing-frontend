import styled from '../../../lib/styled';


export const ButtonPrimary = styled('button')<{width?:string}>`
    position: relative;
    padding: 10px 30px;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.green};
    color: ${props => props.theme.colors.white};
    margin-top: ${props=>props.theme.spacing[1]};
    font-weight: 700;
    margin-bottom: ${props => props.theme.spacing[3]};
    ${({width}) => width && `
        width: ${width};
    `}
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.black};
        cursor: pointer;
    }
`;