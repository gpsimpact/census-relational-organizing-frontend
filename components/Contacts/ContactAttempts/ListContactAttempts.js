import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { HR } from '../../Util/Layout';
import { H4, H5 } from '../../Util/Typography';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EditContactAttempt } from './EditContactAttempt';
import { CreateContactAttempt } from './CreateContactAttempt';
import Moment from 'react-moment';

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
                            sort: {createdAt: 'DESC'}
                    
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
                                                  <H5 uppercase>Created:  <small><Moment fromNow ago>{CA.createdAt}</Moment> ago</small></H5>
                                                    <H5 uppercase> Method: <small>{CA.method.replace(/_/g, " ")}</small></H5>
                                                    <H5 uppercase> Disposition: <small>{CA.disposition.replace(/_/g, " ").replace('INPERSON', '').replace('PHONE', '')}</small></H5>
                                            
                                                <p className="pb-1">{CA.content}</p>
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