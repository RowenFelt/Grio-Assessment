import React from 'react';
import { mount, shallow } from 'enzyme';

import Homepage from './Home';


describe('Homepage rendering and simulated increment test', () => {
  test('Homepage snapshot test', () => {
    const component = shallow(<Homepage authToken="mock token"/>);
    expect(component).toMatchSnapshot();
  });

  const comp = mount(<Homepage authToken="mock token"/>);

  test('count is initially set to 0', () => {
    expect(comp.state().count).toEqual(0);
  });


  test('tempCount is initially set to 1', () => {
	expect(comp.state().tempCount).toEqual(0);
  });

  // increment function is called on click of incriment button
  test('Triggers increment function on click of increment button', () => {
    const incrementButton = comp.find('#FancyButton').at(0);
	comp.instance().increment = jest.fn();
    expect(comp.instance().increment).not.toHaveBeenCalled();
	incrementButton.simulate('click');
    expect(comp.instance().increment).toHaveBeenCalled();
  });
});

describe('Simulated series of button click tests', () => {

  const comp = mount(<Homepage authToken="mock token"/>);
  const incrementButton = comp.find('#FancyButton').at(0);

  test('Increment triggers state change to show modal view', () => {
	comp.instance().fetchIncrement = jest.fn();
	incrementButton.simulate('click');
	expect(comp.state().confirmationView).toBe(true);
  });

  test('Cancel in modal view changes view to hide modal view', () => {
	comp.instance().cancelIncrement();
	expect(comp.state().confirmationView).toBe(false);
	expect(comp.state().count).toEqual(0);
  });

  test('Confirm in modal view changes view to hide modal view and updates count', () => {
	incrementButton.simulate('click');
	expect(comp.state().confirmationView).toBe(true);
	comp.state().tempCount = 1;
	comp.instance().confirmIncrement();
	expect(comp.state().count).toEqual(1);
	expect(comp.state().confirmationView).toBe(false);
  });

});

