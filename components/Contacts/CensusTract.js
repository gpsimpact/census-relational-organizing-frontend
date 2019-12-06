import React from "react";
import PropTypes from 'prop-types';
import { H3, H5 } from '../Util/Typography';
import { HR } from '../Util/Layout';

export class CensusTract extends React.Component {

    render(){
        let { target } = this.props;
        return(
            <div>
                <H3 uppercase> Census Tract:</H3>
                <H5 secondary> {target.censusTract ? target.censusTract : "N/A"} </H5>
            </div>
        )
    }
}


CensusTract.propTypes = {
    target: PropTypes.object.isRequired,
}