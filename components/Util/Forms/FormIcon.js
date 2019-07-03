import styled from 'styled-components';

const IconWrapper = styled('div')`
        display: block;
        margin: 10px auto;
        text-align:center;
    i,svg {
        font-size: 2rem;
    }
`;

export const FormIcon = ({icon}) => {
    return(
        <IconWrapper>
            {icon}
        </IconWrapper>
    )
}