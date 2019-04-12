import React from "react";
import { AdminGetTeamCountsComponent } from "../../../generated/apolloComponents";
import { SumCountTitle, SumCountNum, SumWrapper } from "../../Util/Typography/Sums";

export class AdminSummaryCount extends React.Component<any>{
    render(){
        return(
            <AdminGetTeamCountsComponent>
                {({data, loading, error}) => {
                    console.log(data);
                    return(
                        <SumWrapper>
                                <SumCountTitle>Total Teams</SumCountTitle>
                                <SumCountNum> {data && data.summaryCountTeams}</SumCountNum>
                        </SumWrapper>
                    )
                }}

            </AdminGetTeamCountsComponent>
            
        )
    }
}