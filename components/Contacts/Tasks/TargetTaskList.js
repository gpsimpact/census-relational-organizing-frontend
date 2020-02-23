import React from "react";
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import { LoadingBar,ErrorMessage } from '../../Util/Loading';
import { H4 } from "../../Util/Typography";
import { SingleTask } from './SingleTask';
import _ from 'lodash';

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
            complete(targetId: $targetId)
            notAvailableBeforeTs
            notAvailableAfterTs
            sortValue
            supplementalFields {
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
    }
`;
export class TargetTaskList extends React.Component {

    render(){
        const { target, currentUser, t } = this.props; 
        return(
            <Query query={GET_TARGET_TASKS}
            variables={{targetId: target.id}}>
            {({data, loading, error}) => {
                const tasksRaw = data && data.targetTasks ? data.targetTasks : null;
                let tasks;
                if(tasksRaw){
                    tasks = _.orderBy(tasksRaw, ['sortValue']);
                    return(
                        <div>
                            {error && <ErrorMessage error={error}/>}
                            {tasks && tasks.length > 0 &&
                                tasks.map((task, idx) => {
                                    return(
                                        <SingleTask key={idx} task={task} target={target} currentUser={currentUser} t={t} />
                                    )
                                })
                            }
                             {data && data.targetTasks && data.targetTasks.length <= 0 &&
                                <H4 primary>{target.firstName} {target.lastName} does not have any available tasks.</H4>
                            }
                        </div>
                    )
                }
                if(loading){
                    return "loading ..."
                }
                return null;
            
            }}

            </Query>
        )
    }
}