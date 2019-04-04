import styled from '../../lib/styled';
import { Mutation, Query } from 'react-apollo';
import { SIDENAV_OPEN_QUERY, TOGGLE_SIDENAV_MUTATION } from '../../graphql/local/sidenav';


const NavIconContainer = styled('a')<{sideNavOpen: boolean}>`
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
interface NavTogglerInterface {
    disableSideNav?: boolean;
}

export const NavToggler = (props:NavTogglerInterface) => {
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