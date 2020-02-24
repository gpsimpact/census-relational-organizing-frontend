import React from "react";
import styled from "styled-components";
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const PaginationContainer = styled('div')`
    margin: 0;
    padding: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: center;
    text-transform: uppercase;  
   
    .title {
        font-size: 1rem;
        @media(min-width: 1200px) {
            font-size: 1.8rem;
        }
        span {
            display: inline-block;
        }
    }

`;


export const PaginationLi = styled('li')`
        color: ${props => props.theme.colors.black};
        display: flex;
        justify-content: center;
        align-items: center;
       
`
export const PaginationAnchor = styled('a')`
    padding: .5rem 1rem;
    font-size: .75rem;
    cursor: pointer;
    text-transform: uppercase;
    color: ${props => props.theme.colors.black};

`;
export const DisabledPaginationAnchor = styled(PaginationAnchor)`
        cursor: not-allowed;
        opacity: .4;

        &:hover,
        &:focus,
        &:active {
            cursor: not-allowed;
            text-decoration: none;
            opacity: .4;
            color: ${props => props.theme.colors.black};

        }

`;
export const PaginationLeft = styled('h3')`
            margin-left: .45rem;
            margin-right: .45rem;
  
`;
export const PaginationRight = styled('h3')`
 margin-left: .45rem;
            margin-right: .45rem;
`;

export const VertBarSeparator = styled('div')`
    margin: 0px .2rem;
    height: 15px;
    margin-top: 10px;
    width: 2px;
    background-color: ${props => props.theme.colors.secondary};
`;

export class Pagination extends React.Component {
    paginate(totalCount, currentPage, perPage, path, teamSlug) {
        let nextPage = `${path}?page=${currentPage + 1}&perpage=${perPage}`;
        let previousPage = `${path}?page=${currentPage - 1}&perpage=${perPage}`;

        if(teamSlug) {
            nextPage += `&team=${teamSlug}`;
            previousPage += `&team=${teamSlug}`;
        }
        return {
            nextPage: nextPage,
            previousPage: previousPage,
            hasNext: (currentPage * perPage) < totalCount,
            hasPrevious: currentPage > 1,
            totalPages: Math.ceil(totalCount / perPage)
        }
    }
    render(){
        const { totalCount, currentPage, perPage, justify, path, teamSlug, trans, t } = this.props;
        const pages = teamSlug ? this.paginate(totalCount, currentPage, perPage, path, teamSlug) : this.paginate(totalCount, currentPage, perPage, path);
        return(

            <PaginationContainer>
                <PaginationLeft>
                        <span className="links">
                            {pages.hasPrevious && <Link href={pages.previousPage}><PaginationAnchor> {trans ? trans('PREV') : "Previous"} </PaginationAnchor></Link>} 
                            {!pages.hasPrevious && <DisabledPaginationAnchor>  <i className="fas fa-angle-left"></i> {trans ? trans('PREV') : "PREV"} </DisabledPaginationAnchor>} 
                        </span>
                        <span className="title">{ trans ? trans("TOTAL COUNT") : 'TOTAL COUNT' } <span>{totalCount}</span></span>

                </PaginationLeft>
                &middot;
                <PaginationRight>
                        <span className="title">{ trans ? trans("PAGE") : 'PAGE' } <span>{currentPage} of {pages.totalPages}</span></span>
                        <span className="links">
                            {pages.hasNext && <Link href={pages.nextPage}><PaginationAnchor> {trans ? trans('NEXT') : 'NEXT'} </PaginationAnchor></Link>} 
                            {!pages.hasNext && <DisabledPaginationAnchor>  {trans ? trans('NEXT') : 'NEXT'}  <i className="fas fa-angle-right"></i></DisabledPaginationAnchor>}
                        </span>
                </PaginationRight>
            

            </PaginationContainer>
        )
    }
}
