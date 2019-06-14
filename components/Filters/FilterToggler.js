import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import { FILTERS_OPEN_QUERY, TOGGLE_FILTERS_OPEN_MUTATION } from '../QueryComponents/FilterContainer';
import { CrudNavA } from '../Util/Navigation';
export const FilterToggler = (props) => {
    return(
        <Mutation mutation={TOGGLE_FILTERS_OPEN_MUTATION}>
            {(toggleFilters) => {
                return(
                    <Query query={FILTERS_OPEN_QUERY}>
                        {({data: {filtersOpen}}) => {
                            return(
                                <CrudNavA onClick={() => toggleFilters()} open={filtersOpen}>
                                    <i className="fas fa-filter"></i> Filter
                                </CrudNavA>
                            )
                        }}
                    </Query>
                )
            }}
        </Mutation>
    )
}
