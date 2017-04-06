import {objectToArray, objectKeysToArray} from './helpers'

test('converts an object to an array of objects', () => {
  const startObj = {
    1: {color: '#fff'},
    2: {color: "#ccc"}
  }
  expect(objectToArray(startObj)).toEqual([
    {uid: "1", color: '#fff'},
    {uid: "2", color: '#ccc'}
  ])
})

test('converts keys of an object to an array of the keys', () => {
  const startObj = {
    10: "red",
    20: "green"
  }
  expect(objectKeysToArray(startObj)).toEqual(["10", "20"])
})