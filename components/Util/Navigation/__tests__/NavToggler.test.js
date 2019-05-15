import { shallow } from 'enzyme';
import { NavToggler } from '../NavToggler';


describe('<NavToggler/>', () => {
    it('It renders a spacer if side nav is disabled', async () => {
        const wrapper = shallow(<NavToggler disableSideNav={true}/>);
        const Spacer = wrapper.find('NavToggler__NavIconSpacer');
        expect(Spacer.exists()).toBe(true);
    });
    it('It renders sidenav mutation if sidenav active', async () => {
        // can't really mock client graphql
        const wrapper = shallow(<NavToggler disableSideNav={false}/>);
        const Mutation = wrapper.find('Mutation');
        expect(Mutation.exists()).toBe(true);

    })
})