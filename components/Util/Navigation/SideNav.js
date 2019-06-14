
import styled from 'styled-components';
import { SIDENAV_OPEN_QUERY } from '../../QueryComponents/SideNavContainer';
import { Query } from 'react-apollo';


const SideNavContainer = styled('div')`
height: 100%;
padding-top: 30px;
overflow-y:scroll;
overflow-x:hidden;
position: absolute;
width: 200px;
left: -200px;
-webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
background: ${props => props.theme.colors.tertiary};

${({sideNavOpen}) => sideNavOpen && `left: 0px;`}
`;

export const SideNav = (props) => {
    return(
        <Query query={SIDENAV_OPEN_QUERY}>
        {({data: {sideNavOpen}})=>{
                    return(
                        <SideNavContainer sideNavOpen={sideNavOpen}>
                            {props.navComponent}
                        </SideNavContainer>
                    )
                }}
        </Query>
    )
}