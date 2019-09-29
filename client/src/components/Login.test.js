import React from 'react';
import { mount, shallow } from 'enzyme';

import LoginPage from './Login';


describe('Login tests', () => {
  test('Login snapshot test', () => {
    const component = shallow(<LoginPage signIn={jest.fn()} errorMessage="test message" />);
    expect(component).toMatchSnapshot();
  });

  // mock the Google API with jest.fn()
  const comp = mount(<LoginPage signIn={jest.fn()} errorMessage="test message" />);

  // Make sure error message contains the correct string
  test('errorMessage contents are accurate', () => {
    expect(comp.props().errorMessage).toEqual('test message');
  });

  // Only call the signIn() prop when the button is clicked
  test('Triggers sign in function on click', () => {
    const loginButton = comp.find('#login_button').at(0);
    expect(comp.props().signIn).not.toHaveBeenCalled();
	loginButton.simulate('submit');
    expect(comp.props().signIn).toHaveBeenCalled();
  });
});
