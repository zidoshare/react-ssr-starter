
export default (paramsObject, url) => {
  if (paramsObject) {
    let paramsArray = []
    Object.keys(paramsObject).forEach(key => {
      if (paramsObject[key] == null)
        return
      if (!(paramsObject[key] instanceof Array)) {
        paramsArray.push(key + '=' + paramsObject[key])
        return
      }
      const array = paramsObject[key]
      for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Object) {
          const item = array[i]
          for (let k in item) {
            if (item[k] != null)
              paramsArray.push(key + `[${i}]` + '.' + k + '=' + item[k])
          }
        } else {
          paramsArray.push(key + `[${i}]` + '=' + array[i])
        }
      }
    })
    if (typeof url === 'undefined') {
      return paramsArray.join('&')
    }
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return url
}