import React from "react";
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import { LoadingBar,ErrorMessage } from '../../Util/Loading';
import { H4 } from "../../Util/Typography";
import { SingleTask } from './SingleTask';
export const GET_TARGET_TASKS = gql`
    query targetTasks($targetId: String!){
        targetTasks(targetId: $targetId){
            id
            definition {
                id
                active
                form {
                    id
                    title
                    buttonText
                    redirectRoute
                    description
                    fields {
                        label
                        type
                        name
                        value(targetId: $targetId)
                        selectOptions {
                            value
                            label
                        }
                        placeholder
                        validationTests
                    }
                }
                points
               
                isGloballyAvailable
              
            }
            available(targetId: $targetId){
                available
                nonAvailableCode
            }
            availableTo{
                role
                available
            }
            complete(targetId: $targetId)
            notAvailableBeforeTs
            notAvailableAfterTs
        }
    }
`;
export class TargetTaskList extends React.Component {

    render(){
        const { target, currentUser } = this.props; 
        return(
            <Query query={GET_TARGET_TASKS}
            variables={{targetId: target.id}}>
            {({data, loading, error}) => {
                return(
                    <div>
                        {error && <ErrorMessage error={error}/>}
                        {data && data.targetTasks && data.targetTasks.length > 0 &&
                            data.targetTasks.map((task, idx) => {
                                return(
                                    <SingleTask key={idx} task={task} target={target} currentUser={currentUser}/>
                                )
                            })
                        }
                         {data && data.targetTasks && data.targetTasks.length <= 0 &&
                            <H4 primary>{target.firstName} {target.lastName} does not have any available tasks.</H4>
                        }
                    </div>
                )
            }}

            </Query>
        )
    }
}