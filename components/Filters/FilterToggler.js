import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import { FILTERS_OPEN_QUERY, TOGGLE_FILTERS_OPEN_MUTATION } from '../QueryComponents/FilterContainer';

const FilterButton = styled('a')`
    -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 20px;
    display: inline-block;
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.blue};
    border: 1px solid ${props => props.theme.colors.g2};
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.green};
        color: ${props => props.theme.colors.white};
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
                                <FilterButton onClick={() => toggleFilters()} open={filtersOpen}>
                                    <i className="fas fa-filter"></i> Filter
                                </FilterButton>
                            )
                        }}
                    </Query>
                )
            }}
        </Mutation>
    )
}
