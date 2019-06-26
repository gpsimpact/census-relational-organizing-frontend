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
                <SNavLi> <Link href={AdminPaths.tibs.questions}><SNavA href={AdminPaths.tibs.questions}>Questions</SNavA></Link></SNavLi>
            }
            {currentUser.hasGlobalPermission('ADMIN') &&
                <SNavLi> <Link href={AdminPaths.tibs.actions}><SNavA href={AdminPaths.tibs.actions}>Actions</SNavA></Link></SNavLi>
            }
        </SNavUl>
    )
}