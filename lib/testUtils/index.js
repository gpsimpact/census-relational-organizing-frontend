export { fakeUser } from './models';


export const simType = (wrapper, name, value) => {
    wrapper.find(`input[name="${name}"]`).simulate('change', {
        target: { name, value },
      });
}