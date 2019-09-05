import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { HR } from '../../Util/Layout';
import { H4 } from '../../Util/Typography';

import { EditContactAttempt } from './EditContactAttempt';
export const GET_CONTACT_ATTEMPTS = gql`
    query targetContactAttempts($input: TargetContactAttemptsInput!){
        targetContactAttempts(input:$input){
            hasMore
            totalCount
            items {
                id
                createdAt
                updatedAt
                active
                createdBy {
                    id
                    email
                }
                lastEditedBy {
                    id
                    email
                }
                content
                disposition
                method
            }
        }
    }
`;

export const ListContactAttempts = (props) => {
    return (
        <Query query={GET_CONTACT_ATTEMPTS}
            variables={{input:{
                targetId: props.target.id,
                where: {
                    AND: [
                        {active: {eq: true}}
                    ]
                },
                sort: {
                    updatedAt: "DESC"
                }
            }}}
        >
            {({data,loading,error}) => {
                return(
                    <div>
                        {data && data.targetContactAttempts && data.targetContactAttempts.items && data.targetContactAttempts.items.length > 0 
                        && data.targetContactAttempts.items.map((CA, idx) => {
                            return(
                                <div key={idx}>
                                  <HR/>
                                    <EditContactAttempt target={props.target} CA={CA}/>
                                </div>
                            )
                        })
                        }
                        {data && data.targetContactAttempts && data.targetContactAttempts.items && data.targetContactAttempts.items.length <= 0 
                        && 
                        <H4>No logged contact attempts</H4>
                        }
                    </div>
                )
            }}

        </Query>
    )
}