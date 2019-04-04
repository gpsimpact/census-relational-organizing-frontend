import styled from '../../../lib/styled';
import { Query } from 'react-apollo';
import { SIDENAV_OPEN_QUERY } from '../../../graphql/local/sidenav';

export const Footer = styled('footer')`
    padding: 75px 0px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    text-align: center;
`;

export const PageContent = styled('div')`
    min-height: 55vh;
    position: relative;
`;


export const PageContainer = styled('div')`
  margin: 0 0;
  min-height: 100%;
  width: 100%;
  position: relative;
  -ms-overflow-style: scrollbar;
`;

const StyledPageContainer = styled('div')<{sideNavOpen:boolean}>`
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
`}
`;
export const PageContainerInner = (props:any) => {
    if(props.disableSideNav){
        return(
            <StyledPageContainer sideNavOpen={false}>{props.children}</StyledPageContainer>
        )
    }
    return(
        <Query query={SIDENAV_OPEN_QUERY}>
        {({data: {sideNavOpen}})=>{
            return(
                <StyledPageContainer sideNavOpen={sideNavOpen}>{props.children}</StyledPageContainer>
            )
        }}
        </Query>
    )
}


