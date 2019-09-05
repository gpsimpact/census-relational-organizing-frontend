import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { HR } from '../../Util/Layout';
import { H4 } from '../../Util/Typography';

import { EditContactAttempt } from './EditContactAttempt';
import { CreateContactAttempt } from './CreateContactAttempt';

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
export class ListContactAttempts extends React.Component {
    render(){
        const { target } = this.props;
        return(
            <Query query={GET_CONTACT_ATTEMPTS}
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
                                <CreateContactAttempt target={target}/>
                                {data && data.targetContactAttempts && data.targetContactAttempts.items && data.targetContactAttempts.items.length > 0 
                                    && data.targetContactAttempts.items.map((CA, idx) => {
                                        return(
                                            <div key={idx}>
                                                <HR/>
                                                <EditContactAttempt target={target} CA={CA}/>
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