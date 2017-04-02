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
