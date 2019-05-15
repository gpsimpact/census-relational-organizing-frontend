import { toggleSideNav } from '../components/QueryComponents/SideNavContainer';
import { toggleFilterContainer } from '../components/QueryComponents/FilterContainer';

export const clientMutations = {
    toggleSideNav,
    toggleFilterContainer,
};

export const clientDefaults = {
    sideNavOpen: true,
    filtersOpen: false,
};