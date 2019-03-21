import casual from "casual";
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';

import { theme } from './styled';
import { CurrentUser } from './userConstructor';

casual.seed(1779);

const fakeUser = () => ({
    __typename: "User",
    id: casual.uuid,
    firstName: casual.first_name,
    lastName: casual.last_name,
    city: casual.city,
    address: casual.address,
    state: casual.state,
    zip5: '55555',
    phone: casual.phone,
    email: casual.email,
    active: true,
    globalPermissions: []
})


const createWrapper = (mocks, Component) => {
    let apolloClient;
    const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={theme}>
          <ApolloConsumer>
            {client => {
              apolloClient = client;
              return Component;
            }}
          </ApolloConsumer>
          </ThemeProvider>
        </MockedProvider>
    );
    return wrapper;
};

const fakeCurrentUser = new CurrentUser(fakeUser())

export {
    createWrapper,
    fakeUser,
    fakeCurrentUser
}