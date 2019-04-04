import Link from 'next/link';
import { CrudNavUL, CrudNavLI, CrudNavA } from '../../Util/Typography/Navs';
import { CurrentUserInterface } from '../../../interfaces/CurrentUserInterface';
import { AdminPaths } from '../../../paths/index';




interface AdminTeamNavInterface {
    currentUser: CurrentUserInterface
}

export const AdminTeamNav = (props:AdminTeamNavInterface) => {
    const { currentUser } = props;
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                
        <CrudNavUL>
                {currentUser.hasGlobalPermission('ADMIN_TEAMS') && 
                    <CrudNavLI><Link href={`${AdminPaths.teams.index}`}><CrudNavA><i className="fas fa-clipboard-list"></i> Team List</CrudNavA></Link></CrudNavLI>
                }
                {currentUser.hasGlobalPermission('ADMIN_TEAMS_CRUD') && 
                    <CrudNavLI><Link href={`${AdminPaths.teams.create}`}><CrudNavA><i className="fas fa-folder-plus"></i> New Team</CrudNavA></Link></CrudNavLI>
                }
                
        </CrudNavUL>
                </div>
            </div>
        </div>
   
    )
}