import React from 'react';
import { shallow } from 'enzyme';

import Home from './home.js';

test('Component should contain the text \'Home\'', () => {
  const wrapper = shallow(<Home />);

  expect(wrapper.text()).toBe('Home');
});
