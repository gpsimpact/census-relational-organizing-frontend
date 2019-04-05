import React from "react";
import styled from "../../lib/styled";
import Link from "next/link";
import { AdminPaths } from '../../paths/index';


export const AdminTableContainer = styled('div')`
    margin-bottom: ${props => props.theme.spacing[3]};
`;

export const AdminList = styled('ul')`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    border-top: 1px solid ${props => props.theme.colors.black};
    border-bottom: 1px solid ${props => props.theme.colors.black};
    border-left: 4px solid ${props => props.theme.colors.black};
    border-right: 4px solid ${props => props.theme.colors.black};

    &:hover {
        background-color: ${props=> props.theme.colors.g2};
    }
    :last-of-type{
        border-bottom: 4px solid ${props => props.theme.colors.black};

    }
    :first-of-type {
        border-top: 4px solid ${props => props.theme.colors.black};

    }
`;

export const AdminListDetailLI = styled('li')`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[3]};
    a {
        text-decoration: none;
        font-size: ${props => props.theme.fontSize[2]};
        text-transform: uppercase;
        color: ${props => props.theme.colors.blue};
    }

`;

export const AdminListItem = styled('li')<{itemMinWidth?: string}>`
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    ${({itemMinWidth}) => itemMinWidth && `
        min-width: ${itemMinWidth}
    `}
`;
export const ColumnTitle = styled('h5')`
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
`;
interface AdminTableProps {
    items: any;
    columns: string[];
    itemMinWidth?: string;
    path?: string;
    pk?: string;
}

export class AdminListTable extends React.Component<AdminTableProps> {
    render(){
        const { items, columns, itemMinWidth, path, pk } = this.props;
        return(
            <AdminTableContainer>
                {
                    items.map((item, idx) => {
                        const editPath = `${path}/${item[pk]}`;
                        return(
                           
                            <AdminList key={idx}>
                                <AdminListDetailLI>
                                    <Link href={editPath}>
                                        <a><i className="far fa-edit"></i></a>
                                    </Link>
                                </AdminListDetailLI>
                                <AdminListDetailLI>

                                    <Link href={''}>
                                        <a><i className="fas fa-tachometer-alt"></i></a>
                                    </Link>
                                </AdminListDetailLI>
                                {
                                    columns.map((col, i) => {
                                        if(item[col]){
                                            return(
                                                <AdminListItem key={i} itemMinWidth={itemMinWidth}>
                                                    <ColumnTitle>{col}</ColumnTitle>
                                                        {item[col]}
                                                </AdminListItem>
                                            )
                                        }
                                    })
                                }
                            </AdminList>
                           
                        )
                    })
                }

            </AdminTableContainer>
        )
    }
}