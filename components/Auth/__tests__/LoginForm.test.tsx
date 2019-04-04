import wait from 'waait';
import { createWrapper, fakeUser } from '../../../lib/testUtils';
import LoginForm from '../LoginForm';
import { LOGIN_MUTATION } from '../../../graphql/server/user/mutations/login';

import Router from 'next/router' 
const mockedRouter = { push: () => {}, prefetch: () => {} } 
//@ts-ignore
Router.router = mockedRouter

const me = fakeUser();
const loginSuccessMock = [
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
                    __typename: "ReguestLoginResponse"
                }
            }
        }
    }
];

describe('<LoginForm/>', () => {
    it("Does not submit an invalid form", async () => {
        const routeResponse = jest.fn()
        const wrapper = createWrapper(loginSuccessMock, <LoginForm routeResponse={routeResponse} />);
        const form = wrapper.find('Formik');
        form.simulate('submit');
        wrapper.update()
        await wait(0);
        expect(routeResponse).not.toHaveBeenCalled();
    });
    it("Tt submits form with valid email", async () =>{
        const routeResponse = jest.fn()
        const wrapper = createWrapper(loginSuccessMock, <LoginForm routeResponse={routeResponse}/>);
        const Form = wrapper.find('RequestLoginComponent');

        expect(Form.exists()).toBe(true);
        await wait(0);
        const emailinput = wrapper.find('input[name="email"]');

        emailinput.simulate('change', {
            target:{ name: "email", value: me.email}
        })
        const form = wrapper.find('Formik');
        form.simulate('submit');
        wrapper.update();
        await wait(500);
        expect(routeResponse).toHaveBeenCalled();
    });
});