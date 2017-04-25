import React from 'react';
import { shallow } from 'enzyme';

import BaseCurrencyAmount from './index.js';

test('BaseCurrencyAmount should exist', () => {
  const wrapper = shallow(<BaseCurrencyAmount />);

  expect(wrapper.find('input').length).toBe(1);
});

test('BaseCurrencyAmount should ...', () => {
  const wrapper = shallow(<BaseCurrencyAmount />);
  const ourValue = 123;

  wrapper.setProps({
    'value': ourValue
  });

  expect(wrapper.find('input').props().defaultValue).toBe(ourValue);
});

test('BaseCurrencyAmount should handleChange...', () => {
  const wrapper = shallow(<BaseCurrencyAmount />);

  wrapper.setProps({
    'handleChange': (e) => {
      expect(e.target.value).toBe(4567);
    }
  });

  wrapper.find('input').simulate('change', { target: { value: 456 } });

});
