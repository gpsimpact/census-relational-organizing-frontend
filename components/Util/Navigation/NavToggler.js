import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import { SIDENAV_OPEN_QUERY, TOGGLE_SIDENAV_MUTATION } from '../../QueryComponents/SideNavContainer';

const NavIconContainer = styled('a')`
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${({ sideNavOpen }) => (sideNavOpen) && `
        
        
    `}
`;
const NavIconSpacer = styled('div')`
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const NavToggler = (props) => {
    if(props.disableSideNav){return(<NavIconSpacer/>)};
    return(
        <Mutation mutation={TOGGLE_SIDENAV_MUTATION}>
            {(toggleNav) => {
                return(
                    <Query query={SIDENAV_OPEN_QUERY}>
                        {({data: {sideNavOpen}}) => {
                            return(
                                <NavIconContainer 
                                onClick={() => toggleNav()}
                                sideNavOpen={sideNavOpen}
                            > 
                            <i className="fas fa-bars"></i>
                            </NavIconContainer>
                            )
                        }}
                    </Query>
                )
            }}
        </Mutation>
    )
}