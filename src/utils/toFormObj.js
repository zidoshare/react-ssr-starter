const toFormObj = (obj, reverse) => {
  if (reverse) {
    let result = {}
    for (let key in obj) {
      let { value } = obj[key]
      result[key] = value
    }
    return result
  }
  let result = {}
  for (let key in obj) {
    let value = obj[key]
    if (key.indexOf('Time') != 0 && (value + '').length === 13) {
      result[key] = {
        value: new Date(value)
      }
    }
    else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value instanceof Array) {
      result[key] = {
        value,
      }
    } else if (value && value.value != null) {
      result[key] = value
    } else if (value != null && value instanceof Object) {
      result[key] = {
        ...toFormObj(value),
      }
    }
  }
  return result
}

export default toFormObj