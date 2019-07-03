import styled from 'styled-components';

export const Hero = styled('section')`
    position: relative;
    z-index: 1;
    background-image: url('https://civic-promotor.s3-us-west-2.amazonaws.com/images/flag.jpg');
    padding: 200px 0px;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    color: ${props => props.theme.colors.white};
    &:after {
        content: "";
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
        position: absolute;
        z-index: 2;
        opacity: .8;
        background-color: ${props => props.theme.colors.black};
    }
    * {
        position: relative;
        z-index: 25;
    }
`;