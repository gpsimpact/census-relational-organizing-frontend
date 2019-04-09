import React from "react";
import { Mutation } from 'react-apollo';

interface RunMutationInterface {
    mutate: any;
}
class RunMutation extends React.Component<RunMutationInterface> {
    componentDidMount(){
        const { mutate } = this.props;
        mutate();
    }
    render(){
        return null;
    }
}


const MutationOnMount = ({ children, ...other }) => {
    return (
      <Mutation
        mutation={other.mutation}
        {...other}
      >
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <RunMutation mutate={mutate} />
            { children && children(mutate, { data, loading, error }) }
          </React.Fragment>
        )}
      </Mutation>
    )
  };

export default MutationOnMount;