export const objectToArray = resp => {
  if (!resp.data || Array.isArray(resp.data)) return resp.data
    const array = []
    for (var key in resp.data) {
      const obj = resp.data[key]
      obj.uid = key
      array.push(obj)
   }
  return array;
}

export const objectKeysToArray = data => {
  if (!data || Array.isArray(data)) return data
  const array = []
  for (var key in data) {
    array.push(key)
  }
  return array
}