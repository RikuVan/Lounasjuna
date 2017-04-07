export const objectToArray = data => {
  if (!data || Array.isArray(data)) return data
  const array = []
  for (var key in data) {
    const obj = data[key]
    obj.uid = key
    array.push(obj)
  }
  return array
}

export const objectKeysToArray = data => {
  if (!data || Array.isArray(data)) return data
  const array = []
  for (var key in data) {
    array.push(key)
  }
  return array
}

/**
 Restaurant Utils for modeling data
 */

const sortByRating = (a, b) => (b.rating || 0) - (a.rating || 0)
const sortByVotes = (a, b) => {
  const aVotes = a.votes ? a.votes.length : 0
  const bVotes = b.votes ? b.votes.length : 0
  return bVotes - aVotes
}

//in firebase it is much easier to work with data in objects
//but in react arrays are convenient
export const processRestaurantData = data => {
  return objectToArray(data)
    .map(obj => {
      const votes = objectKeysToArray(obj.votes)
      return Object.assign(obj, {votes})
    })
    .filter(x => x)
    .sort(sortByRating)
    .sort(sortByVotes)
}
