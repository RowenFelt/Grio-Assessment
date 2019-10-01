import React from 'react';
import { shallow } from 'enzyme';

import ContentArea from './ContentArea';
import LoginPage from './Login';

describe('ContentArea operations', () => {
  let _fetch; // eslint-disable-line no-underscore-dangle
  let _Date; // eslint-disable-line no-underscore-dangle
  beforeAll(() => {
    _fetch = global.fetch;
    global.fetch = jest.fn();
    _Date = Date;
    const testDate = new Date();
    Date = class extends Date { // eslint-disable-line
      constructor() {
        return testDate;
      }
      static now() { return testDate.valueOf(); }
    };
  });

  afterAll(() => {
    global.fetch = _fetch;
    Date = _Date; // eslint-disable-line no-global-assign
  });

  describe('Initialization', () => {
    beforeEach(() => {
      global.fetch.mockReset();
    });

    test('Login page is rendered initially', () => {
      const contentArea = shallow(<ContentArea />);
      expect(contentArea.find(LoginPage).exists()).toBe(true);
    });
  });
});

