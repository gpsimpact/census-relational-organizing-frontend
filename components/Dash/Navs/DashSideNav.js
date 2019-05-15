import Link from 'next/link';
import { DashPaths } from '../../../paths/index';
import { SNavUl, SNavA, SNavLi } from '../../Util/Navigation';


export const DashSideNav = (props) => {
    if(!props.currentUser){
        return null;
    }
    const { currentUser,currentTeam } = props;
    return(
        <SNavUl>
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
              <SNavLi><Link href={{pathname: `${DashPaths.index}`, query: {team: currentTeam.slug}}}><SNavA>Dash</SNavA></Link></SNavLi>
            }
        </SNavUl>
    )
}