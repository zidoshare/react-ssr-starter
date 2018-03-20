/**
 * http ajax post方法
 * @author zido
 * @since 2017/6/3 0003
 */
import objToQuery from './objToQuery'
import HttpHeader from './HttpHeader'
import message from './message'
import { push } from '../Util/history'
export const defaultReject = (err, showError) => {
  let msg
  switch (err.code) {
    case -1:
      msg = '服务器异常'
      break
    case 1:
      msg = '账号未登录'
      push({ path: '/login' })
      break
    case 2:
      msg = '权限不足，拒绝访问'
      break
    case 3:
      msg = '账号或密码错误'
      break
    case 4:
      msg = '登陆信息失效，请重新登陆'
      break
    case 5:
      msg = '密码错误'
      break
    case -404:
      msg = '未找到请求地址'
      break
    case -500:
      msg = '服务器发生错误'
      break
    case null:
      break
    default:
      msg = '未知错误，code:' + err.code
      break
  }
  if (msg && showError)
    message().error({
      content: msg,
      duration: 2,
    })
  return msg
}
export const createHttpPromise = (url, {
  data, //请求体
  headers, //http请求头
  method, //http请求方式
  errorHandler, //错误处理器，非必须
  expectedCodes, //某些code可能包含特殊行为，代码中可写入这些code自行处理
  showError,
}) => {
  if (typeof url !== 'string') {
    data = url.data
    headers = url.headers || HttpHeader
    method = url.method || 'POST'
    url = url.url
    errorHandler = url.errorHandler || defaultReject
    expectedCodes = url.expectedCodes || []
  } else {
    headers = headers || HttpHeader
    method = method || 'POST'
    errorHandler = errorHandler || defaultReject
    expectedCodes = expectedCodes || []
  }
  if (headers['Content-Type'] && headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1) {
    data = objToQuery(data)
  } else if (!(data instanceof FormData)) {
    data = data && JSON.stringify(data)
  }
  showError = showError === false ? false : true
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: headers,
      body: data,
      credentials: 'include',
    }).then((response) => {
      const contentType = response.headers.get('content-type')
      if (response.ok && contentType && contentType.indexOf('application/json') !== -1)
        return response.json()
      if (!response.ok) {
        return {
          success: false,
          code: -response.status,
        }
      }
      return {
        success: false,
        code: -1, //服务器异常
      }
    }).then((json) => {
      if (json.success) {
        resolve(json.data)
      } else if (expectedCodes.some(value => value == json.code)) {
        reject(json)
      } else {
        //TODO 默认异常处理
        json.msg = errorHandler(json, showError)
        reject(json)
      }
    }).catch(err => {
      errorHandler(err, showError)
    })
  })
}
export default createHttpPromise