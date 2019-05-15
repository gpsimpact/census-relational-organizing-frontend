
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from "apollo-boost";


export const toggleFilterContainer = (_, variables, { cache }) => {
    const { filtersOpen } = cache.readQuery({
        query: FILTERS_OPEN_QUERY
    });
    const data = {
        data: { filtersOpen: !filtersOpen},
    }
    cache.writeData(data);
    return data;
};

export const FILTERS_OPEN_QUERY = gql`
    query{
        filtersOpen @client
    }
`;

export const TOGGLE_FILTERS_OPEN_MUTATION = gql`
    mutation{
        toggleFilterContainer @client
    }
`;

