
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import { SideNavbar, SideCNav } from './Styles';
import  MenuIcon  from '@material-ui/icons/Menu';
const SideNavContainer = styled('div')`
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background: ${props => props.theme.colors.tertiary};
    position: relative;
    @media (min-width: 1200px){
        min-height: 80vh;
    }
   

`;

export const SideNav = ({...props})=> {
    return(
        <SideNavContainer>
            <SideNavbar expand="md">
                <Navbar.Toggle bsPrefix={'navbar-toggler ml-auto'} aria-controls="sidenav" label={'Menu'}> Dash Menu <MenuIcon/></Navbar.Toggle>
                <Navbar.Collapse id='sidenav'>
                    <SideCNav className="flex-column">
                            {props.sideNavComponent}
                  
                    </SideCNav>
                </Navbar.Collapse>
            </SideNavbar>

        </SideNavContainer>
    )
}
SideNav.propTypes = {
    sideNavComponent: PropTypes.any
}