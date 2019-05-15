import Page from '../Page';
import { shallow } from 'enzyme';

describe('<Page/>', () => {
    it('It renders a navbar a header, content, and footer without a sidenav', async () => {
        const wrapper = shallow(<Page currentUser={null}/>);
        const NavBar = wrapper.find('NavBar');
        expect(NavBar.exists()).toBe(true);
        expect(NavBar.props().disableSideNav).toBe(true);

        const PageContainerInner = wrapper.find('PageContainerInner');
        expect(PageContainerInner.exists()).toBe(true);
        expect(PageContainerInner.props().disableSideNav).toBe(true);
        
        const Footer = wrapper.find('Page__Footer');
        expect(Footer.exists()).toBe(true);
    });
    it('It renders a sidenav if sidenav is true', async () => {
        const wrapper = shallow(<Page navComponent={<div>Hi</div>}/>);
        const SideNav = wrapper.find('SideNav');
        expect(SideNav.exists()).toBe(true);
    })
})