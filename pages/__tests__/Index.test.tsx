import { shallow } from 'enzyme';
import Index from '../Index';
import toJSON from 'enzyme-to-json';

describe('<Index/>', () => {
    it("Renders hello world", async () => {
        const wrapper = shallow(<Index/>);
        expect(toJSON(wrapper.find('h1'))).toMatchSnapshot();
    })
  
})