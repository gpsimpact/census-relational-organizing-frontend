import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { HR } from '../../Util/Layout';
import { H4 } from '../../Util/Typography';
import { EditNote } from './EditNote';
import { CreateNote } from './CreateNote'; 

export const GET_CONTACT_NOTES = gql`
    query targetNotes($input: TargetNotesInput!){
        targetNotes(input:$input){
            hasMore
            totalCount
            items {
                id
                createdAt
                updatedAt
                active
                target {
                    id
                }
                createdBy {
                    id
                }
                lastEditedBy {
                    id
                }
                content
            }
        }
    }
`;
export class ListNotes extends React.Component {
    render(){
        const { target } = this.props;
        return(
            <Query query={GET_CONTACT_NOTES}
                            variables={{
                                    input: {
                                        targetId: target.id,
                                        where: {
                                            AND: [
                                                {active: {eq: true}}
                                            ]
                                        },
                                
                                    }
                                }}
            >
                {({data, loading, error}) => {
                    
                    return(
                        <div>
                            <CreateNote target={target}/>
                           { 
                               data && data.targetNotes && data.targetNotes.items && data.targetNotes.items.length > 0
                               && data.targetNotes.items.map((TN, idx) => {
                                    return(
                                        <div key={idx}>
                                            <HR/>
                                            <EditNote target={target} TN={TN}/>
                                        </div>
                                    )
                               })
                           }
                        </div>
                    )
                }}
            </Query>
        )
    }
}