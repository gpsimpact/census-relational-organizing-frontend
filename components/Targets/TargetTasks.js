import React from "react";
import PropTypes from 'prop-types';


export class TargetTasks extends React.Component {

    render(){
        let { target } = this.props;
        return(
            <div>Target Tasks</div>
        )
    }
}


TargetTasks.propTypes = {
    target: PropTypes.object.isRequired,
}