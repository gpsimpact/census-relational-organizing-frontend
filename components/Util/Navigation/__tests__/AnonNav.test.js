import { shallow } from 'enzyme';

import { AnonNav } from '../AnonNav';

describe('<AnonNav/>', () => {
    it('It renders a link to registration page', async () => {
        const wrapper = shallow(<AnonNav/>);
        const RegisterLink = wrapper.findWhere(node => node.props().href === '/register');
        expect(RegisterLink.exists()).toBe(true);
    });
})