import { shallow } from 'enzyme';
import { AuthedNav } from '../AuthedNav';
import { fakeUser } from '../../../../lib/testUtils';
import { CurrentUser } from '../../../../lib/constructors/UserConstructor';

const me = fakeUser();

let currentUser = CurrentUser({currentUser:{me:me}});

describe('<AuthedNav/>', () => {
    it('It returns null without a currentuser prop', async () => {
        const wrapper = shallow(<AuthedNav/>);
        expect(wrapper.equals(null)).toBe(true);
    });
    it('It renders auth UL when has currentuser', async () => {
        const wrapper = shallow(<AuthedNav currentUser={currentUser}/>);
        const NavUl = wrapper.find('Styles__NavUl');
        expect(NavUl.exists()).toBe(true);
    });
})