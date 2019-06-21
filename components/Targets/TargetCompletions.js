import React from "react";
import PropTypes from 'prop-types';


export class TargetCompletions extends React.Component {

    render(){
        let { target } = this.props;
        return(
            <div>Target Completions</div>
        )
    }
}


TargetCompletions.propTypes = {
    target: PropTypes.object.isRequired,
}