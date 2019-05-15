
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from "apollo-boost";


export const toggleSideNav = (_, variables, { cache }) => {
    const { sideNavOpen } = cache.readQuery({
      query: SIDENAV_OPEN_QUERY,
    });
    const data = {
      data: { sideNavOpen: !sideNavOpen },
    };
    cache.writeData(data);
    return data;
}

export const SIDENAV_OPEN_QUERY = gql`
    query {
        sideNavOpen @client
    }
`;

export const TOGGLE_SIDENAV_MUTATION = gql`
    mutation{
        toggleSideNav @client
    }
`;
export const StyledPageContainer = styled('div')`
    margin: 0 0;
    min-height: 100%;
    width: 100%;
    left: 0%;
    padding-bottom: 50px;
    position: relative;
    border-top: 1px solid ${props => props.theme.colors.g3};
    -ms-overflow-style: scrollbar;
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
    
    ${({sideNavOpen}) => sideNavOpen && `
            width: calc(100% - 200px);
            left: 200px;
        `};
    ${({padTop}) => padTop && `padding-top: 2rem`};

`;

export const PageContainerInner = (props) => {
    if(props.disableSideNav){
        return(
            <StyledPageContainer padTop={props.padTop} sideNavOpen={false}>{props.children}</StyledPageContainer>
        )
    }
    return(
        <Query query={SIDENAV_OPEN_QUERY}>
        {({data: {sideNavOpen}})=>{
            return(
                <StyledPageContainer padTop={props.padTop} sideNavOpen={sideNavOpen}>{props.children}</StyledPageContainer>
            )
        }}
        </Query>
    )
}