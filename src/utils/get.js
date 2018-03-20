import {
  createHttpPromise
} from './post'
import objToQuery from './objToQuery'

/**
 * http ajax get方法
 * 参数规则有多种
 * 一个参数(Object)：｛
 *  url,
 *  data(Object),
 *  method,
 *  hideError,
 * ｝;
 * 
 * 两个参数（Object,Object）:{
 *  url,
 *  method,
 *  hideError,
 * }和data对象
 * 
 * 两个参数 （string,Object):
 *  url(string),
 *  {
 *    method,
 *    hideError,
 * }
 * @author 邬虹旭
 */
export default (url, data, opt) => {
  let paramsObject = data
  let tempOpt = opt || {}
  if (typeof url !== 'string') {
    tempOpt = {
      ...url,
    }
    url = url.url
    paramsObject = tempOpt.data
    delete tempOpt.data
    delete tempOpt.url
  }
  tempOpt.method = 'GET'
  //转换url，将data连接到url中
  url = objToQuery(paramsObject, url)
  return createHttpPromise(url, tempOpt)
}