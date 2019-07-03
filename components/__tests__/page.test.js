import React from 'react';
import Page from '../Page';
import { shallow } from 'enzyme';

describe('<Page/>', () => {
    it('It renders a navbar header, content, and footer without sidenav', async () => {
        const wrapper = shallow(<Page currentUser={null}/>);
        const MainNav = wrapper.find('MainNavigation');
        expect(MainNav.exists()).toBe(true);

        const Content = wrapper.find('Page__PageContent');
        expect(Content.exists()).toBe(true);

        const Footer = wrapper.find('Page__Footer');
        expect(Footer.exists()).toBe(true);
    })
    it('It renders a sidenav component', async ()=> {
        const wrapper = shallow(<Page currentUser={null} sideNavComponent={<React.Fragment></React.Fragment>}/>);
        const SideNav = wrapper.find('SideNav');
        expect(SideNav.exists()).toBe(true);
    })
})