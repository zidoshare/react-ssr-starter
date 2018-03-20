/**
 * 判断是否为空，支持任何类型
 * <p>fill description</p>
 * @author zido
 * @since 2017/6/3 0003
 */
export default (...objs)=>{
  if(objs.length === 0)
    return true
  for (let obj of objs) {
    if(obj === null || typeof(obj) === 'undefined')
      return true
    if(obj instanceof Array)
      if(obj.length === 0)
        return true
    if(typeof obj === 'string')
      if(obj.length === 0)
        return true
    if(typeof obj === 'object'){
      return JSON.stringify(obj) === '{}'
    }
    return false
  }
}