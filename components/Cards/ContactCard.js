import React from "react";
import Link from "next/link";
import _ from "lodash";
import { Card, CardHeader, CardInner, CardTitle, IconLink } from './Styles';
import { CardInfoPoint } from './CardInfoPoint';
import { DashPaths } from '../../paths';


import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Place from '@material-ui/icons/Place';
import Home from '@material-ui/icons/Home';


export const ContactCard = ( props ) => {
    const { target, team } = props;

    let address = ' -- ';
    if(target.address){
        address = target.address;
    };

    let city = ' -- ';
    if(target.city) {
        city=target.city;
    }
    let state = ' -- ';
    if(target.state){
        state = target.state;
    }
    let zip5 = ' -- ';
    if(target.zip5){
        zip5 = target.zip5;
    }

    return(
        <Card>
            <CardHeader>
                    <Link href={{pathname: `${DashPaths.contacts.detail}`, query: { team: team.slug, target:target.id}}}><IconLink href={`${DashPaths.contacts.detail}?team=${team.slug}&target=${target.id}`}><i className="fas fa-user"></i> Profile </IconLink></Link>
            </CardHeader>

            <CardInner>
                <CardTitle>{target.firstName ? target.firstName : ' -- '} {target.lastName ? target.lastName : ' -- '}</CardTitle>
                <CardInfoPoint icon={<Phone/>} infoPoint={target.phone ? target.phone : ' -- '}/>
                <CardInfoPoint icon={<Email/>} infoPoint={target.email ? target.email : ' -- '}/>
                <CardInfoPoint icon={<Place/>} infoPoint={address} infoPoint2={`${city}, ${state} ${zip5}`}/>
                <CardInfoPoint icon={<Home/>} infoPoint={target.householdSize ? `${target.householdSize} in Household` : ' -- '}/>
            </CardInner>

        </Card>
    )
}