import React from 'react';
import { routeResponse } from '../lib/routeResponse';


interface RouteResponseComponentInterface {
    path: string;
}
export default class RouteResponseComponent extends React.Component<RouteResponseComponentInterface> {
    componentDidMount() {
        routeResponse(this.props.path);

    }

    render(){
        return null;
    }
}