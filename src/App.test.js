import React from 'react'
import {App} from './App'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

test('Restaurant card snapshot test', () => {
  console.error = jest.genMockFn()
  const component = shallow(<App auth={{status: 'ANONYMOUS'}} />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})
