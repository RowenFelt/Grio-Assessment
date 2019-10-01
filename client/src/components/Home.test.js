import React from 'react';
import { mount, shallow } from 'enzyme';

import Homepage from './Home';


describe('Homepage tests', () => {
  test('Homepage snapshot test', () => {
    const component = shallow(<Homepage authToken="mock token"/>);
    expect(component).toMatchSnapshot();
  });

  // mock the Google API with jest.fn()
  const comp = mount(<Homepage authToken="mock token"/>);

  test('count is initially set to 0', () => {
    expect(comp.state().count).toEqual(0);
  });


  test('tempCount is initially set to 1', () => {
	expect(comp.state().tempCount).toEqual(0);
  });

  // Only call the signIn() prop when the button is clicked
  test('Triggers sign in function on click', () => {
    const loginButton = comp.find('#login_button').at(0);
    expect(comp.props().signIn).not.toHaveBeenCalled();
	loginButton.simulate('submit');
    expect(comp.props().signIn).toHaveBeenCalled();
  });
});
