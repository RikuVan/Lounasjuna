export const objectToArray = resp => {
  const array = []
  for (var key in resp.data) {
    const user = resp.data[key]
    user.uid = key
    array.push(user)
  }
  return array;
}