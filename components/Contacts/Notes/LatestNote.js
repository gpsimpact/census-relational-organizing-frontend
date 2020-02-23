import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { HR } from '../../Util/Layout';
import { H3, H4, H5 } from '../../Util/Typography';
import Moment from 'react-moment';

export const GET_CONTACT_NOTE = gql`
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
export class LatestNote extends React.Component {
    render(){
        const { target, dataFromParent } = this.props;
        return(
            <Query query={GET_CONTACT_NOTE}
                            variables={{
                                    input: {
                                        targetId: target.id,
                                        where: {
                                            AND: [
                                                {active: {eq: true}}
                                            ]
                                        },
                                        limit: 1,
                                        sort: {
                                            createdAt: "DESC"
                                        }
                                
                                    }
                                }}
            >
                {({data, loading, error}) => {
                    
                    return(
                        <div>
                           { 
                               data && data.targetNotes && data.targetNotes.items && data.targetNotes.items.length > 0
                               && data.targetNotes.items.map((TN, idx) => {
                                    return(
                                        <div key={idx}>
                                            <HR/>
                                    <H3 uppercase>{dataFromParent('LATEST NOTE')}</H3>

                                            <H5 uppercase>{dataFromParent('CREATED')}: <small><Moment fromNow ago>{TN.createdAt}</Moment> ago</small></H5>
                                            <p className="pb-1">{TN.content}</p>
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