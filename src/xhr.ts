import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helper/header'
import { createAxiosError } from './helper/error'
/**
 * @description: 封装XMLHttpRequest
 * @param {AxiosRequestConfig} config
 * @return {AxiosPromise}
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  const { url, method = 'get', headers, data = null, responseType, timeout } = config
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = responseType ? responseType : 'json'
    xhr.timeout = timeout ? timeout : 0
    xhr.open(method.toUpperCase(), url, true)
    // 请求超时
    xhr.ontimeout = function() {
      reject(
        createAxiosError({
          message: `Request timed out ${timeout} ms`,
          config,
          code: 'ECONNABORTED',
          request: xhr
        })
      )
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 0) {
        return
      }
      const responseData = xhr.responseType !== 'text' ? xhr.response : xhr.responseText
      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())

      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        request: xhr,
        config
      }
      handleResponse(response)
    }
    // 网路请求错误
    xhr.onerror = function() {
      reject(
        createAxiosError({
          message: 'Network Error !',
          code: null,
          config,
          request: xhr
        })
      )
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })

    xhr.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // 获取响应失败
        reject(
          createAxiosError({
            message: `Request failed width status code ${response.status}`,
            code: null,
            config,
            request: xhr,
            response
          })
        )
      }
    }
  })
}
