import LoginForm, {LOGIN_MUTATION} from '../LoginForm';
import { createWrapper } from '../../../lib/testUtils';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { fakeUser } from '../../../lib/testUtils';
import { theme } from '../../../styles/Theme';


import Router from 'next/router' 
const mockedRouter = { push: () => {}, prefetch: () => {}, replace: () => {} } 
Router.router = mockedRouter

function type(wrapper, name, value) {
    wrapper.find(`input[name="${name}"]`).simulate('change', {
      target: { name, value },
    });
  }
const me = fakeUser();

const mocks = [
    {
        request:{
            query: LOGIN_MUTATION,
            variables:{
                email: me.email,
            }
        },
        result: {
            data: {
                requestLogin: {
                    code: "ok",
                    success: true,
                    message: "Logged in",
                    securityCode: "100 Compostable Chipmunks",
                    __typename: "ReguestResult"
                }
            }
        }
    }
];



describe('<LoginForm/>', () => {
    it('It renders and matches snapshot', async () => {
        let apolloClient;
        const wrapper = mount(
          <MockedProvider mocks={mocks}>
            <ThemeProvider theme={theme}>
                    <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <LoginForm />;
                    }}
                    </ApolloConsumer>
            </ThemeProvider>
          </MockedProvider>
        );
        expect(wrapper.find('input[name="email"]').exists()).toBe(true);            
    });

})