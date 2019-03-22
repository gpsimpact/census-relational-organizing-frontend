import styled from '../../lib/styled';
import { LoginNav } from './LoginNav';
import { AuthedNav } from './AuthedNav';
import { NavA } from '../Util/Typography/Navs';
import Link from 'next/link';

const NavHeader = styled('div')`
    background: ${props => props.theme.colors.g2};
    position: relative;
    z-index: 50;

`;
const NavBarContainer = styled('nav')`
    width: 100%;
    padding: 10px;
    display: -ms-flexbox !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`
const LeftNav = styled('div')`
    margin-right: auto;
    display: -ms-flexbox !important;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
`;
const RightNav = styled('div')`
    margin-left: auto;
    display: -ms-flexbox !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;

`;
export const NavBar = (props:any) => {
    return(
        <NavHeader>
        <div className="container">

        <NavBarContainer>
            <LeftNav>
                <Link href="/"><NavA>BRAND</NavA></Link>
            </LeftNav>

            <RightNav>
                {!props.currentUser && <LoginNav />}
                {props.currentUser && <AuthedNav currentUser={props.currentUser}/>}
            </RightNav>
          
        </NavBarContainer>
        </div>
        </NavHeader>

    )
}