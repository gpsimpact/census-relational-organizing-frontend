import React from "react";
import PropTypes from 'prop-types';
import { H2, H3 } from '../Util/Typography';
import { ProgressBar } from '../Util/Layout';
import _ from 'lodash';


export class ActionProgress extends React.Component {

    render(){
        let { target } = this.props;
        let actionTibs = _.filter(target.tibs, {tibType: 'ACTION'}).length;
        let completeActionTibs = _.filter(target.tibs, {tibType: 'ACTION', isApplied:true}).length;
        let completionPercent = (completeActionTibs / actionTibs) * 100;
        return(
            <div>
                <H3 uppercase> Actions Completed: {completeActionTibs} / {actionTibs}</H3>
                <ProgressBar percent={`${completionPercent}%`}/>
            </div>
        )
    }
}


ActionProgress.propTypes = {
    target: PropTypes.object.isRequired,
}