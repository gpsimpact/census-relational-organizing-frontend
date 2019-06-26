import React from "react";
import PropTypes from 'prop-types';
import { FormTitle, SectionTitle } from '../Util/Typography';
import { ProgressBar } from '../Util/Layout';
import _ from 'lodash';


export class TargetCompletions extends React.Component {

    render(){
        let { target } = this.props;
        let actionTibs = _.filter(target.tibs, {tibType: 'ACTION'}).length;
        let completeActionTibs = _.filter(target.tibs, {tibType: 'ACTION', isApplied:true}).length;
        let completionPercent = (completeActionTibs / actionTibs) * 100;
        console.log(completionPercent);
        return(
            <div>
                <FormTitle>Progress</FormTitle>
                <SectionTitle> Actions Completed: {completeActionTibs} / {actionTibs}</SectionTitle>
                <ProgressBar percent={`${completionPercent}%`}/>
            </div>
        )
    }
}


TargetCompletions.propTypes = {
    target: PropTypes.object.isRequired,
}