import {
  processRestaurantData,
  objectToArray,
  objectKeysToArray,
} from './helpers'

test('converts an object to an array of objects', () => {
  const startObj = {
    1: {color: '#fff'},
    2: {color: '#ccc'},
  }
  expect(objectToArray(startObj)).toEqual([
    {uid: '1', color: '#fff'},
    {uid: '2', color: '#ccc'},
  ])
})

test('converts keys of an object to an array of the keys', () => {
  const startObj = {
    10: 'red',
    20: 'green',
  }
  expect(objectKeysToArray(startObj)).toEqual(['10', '20'])
})

test('Turns restaurants into an array and sorts by stars and votes', () => {
  const restaurants = {
    1: {
      rating: 1,
      votes: [1, 2, 3],
    },
    2: {
      rating: 2,
      votes: [4],
    },
    3: {
      rating: 4,
      votes: [5],
    },
    4: {
      rating: 5,
      votes: [],
    },
    5: {
      rating: 4,
      votes: [],
    },
  }
  expect(processRestaurantData(restaurants)).toEqual([
    {rating: 1, votes: [1, 2, 3], uid: '1'},
    {rating: 4, votes: [5], uid: '3'},
    {rating: 2, votes: [4], uid: '2'},
    {rating: 5, votes: [], uid: '4'},
    {rating: 4, votes: [], uid: '5'},
  ])
})
