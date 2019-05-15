import { shallow } from 'enzyme';
import { AnonHome } from '../AnonHome';

describe('<AnonHome/>', () => {
    it('It renders a hero container with cta content and login form', async () => {
        const wrapper = shallow(<AnonHome/>);
        const Hero = wrapper.find('AnonHome__Hero');
        expect(Hero.exists()).toBe(true);

       const LoginForm = wrapper.find('LoginForm');
       expect(LoginForm.exists()).toBe(true);


    });
})