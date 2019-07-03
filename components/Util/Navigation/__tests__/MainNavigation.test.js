import { MainNavigation } from '../MainNavigation';
import { shallow } from 'enzyme';
import { fakeUser } from '../../../../lib/testUtils';

describe('<MainNavigation/>', () => {
    it('It renders a custom navbar component with anon nav without currentUser', async () => {
        const wrapper = shallow(<MainNavigation currentUser={null}/>);
        const AnonNav = wrapper.find('AnonNav');
        expect(AnonNav.exists()).toBe(true);
    });
    it('It renders an authenticated nav when provided a currentUser', async () => {
        const wrapper = shallow(<MainNavigation currentUser={fakeUser()}/>);
        const AuthedNav = wrapper.find('AuthedNav');
        expect(AuthedNav.exists()).toBe(true);
    })
})