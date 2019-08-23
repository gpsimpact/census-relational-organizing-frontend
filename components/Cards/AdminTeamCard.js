import React from "react";
import Link from "next/link";
import _ from "lodash";
import { Card, CardHeader, CardInner, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DashPaths, AdminPaths } from '../../paths';
import {Edit} from 'styled-icons/fa-solid/Edit';


export const AdminTeamCard = (props) => {
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
                    <Link href={{pathname: `${DashPaths.index}`, query: { team: team.slug}}}><IconLink href={`${DashPaths.index}?team=${team.slug}`}><i className="fas fa-tachometer-alt"></i> Dashboard </IconLink></Link>
            </CardHeader>

            <CardInner>
                <CardTitle>
                <Link href={{pathname: `${AdminPaths.teams.detail}`, query: { team: team.slug}}}>
                    <a href={`${AdminPaths.teams.detail}?team=${team.slug}`}>
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

    
     
        </Card>
    )
}
