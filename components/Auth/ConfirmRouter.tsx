import React from 'react';
import  Router  from 'next/router';
import {LoadingBar} from '../Util/Loading/LoadingBar';
import { VertPadTop } from '../Util/Layout/Separators';


interface ConfirmRouterInterface {
    token: string;
    routeResponse: any;
    nextPage: string;
    mutation: any;
}
export default class ConfirmRouter extends React.Component<ConfirmRouterInterface> {
    async componentDidMount() {
        let confirmRes = await this.props.mutation({variables:{token:this.props.token}});
        console.log(confirmRes);

    }

    render(){
        return (
            
            <LoadingBar active={true}/>
        )
    }
}