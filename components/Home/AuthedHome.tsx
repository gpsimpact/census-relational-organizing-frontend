import React from "react";
import _ from "lodash";
import { CurrentUserInterface } from '../../interfaces/CurrentUserInterface';
import { Box } from '../Util/Layout/Box';
import { PageTitle } from '../Util/Typography/Titles';
import { VertPadTop } from '../Util/Layout/Separators';
import { LoadingBar } from '../Util/Loading/LoadingBar';
import Link from 'next/link';
import { TeamPaths, PublicPaths } from '../../paths/index';
import { LinkButton } from '../Util/Typography/Navs';
import { Pending, GroupContainer, Label, Input } from '../Util/Forms/QuickSort';
import { SimpleAnchor } from '../Util/Typography/Anchors';

interface AuthedHomeInterface {
    currentUser: CurrentUserInterface;
}
interface State {
    originalPerms: any;
    displayedPerms: any;
    sortOrder: string;
}



export class AuthedHome extends React.Component<AuthedHomeInterface>{
    state: State = {
        originalPerms: _.orderBy(this.props.currentUser.teamPermissions, [perm => perm.team.name.toLowerCase()], ['asc']),
        displayedPerms: _.orderBy(this.props.currentUser.teamPermissions, [perm => perm.team.name.toLowerCase()], ['asc']),
        sortOrder: 'asc',
    }
    sortAZ(){
        let perms:any = this.state.displayedPerms;
        let nextOrder:string;
        if(this.state.sortOrder === 'asc'){
            perms = _.orderBy(perms, [perm => perm.team.name.toLowerCase()], ['desc']);
            nextOrder = 'desc';
        } else {
            perms = _.orderBy(perms, [perm => perm.team.name.toLowerCase()], ['asc']);
            nextOrder = 'asc';
        }
        this.setState({sortOrder: nextOrder, displayedPerms:perms})
    };

    filterList = (e) => {
        let perms:any = this.state.originalPerms;
        let filteredPerms:any = [];
        _.filter(perms, (perm, idx) => {
            let name = perm.team.name.toLowerCase();
            let comp = e.target.value.toLowerCase();
            if(name.indexOf(comp) !== -1){
                filteredPerms.push(perm);
            }
        })
        this.setState({
            displayedPerms:_.orderBy(filteredPerms, [perm => perm.team.name.toLowerCase()], [this.state.sortOrder])
        })
    }
    
    render(){
        return(
            <div>
            
                <VertPadTop/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <Box>
                                <div className="row">
                                    <div className="col-lg-8">
                                        <PageTitle>Your Teams</PageTitle>
                                   
                                    </div>
                                    <div className="col-lg-4">
                                        <Link href={`${PublicPaths.teams}`}>
                                            <SimpleAnchor>
                                                All Teams
                                            </SimpleAnchor>
                                        </Link>
                        
                                    </div>
                                </div>
                                <LoadingBar active={false}/>
                                {
                                    this.props.currentUser && this.props.currentUser.teamPermissions && this.props.currentUser.teamPermissions.length > 1 &&
                                <div className="row align-items-end">
                                    <div className="col-lg-8">
                                        <GroupContainer>
                                            <Label htmlFor="name" id="name"> Quick Filter By Team Name</Label>
                                            <Input onChange={this.filterList} id="name" name="name" placeholder="Team name" autocomplete="off" />
                                        </GroupContainer>
                                    </div>
                                    <div className="col-lg-4">
                                            <LinkButton onClick={()=> this.sortAZ()}>{this.state.sortOrder === 'asc' ? <i className="fas fa-sort-alpha-down"></i> :<i className="fas fa-sort-alpha-up"></i>} Sort </LinkButton>
                                    </div>
                                </div>
                                }
                            </Box>

                            {
                                this.props.currentUser && this.props.currentUser.teamPermissions && this.props.currentUser.teamPermissions.length > 0 && this.state.displayedPerms.map((perm, idx) => {
                                    let pending = perm.permissions && perm.permissions.includes('APPLICANT');
                                    let ta = perm.permissions && perm.permissions.includes('TEAM');
                                    if(pending || ta) {
                                        return(
                                            <Box key={idx}>
                                                <div className="row align-items-end">
                                                    <div className="col-lg-8">
                                                        {perm.team && perm.team.name && <h2> {perm.team.name}</h2>}

                                                    </div>
                                                    <div className="col-lg-4">
                                                        {
                                                            ta ?
                                                            <Link href={`${TeamPaths.index}/${perm.team.slug}`}>
                                                                    <a>
                                                                        <LinkButton>
                                                                        <i className="fas fa-tachometer-alt"></i> Dashboard
                                                                        </LinkButton>
                                                                    </a>
                                                            </Link>
                                                            :
                                                            <Pending>Pending Approval </Pending>
                                                        }
                                                      
                                                    </div>
                                                    
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        {perm.team && perm.team.description && <p> {perm.team.description}</p>}
                                                    </div>
                                                </div>
                                            </Box>
                                        )
                                    }
                                    return null;
                                })
                            }

                        </div>
                    </div>
                </div>
              
            </div>
        )
    }
}