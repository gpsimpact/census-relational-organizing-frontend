import React from "react";
import styled from "../../lib/styled";
import Link from "next/link";


export const TableContainer = styled('div')`
    margin-bottom: ${props => props.theme.spacing[3]};
`;

export const ListUL = styled('ul')`
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

export const ListLI = styled('li')`
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

export const ListULItem = styled('li')<{itemMinWidth?: string}>`
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    ${({itemMinWidth}) => itemMinWidth && `
        min-width: ${itemMinWidth}
    `}
`;
export const ColumnTitle = styled('h5')`
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};
`;
interface ListProps {
    items: any;
    columns: string[];
    itemMinWidth?: string;
    editPath?: string;
    dashPath?: string;
    pk?: string;
}

export class ListTable extends React.Component<ListProps> {
    render(){
        const { items, columns, itemMinWidth, editPath, dashPath, pk } = this.props;
        return(
            <TableContainer>
                {
                    items.map((item, idx) => {
                        const constructedEditPath = `${editPath}/${item[pk]}`;
                        const constructedDashPath = `${dashPath}/${item[pk]}`;
                        return(
                           
                            <ListUL key={idx}>
                                <ListLI>
                                    <Link href={constructedEditPath}>
                                        <a><i className="far fa-edit"></i></a>
                                    </Link>
                                </ListLI>
                                <ListLI>

                                    <Link href={constructedDashPath}>
                                        <a><i className="fas fa-tachometer-alt"></i></a>
                                    </Link>
                                </ListLI>
                                {
                                    columns.map((col, i) => {
                                        if(item[col]){
                                            return(
                                                <ListULItem key={i} itemMinWidth={itemMinWidth}>
                                                    <ColumnTitle>{col}</ColumnTitle>
                                                        {item[col]}
                                                </ListULItem>
                                            )
                                        }
                                    })
                                }
                            </ListUL>
                           
                        )
                    })
                }

            </TableContainer>
        )
    }
}