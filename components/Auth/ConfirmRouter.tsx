import React from 'react';
import  Router  from 'next/router';
import {LoadingBar} from '../Util/Loading/LoadingBar';


export default class ConfirmRouter extends React.Component<any> {
    async componentDidMount() {
        try {
            const confirmRes = await this.props.mutation({variables:{token:this.props.token}});
            if(confirmRes && confirmRes.data && confirmRes.data.confirmLogin && confirmRes.data.confirmLogin.success){
                if(this.props.nextPage){
                    //@ts-ignore
                    Router.push(this.props.nextPage);
                }
                //@ts-ignore
                Router.push('/');
            } else {
                //@ts-ignore
                Router.push('/uh-oh');
            }
        }
        catch (e){
            //@ts-ignore
            Router.push('/uh-oh');
        }
      
    }

    render(){
        return (
            <LoadingBar active={true}/>
        )
    }
}