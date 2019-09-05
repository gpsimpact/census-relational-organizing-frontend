
import { UPDATE_NOTE } from './EditNote';
import { GET_CONTACT_NOTES } from './ListNotes';
import { Mutation } from 'react-apollo';
import { SecondaryButton } from '../../Util/Typography';

export const DeleteNote = (props) => {
    const TN = props.TN;
    const target = props.target;
    return(
        <Mutation mutation={UPDATE_NOTE}
            variables={
                {
                    id: TN.id,
                    input: {
                        active: false
                    }
                }
            }
            refetchQueries={[
                {
                    query: GET_CONTACT_NOTES,
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