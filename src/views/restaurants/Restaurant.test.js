import React from 'react'
import {RestaurantCard} from './Restaurant-card'
import {shallow, mount} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

/**
 * Example component tests
 */

test('Restaurant contains title and link', () => {
  //this is to avoid logging of propType errors
  console.error = jest.genMockFn()
  const handleSelect = jest.fn()
  const data = {
    name: 'Restaurant',
    address: '10 some street',
    rating: 2,
    link: 'http://chineseplace.com',
    type: 'Chinese',
    rating: 1,
    userId: '1',
    uid: '2',
    votes: ['1'],
    users: {
      1: {displayName: 'some dude'},
    },
    currentVote: 1,
    handleSelect,
  }
  const title = (
    <h2 className="Restaurant-name">
      <a href="http://chineseplace.com" className="Restaurant-www">
        <span className="fa fa-home" />
      </a>Restaurant
    </h2>
  )
  const component = mount(<RestaurantCard {...data} />)
  component.find('button').simulate('click')
  expect(component.contains(title)).toBe(true)
  expect(handleSelect).toHaveBeenCalledTimes(1)
  expect(handleSelect).toHaveBeenCalledWith('1', '2')
})

test('Restaurant card snapshot test', () => {
  console.error = jest.genMockFn()
  const component = shallow(<RestaurantCard />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})
