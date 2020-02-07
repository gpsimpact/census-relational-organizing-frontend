import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


export const CNavbar = styled(Navbar)`
        background: ${props => props.theme.colors.g2};
        @media (min-width: 768px) {
        padding: 10px 30px;

        }
        .navbar-toggler {
        color: ${props => props.theme.colors.black};
        text-transform: uppercase;
        border: none;
        font-size: 1rem;
        font-weight: normal;
        svg,i {
            margin-top: -4px;
        }
    }
`;

export const Brand = styled(Navbar.Brand)`
        width: 150px;
        max-width: 100%;
        padding: 0;
        display: block;
        height: auto;
        margin: 3px 0px;
        @media (min-width: 768px){
            width: 300px;
        }

        img {
            width: 100%;
            height: auto;
        }
`;

export const CNav = styled(Nav)`
   .nav-link {
        text-transform: uppercase;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        color: ${props => props.theme.colors.tertiary} !important;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.primary} !important;
            cursor: pointer;
        }

   }
`;
export const CNavDropdown = styled(NavDropdown)`
    .dropdown-menu {
        left: auto !important;
        right: 0;
        top: 58px;
        border-radius: 0px;
        border: none;
        background-color: ${props => props.theme.colors.g3};
    }
    .dropdown-item {
        text-transform: uppercase;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        color: ${props => props.theme.colors.tertiary} !important;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.secondary} !important;
            cursor: pointer;
            background-color: ${props => props.theme.colors.g3};
        }
    }
`;

export const ActionNav = styled(Nav)`
    .nav-link {
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 10px;
    display: inline-block;
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.tertiary};
    border: 1px solid ${props => props.theme.colors.g2};
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        cursor: pointer;
    }
    }
`

export const SideNavbar = styled(Navbar)`
    .navbar-toggler {
        color: ${props => props.theme.colors.white};
        text-transform: uppercase;
        border: none;
        font-size: 1rem;
        font-weight: normal;


        svg,i {
            margin-top: -4px;
        }
    }
     @media(min-width: 768px){
        position: fixed;
        max-width: 180px;
    }
    @media(min-width: 992px){
        max-width: 190px;
    }
    @media(min-width: 1200px){
        max-width: 200px;
    }
  
`;

export const SideCNav = styled(Nav)`
    @media (min-width: 768px){
        padding-top: 40px;
    }
   .nav-link {
        text-transform: uppercase;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        color: ${props => props.theme.colors.white} !important;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.primary} !important;
            cursor: pointer;
        }

   }
`;