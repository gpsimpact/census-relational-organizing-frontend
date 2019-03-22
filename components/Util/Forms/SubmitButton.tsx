import React from 'react';
import styled from '../../../lib/styled';


const Button = styled('button')`
    position: relative;
    padding: 10px 30px;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.green};
    color: ${props => props.theme.colors.white};
    margin-top: ${props=>props.theme.spacing[1]};
    font-weight: 700;

    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.black};
        cursor: pointer;
    }
`;
const SubmitButton = ({loading, value}) => (
    <Button disabled={loading} type="submit">
      {value}
    </Button>
)

export default SubmitButton;