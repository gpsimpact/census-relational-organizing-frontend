
import { UPDATE_CONTACT_ATTEMPT } from './EditContactAttempt';
import { GET_CONTACT_ATTEMPTS } from './ListContactAttempts';
import { Mutation } from 'react-apollo';
import { SecondaryButton } from '../../Util/Typography';

export const DeleteContactAttempt = (props) => {
    const CA = props.CA;
    const target = props.target;
    return(
        <Mutation mutation={UPDATE_CONTACT_ATTEMPT}
            variables={
                {
                    id: CA.id,
                    input: {
                        active: false
                    }
                }
            }
            refetchQueries={[
                {
                    query: GET_CONTACT_ATTEMPTS,
                    variables: {
                        input: {
                            targetId: target.id,
                            where: {
                                AND: [
                                    {active: {eq: true}}
                                ]
                            },
                            sort: {
                                updatedAt: "DESC"
                            }

                        }
                    }
                }
            ]}
        >
            {(mutation, {data, loading, error}) => (
                <SecondaryButton
                    onClick={async () => mutation()}
                >Delete</SecondaryButton>
            )}
        </Mutation>
    )
}