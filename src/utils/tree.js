/**
 * 
 * @param {*array} data 数据源
 * @param {*array} groupby 分组字段，默认为['id']
 */
const tree = (data = [], groupby = ['id']) => {
  function format(block, index, result) {
    let key = groupby[index]
    block.forEach(function (item) {
      if (groupby.length === index + 1) {
        result[item[key]] = result[item[key]] || []
        result[item[key]].push(item)
      } else {
        result[item[key]] = result[item[key]] || {}
        result[item[key]].__arr = result[item[key]].__arr || []
        result[item[key]].__arr.push(item)
        Object.defineProperty(result[item[key]], '__arr', {
          enumerable: false,
          configurable: false
        })
      }
    })
    if (groupby.length === index + 1) {
      return
    }
    for (let k in result) {
      if (result.hasOwnProperty(k) && k.indexOf('__') === -1) {
        format(result[k].__arr, index + 1, result[k])
      }
    }
  }

  let result = {}
  format(data, 0, result)
  return result
}



export default tree