import wait from 'waait';
import { createWrapper, fakeUser } from '../../../lib/testUtils';
import RegisterForm from '../RegisterForm';
import { REGISTER_MUTATION } from '../../../graphql/server/user/mutations/register';

import Router from 'next/router' 
const mockedRouter = { push: () => {}, prefetch: () => {} } 
//@ts-ignore
Router.router = mockedRouter

const me = fakeUser();
const loginSuccessMock = [
    {
        request:{
            query: REGISTER_MUTATION,
            variables:{
                email: me.email,
                firstName: me.firstName,
                lastName: me.lastName,
                address: me.address,
                city: me.city,
                state: me.state,
                zip5: me.zip5,
                phone: me.phone,
            }
        },
        result: {
            data: {
                register: {
                    code: "ok",
                    success: true,
                    message: "Registered",
                    securityCode: "100 Compostable Chipmunks",
                    __typename: "RegisterResponse"
                }
            }
        }
    }
];

describe('<RegisterForm/>', () => {
    it("Does not submit an invalid form", async () => {
        const routeResponse = jest.fn()
        const wrapper = createWrapper(loginSuccessMock, <RegisterForm routeResponse={routeResponse} />);
        const form = wrapper.find('Formik');
        form.simulate('submit');
        wrapper.update()
        await wait(0);
        expect(routeResponse).not.toHaveBeenCalled();
    });
    // it("Tt submits form with valid email", async () =>{
    //     const routeResponse = jest.fn()
    //     const wrapper = createWrapper(loginSuccessMock, <RegisterForm routeResponse={routeResponse}/>);
    //     const Form = wrapper.find('RegisterComponent');
    //     console.log(me);
    //     expect(Form.exists()).toBe(true);
    //     await wait(0);
    //     const emailinput = wrapper.find('input[name="email"]');

    //     emailinput.simulate('change', {
    //         target:{ name: "email", value: me.email}
    //     })
    //     wrapper.find('input[name="firstName"]').simulate('change', {
    //         target:{ name: "firstName", value: me.firstName}
    //     })
    //     wrapper.find('input[name="lastName"]').simulate('change', {
    //         target:{ name: "lastName", value: me.lastName}
    //     })
    //     wrapper.find('input[name="address"]').simulate('change', {
    //         target:{ name: "address", value: me.address}
    //     })
    //     wrapper.find('input[name="city"]').simulate('change', {
    //         target:{ name: "city", value: me.city}
    //     })
    //     wrapper.find('input[name="state"]').simulate('change', {
    //         target:{ name: "state", value: me.state}
    //     })
    //     wrapper.find('input[name="zip5"]').simulate('change', {
    //         target:{ name: "zip5", value: me.zip5}
    //     })
    //     wrapper.find('input[name="phone"]').simulate('change', {
    //         target:{ name: "phone", value: me.phone}
    //     })
    //     const form = wrapper.find('Formik');
    //     form.simulate('submit');
    //     wrapper.update();
    //     await wait(100);
    //     expect(routeResponse).toHaveBeenCalled();
    // });
});