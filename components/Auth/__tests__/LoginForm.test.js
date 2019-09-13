import {LoginForm, LOGIN_MUTATION} from '../LoginForm';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/Theme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { simType, fakeUser } from '../../../lib/testUtils';
import { submitMutation, marshallMutationResponse } from '../../../lib/helpers';

const me = fakeUser();

const mocks = [
    {
        request: {
            query: LOGIN_MUTATION,
            variables: {
                email: me.email
            }
        },
        result: {
            data: {
                requestLogin: {
                    code: 'OK',
                    success: true,
                    message: 'Check yo email',
                    security_code: '99 Crazy Wombats'
                }
            }
        }
    }
]

describe('<LoginForm/>', () => {
    it('it renders a form with an email input', async () => {
            let apolloClient;
            const wrapper = mount(
                <MockedProvider mocks={[]}>
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
    it('It does not submit an invalid form', async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={[]}>
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
        wrapper.find('form').simulate('submit');
        await wait();
        wrapper.update();
        expect(wrapper.find('Styles__ErrorContainer').exists()).toBe(true);
    });

    it('It submits a valid form', async () => {
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
        simType(wrapper, 'email', me.email);
        wrapper.update();
        wrapper.find('form').simulate('submit');
        await wait();
        wrapper.update();
    });
});