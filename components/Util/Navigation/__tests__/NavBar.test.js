import { shallow } from 'enzyme';
import { NavBar } from '../NavBar';
import { fakeUser } from '../../../../lib/testUtils';

describe('<NavBar/>', () => {
    it('It renders with left and right and an anon mene without user', async () => {
        const wrapper = shallow(<NavBar disableSideNav={true}/>);
        const NavBarContainer = wrapper.find('NavBar__NavBarContainer');
        expect(NavBarContainer.exists()).toBe(true);

        const LeftNav = wrapper.find('NavBar__LeftNav');
        expect(LeftNav.exists()).toBe(true);
        const RightNav = wrapper.find('NavBar__RightNav');
        expect(RightNav.exists()).toBe(true);

        const AnonNav = wrapper.find('AnonNav');
        expect(AnonNav.exists()).toBe(true);

    });
    it('It renders the authednav with an authed user', async () => {
        const wrapper = shallow(<NavBar currentUser={fakeUser()}/>);
        const AuthedNav = wrapper.find('AuthedNav');
        expect(AuthedNav.exists()).toBe(true);
    });
})