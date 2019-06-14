import Link from 'next/link';
import { AdminPaths } from '../../../paths/index';
import { SNavUl, SNavA, SNavLi } from '../../Util/Navigation';


export const SideNav = (props) => {
    if(!props.currentUser){
        return null;
    }
    const { currentUser } = props;
    return(
        <SNavUl>
            {currentUser.hasGlobalPermission('ADMIN') && 
                <SNavLi><Link href={AdminPaths.index}><SNavA href={AdminPaths.index}>Admin</SNavA></Link></SNavLi>
            }
            {currentUser.hasGlobalPermission('ADMIN') &&
                <SNavLi> <Link href={AdminPaths.teams.index}><SNavA href={AdminPaths.teams.index}>Teams</SNavA></Link></SNavLi>
            }
              {currentUser.hasGlobalPermission('ADMIN') &&
                <SNavLi> <Link href={AdminPaths.gtibs.index}><SNavA href={AdminPaths.gtibs.index}>GTIBS</SNavA></Link></SNavLi>
            }
        </SNavUl>
    )
}