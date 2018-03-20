const group = (data = [], groupby = ['id'], shape = {
  alias: {},
  listKey: 'list',
}) => {
  let listKey = shape.listKey || 'list'
  let alias = shape.alias || {}
  function eq(obj, target) {
    return groupby.every(key => {
      let tempKey = key
      let format
      if (alias[key]) {
        tempKey = alias[key].name || alias[key]
        format = alias[key].format
      }
      if (format) {
        return obj[tempKey] == format(target[key])
      }
      return obj[tempKey] == target[key]
    })
  }
  function format(block, result) {
    block.forEach(item => {
      let currentResult = result.find(re => eq(re, item))
      if (currentResult) {
        currentResult[listKey].push(item)
      } else {
        let obj = {}

        groupby.forEach(key => {
          let tempKey = key
          let format
          if (alias[key]) {
            tempKey = alias[key].name || alias[key]
            format = alias[key].format
          }
          if (format) {
            return obj[tempKey] = format(item[key])
          }
          obj[tempKey] = item[key]
        })
        obj[listKey] = [item]
        result.push(obj)
      }
    })
  }

  let result = []
  format(data, result)
  return result
}

export default group