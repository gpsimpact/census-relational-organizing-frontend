import { Mutation, Query } from 'react-apollo';
import { FILTERS_OPEN_QUERY, TOGGLE_FILTERS_OPEN_MUTATION } from '../Queries/FilterContainer';
import styled from 'styled-components';

const Toggle = styled('a')`
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 10px;
    display: inline-block;
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.tertiary};
    border: 1px solid ${props => props.theme.colors.g2};
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.primary};
        color: ${props => props.theme.colors.white} !important;
        cursor: pointer;
    }

`;

export const FilterToggler = (props) => {
    return(
        <Mutation mutation={TOGGLE_FILTERS_OPEN_MUTATION}>
            {(toggleFilters) => {
                return(
                    <Query query={FILTERS_OPEN_QUERY}>
                        {({data: {filtersOpen}}) => {
                            return(
                                <Toggle onClick={() => toggleFilters()} open={filtersOpen}>
                                    <i className="fas fa-filter"></i> Filter
                                </Toggle>
                            )
                        }}
                    </Query>
                )
            }}
        </Mutation>
    )
}
