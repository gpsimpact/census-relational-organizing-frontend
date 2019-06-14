import React from "react";
import Link from "next/link";
import _ from "lodash";
import { Card, CardHeader, CardInner, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import { CardInfoPoint } from './CardInfoPoint';
import { DashPaths } from '../../paths';

export const TargetCard = ( props ) => {
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
                    <Link href={{pathname: `${DashPaths.targets.detail}`, query: { team: team.slug, target:target.id}}}><IconLink href={`${DashPaths.targets.detail}?team=${team.slug}&target=${target.id}`}><i className="fas fa-user"></i> Profile </IconLink></Link>
            </CardHeader>

            <CardInner>
                <CardTitle>{target.firstName ? target.firstName : ' -- '} {target.lastName ? target.lastName : ' -- '}</CardTitle>
                <CardInfoPoint icon={'fas fa-phone'} infoPoint={target.phone ? target.phone : ' -- '}/>
                <CardInfoPoint icon={'far fa-envelope'} infoPoint={target.email ? target.email : ' -- '}/>
                <CardInfoPoint icon={'fas fa-map-marker-alt'} infoPoint={address} infoPoint2={`${city}, ${state} ${zip5}`}/>
                <CardInfoPoint icon={'fas fa-home'} infoPoint={target.householdSize ? `${target.householdSize} in Household` : ' -- '}/>
            </CardInner>

        </Card>
    )
}