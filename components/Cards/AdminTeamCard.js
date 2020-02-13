import React from "react";
import Link from "next/link";
import _ from "lodash";
import { Card, CardHeader, CardInner, CardFooter, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DashPaths, AdminPaths } from '../../paths';
import {Edit} from 'styled-icons/fa-solid/Edit';

import { useTranslation } from 'react-i18next';


export const AdminTeamCard = (props) => {
    const { t } = useTranslation();
    const { team } = props;
    const allowedPerms = ["APPLICANT", "MEMBER", "ADMIN"]

    // functional lookup
    const defaultToZero = collection => permission => ({
    permission,
    count: _.get(_.find(collection, { permission }), 'count', 0)
    })

    // partial application to query results
    const paDefaultToZero = defaultToZero(team.userPermissionSummaryCounts)

    // make result
    const permCounts = _(allowedPerms).map(paDefaultToZero).value()

    return(
        <Card>
            <CardHeader>
            </CardHeader>

            <CardInner>
                <CardTitle>
                <Link href={{pathname: `${AdminPaths.teams.detail}`, query: { team: team.id}}}>
                    <a href={`${AdminPaths.teams.detail}?team=${team.id}`}>
                        <Row bsPrefix={'row align-items-center'}>
                            <Col xs={9}>
                                 {team.name}

                            </Col>
                            <Col xs={3}>
                                 <Edit/>

                            </Col>
                        </Row>
                    </a>
                    </Link>

                </CardTitle>
                <CardParagraph>{team.description}</CardParagraph>

                <CardSubTitle> Users </CardSubTitle>
                <PermContainer>
                        {permCounts.map((perm, idx) => {
                        
                            return(
                                <Row key={idx}>
                                    <Col xs={8}>
                                        <PermTitle>{perm.permission}</PermTitle>
                                    </Col>
                                    <Col xs={4}>
                                        <PermCount>{perm.count}</PermCount>
                                    </Col>
                                </Row>


                                )
                            })}
                </PermContainer>
            </CardInner>
            <CardFooter>
                    <Link href={{pathname: `${DashPaths.index}`, query: { team: team.id}}}><IconLink href={`${DashPaths.index}?team=${team.id}`}><i className="fas fa-tachometer-alt"></i> {t('DASHBOARD')} </IconLink></Link>

            </CardFooter>

    
     
        </Card>
    )
}
