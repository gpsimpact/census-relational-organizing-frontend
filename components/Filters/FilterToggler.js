import { Mutation, Query } from 'react-apollo';
import { FILTERS_OPEN_QUERY, TOGGLE_FILTERS_OPEN_MUTATION } from '../Queries/FilterContainer';
import Nav from 'react-bootstrap/Nav';

export const FilterToggler = (props) => {
    return(
        <Mutation mutation={TOGGLE_FILTERS_OPEN_MUTATION}>
            {(toggleFilters) => {
                return(
                    <Query query={FILTERS_OPEN_QUERY}>
                        {({data: {filtersOpen}}) => {
                            return(
                                <Nav.Link onClick={() => toggleFilters()} open={filtersOpen}>
                                    <i className="fas fa-filter"></i> Filter
                                </Nav.Link>
                            )
                        }}
                    </Query>
                )
            }}
        </Mutation>
    )
}
