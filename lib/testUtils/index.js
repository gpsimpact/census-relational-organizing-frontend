import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';

import { theme } from '../../styles/Theme';

export const createWrapper = (mocks, Component) => {
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


export { fakeUser, fakeTeam } from './models';
