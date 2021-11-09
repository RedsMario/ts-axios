import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import xhr from './xhr'
import { buildURL } from './helper/url'
import { transformBodyData, transformResponse } from './helper/data'
import { transformHeaders } from './helper/header'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformRequestURL(config)
  config.headers = transformRequestHeader(config)
  config.data = transformRequestBody(config)
}

/**
 * @description: 处理get请求的URL参数
 * @param {AxiosRequestConfig} config
 * @return {string}
 */
function transformRequestURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

/**
 * @description: 处理body请求参数
 * @param {AxiosRequestConfig} config
 * @return {any}
 */
function transformRequestBody(config: AxiosRequestConfig): any {
  const { data } = config
  return transformBodyData(data)
}
/**
 * @description: 处理headers请求头
 * @param {AxiosRequestConfig} config
 * @return {any}
 */
function transformRequestHeader(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return transformHeaders(headers, data)
}
/**
 * @description: 处理响应数据data
 * @param {AxiosResponse} res
 * @return {AxiosResponse}
 */
function transformResponseData(res: AxiosResponse) {
  res.data = transformResponse(res.data)
  return res
}
interface IWindow extends Window {
  axios: any
}
declare var window: IWindow
window.axios = axios
export default axios
