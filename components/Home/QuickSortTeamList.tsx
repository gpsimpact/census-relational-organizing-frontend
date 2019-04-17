import React from "react";
import _ from "lodash";
import styled from '../../lib/styled';
import { CurrentUserInterface } from '../../interfaces/CurrentUserInterface';
import { Box } from '../Util/Layout/Box';
import { PageTitle } from '../Util/Typography/Titles';
import { VertPadTop } from '../Util/Layout/Separators';
import { LoadingBar } from '../Util/Loading/LoadingBar';
import Link from 'next/link';
import { TeamPaths } from '../../paths/index';
import { LinkButton } from '../Util/Typography/Navs';
import { Pending, GroupContainer, Label, Input } from '../Util/Forms/QuickSort';

interface QuickSortInterface {
    currentUser: CurrentUserInterface;
    teams: any;
}

interface State {
    originalTeams: any;
    displayedTeams: any;
    sortOrder: string;
}


export class QuickSortTeamList extends React.Component<QuickSortInerface>{
    state: State = {
        sortOrder: 'asc',
        originalTeams: _.orderBy(this.props.teams, [team => team.name.toLowerCase()], ['asc']),
        displayedTeams: _.orderBy(this.props.teams, [team => team.name.toLowerCase()], ['asc'])
    }
    sortAZ(){
        let teams:any = this.state.displayedTeams;
        let nextOrder:string;
        if(this.state.sortOrder === 'asc'){
            teams = _.orderBy(teams, [team => team.name.toLowerCase()], ['desc']);
            nextOrder = 'desc';
        } else {
            teams = _.orderBy(teams, [team => team.name.toLowerCase()], ['asc']);
            nextOrder = 'asc';
        }
        this.setState({sortOrder: nextOrder, displayedTeams:teams})
    }
    filterList = (e) => {
        let teams:any = this.state.originalTeams;
        let filteredTeams:any = [];
        _.filter(teams, (team) => {
            let name = team.name.toLowerCase();
            let comp = e.target.value.toLowerCase();
            if(name.indexOf(comp) !== -1){
                filteredTeams.push(team);
            }
        })
        this.setState({
            displayedTeams:_.orderBy(filteredTeams, [team => team.name.toLowerCase()], [this.state.sortOrder])
        })
    }
    render(){
        const { currentUser } = this.props;
        return(
            <div>
                <Box>
                    <PageTitle>Teams</PageTitle>
                    <LoadingBar active={false}/>
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
                    </Box>

                    {
                        this.state.displayedTeams && this.state.displayedTeams.map((team, idx) => {

                            return(
                                <Box key={idx}>
                                <div className="row align-items-end">
                                <div className="col-lg-8">
                                    {team && team.name && <h2> {team.name}</h2>}

                                </div>
                                <div className="col-lg-4">
                                    {currentUser && team && team.slug && currentUser.hasTeamPermission(team.slug, 'TEAM')
                                        ?
                                        <Link href={`${TeamPaths.index}/${team.slug}`}>
                                                <a>
                                                    <LinkButton>
                                                    <i className="fas fa-tachometer-alt"></i> Dashboard
                                                    </LinkButton>
                                                </a>
                                        </Link>
                                        :
                                        currentUser && team && team.slug && currentUser.hasTeamPermission(team.slug, 'APPLICANT')
                                        ?
                                            <Pending>Pending Approval </Pending>
                                        :
                                        currentUser && team && team.slug 
                                        ?
                                        <div> Need Mutation for applying </div>
                                        :
                                        !currentUser && team && team.slug
                                        ?
                                            <Link href={`${PublicPaths.team}/${team.slug}`}>
                                                 <a>
                                                    <LinkButton>
                                                    <i className="fas fa-user-plus"></i>Register
                                                    </LinkButton>
                                                </a>
                                            </Link>
                                        :
                                        null
                                    }
                                  
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    {team && team.description && <p> {team.description}</p>}
                                </div>
                            </div>
                            </Box>
                            )
                        })
                    }
            </div>
        )
    }
}