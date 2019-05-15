import React from "react";
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ErrorIcon } from '../Util/Loading';
import { marshallResponse } from '../../lib/helpers';

import { SumWrapper, SumCountTitle, SumCountNum } from '../Util/Layout';

export const ADMIN_TEAM_COUNTS= gql`
    query adminGetTeamCounts{
        summaryCountTeams
    }
`;

export class TeamCounts extends React.Component {
    render(){
        return(
            <Query query={ADMIN_TEAM_COUNTS}>
                {({data, loading, error})=>{
                    let errormessage=null;
                    if(error && error.networkError && error.networkError.result && error.networkError.result.errors && error.networkError.result.errors.length > 0){
                        errormessage = {
                            code: "Uh Oh",
                            success: false,
                            message: error.networkError.result.errors[0].message
                        }
                    }
                    return(
                        <SumWrapper>
                            <SumCountTitle>Total Teams</SumCountTitle>
                            {data && data.summaryCountTeams && <SumCountNum> {data && data.summaryCountTeams}</SumCountNum>}
                            {errormessage && <ErrorIcon error={errormessage}/>}
                        </SumWrapper>
                    )
                }}
            </Query>

        )
    }
}