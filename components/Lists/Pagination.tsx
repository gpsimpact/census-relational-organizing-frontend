import React from "react";
import styled from '../../lib/styled';
import Link from 'next/link';
import { VertBarSeparator } from '../Util/Layout/Separators';


export const PaginationContainer = styled('div')<{justify?:string}>`
    margin: 0;
    padding: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    ${({justify}) => justify && `
        justify-content: ${justify};
    `}
`;


export const PaginationLi = styled('li')`
        color: ${props => props.theme.colors.black};
        display: flex;
        align-items: center;
        justify-content: center;
       
`
export const PaginationAnchor = styled('a')`
    padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSize[1]};
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};

`;
export const DisabledPaginationAnchor = styled(PaginationAnchor)`
        cursor: not-allowed;
        text-decoration: none;
        opacity: .4;
`;
export const CountsTitle = styled('h3')`
    text-transform: uppercase;  
    span {
        margin-left: ${props=> props.theme.spacing[2]};
        
    }
`;

interface PaginationProps {
    justify?: string;
    totalCount: number;
    currentPage: number;
    perPage: number;
    path: string;
}

export class Pagination extends React.Component<PaginationProps> {
    paginate(totalCount:number, currentPage:number, perPage:number, path) {
        return {
            nextPage: `${path}?page=${currentPage + 1}&perpage=${perPage}`,
            previousPage: `${path}?page=${currentPage - 1}&perpage=${perPage}`,
            hasNext: (currentPage * perPage) < totalCount,
            hasPrevious: currentPage > 1,
            totalPages: Math.ceil(totalCount / perPage)
        }
    }

    render(){
        const { totalCount, currentPage, perPage, justify, path} = this.props;
        const pages = this.paginate(totalCount, currentPage, perPage, path);

        return(
            <PaginationContainer justify={justify}>
                  <PaginationLi>
                        {pages.hasPrevious && <Link href={pages.previousPage}><PaginationAnchor> Previous </PaginationAnchor></Link>} 
                        {!pages.hasPrevious && <DisabledPaginationAnchor>  Previous </DisabledPaginationAnchor>} 
                </PaginationLi>
                <CountsTitle>Total Count: <span>{totalCount}</span></CountsTitle> 
                <VertBarSeparator/>
                <CountsTitle>Page: <span>{currentPage} of {pages.totalPages}</span></CountsTitle>
                <PaginationLi>
                        {pages.hasNext && <Link href={pages.nextPage}><PaginationAnchor>  Next </PaginationAnchor></Link>} 
                        {!pages.hasNext && <DisabledPaginationAnchor>  Next </DisabledPaginationAnchor>} 
                </PaginationLi>
            
            </PaginationContainer>
        )
    }
}
