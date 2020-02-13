import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { H3, H4, H5 } from '../../Util/Typography';
import { HR } from '../../Util/Layout'
import Moment from 'react-moment';

export const GET_CONTACT_ATTEMPT = gql`
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
export class MostRecentContactAttempt extends React.Component {
    render(){
        const { target, dataFromParent } = this.props;
        return(
            <Query query={GET_CONTACT_ATTEMPT}
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
                                {data && data.targetContactAttempts && data.targetContactAttempts.items && data.targetContactAttempts.items.length > 0 
                                    && data.targetContactAttempts.items.map((CA, idx) => {
                                        return(
                                            <div key={idx}>
                                                <HR/>

                                                 <H3 uppercase> Latest Contact Attempt</H3>

                                                  <H5 uppercase>{dataFromParent('CREATED')}:  <small><Moment fromNow ago>{CA.createdAt}</Moment> ago</small></H5>
                                                    <H5 uppercase>{dataFromParent('METHOD')}: <small>{CA.method.replace("_", " ")}</small></H5>
                                                    <H5 uppercase>{dataFromParent('CONTACT_DISPOSITION')}: <small>{CA.disposition.replace(/_/g, " ").replace('INPERSON', '').replace('PHONE', '')}</small></H5>
                                            
                                                <p className="pb-1">{CA.content}</p>
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