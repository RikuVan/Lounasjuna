import React from 'react'
import Button from './Button'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

test('Button snapshot test', () => {
  console.error = jest.genMockFn();
  const component = shallow(<Button />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})