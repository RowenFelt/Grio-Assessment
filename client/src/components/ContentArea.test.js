import React from 'react';
import { mount, shallow } from 'enzyme';

import ContentArea from './ContentArea';
import LoginPage from './Login';

describe('Initialization', () => {
  const component = shallow(<ContentArea />);

  test('ContentArea snapshot test', () => {
	expect(component).toMatchSnapshot();
  });

  test('Login page is rendered initially', () => {
	expect(component.find(LoginPage).exists()).toBe(true);
  });
});

describe('SignIn with 200 status code should set token to state and change view', () => {
	const component = mount(<ContentArea />);
	const res = {};
	res.status = 200;
	res.json = (() => Promise.resolve('token'));
	component.instance().onServerLogin(res);

  test('On server login triggers verified state view change', () => {
	expect(component.state().authToken).toEqual('token');
	expect(component.state().view).toEqual('verified');
  });
});

describe('SignIn with 404 status code should return view to login', () => {
	const component = mount(<ContentArea />);
	const res = {};
	res.status = 404;
	res.json = (() => Promise.resolve('token'));

  test('On server login triggers verified state view change', () => {
	component.instance().onServerLogin(res);
	expect(component.state().authToken).toEqual(null);
	expect(component.state().view).toEqual('login');
  });
});
