import React from 'react';
import styled from '../../lib/styled';
import { Query } from 'react-apollo';
import { SIDENAV_OPEN_QUERY } from '../../graphql/local/sidenav';


const SideNavContainer = styled('div')<{sideNavOpen: boolean}>`
    height: calc(100% - 63px);
    position:fixed;
    padding-top: 30px;
    overflow-y:scroll;
    overflow-x:hidden;
    width: 200px;
    left: -200px;
    background: ${props => props.theme.colors.green};

    ${({sideNavOpen}) => sideNavOpen && `left: 0px;`}
`;
interface SideNavInterface {
    navComponent: any;
}
export const SideNav = (props:SideNavInterface) => {
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
