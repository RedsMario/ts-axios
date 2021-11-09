/*
 * @Author: Mario
 * @Date: 2021-10-24 12:46:23
 * @LastEditTime: 2021-10-25 11:48:57
 * @LastEditors: Mario
 * @Description: 处理请求头
 */
import { isPlanObject } from './util'

/**
 * @description: 解析响应头
 * @param {string} headers
 * @return {object}
 */
export function parseHeaders(headers: string) {
  const responseHeaders = {} as { [key: string]: string }
  if (!headers) {
    return responseHeaders
  }
  const data = headers.split('\r\n')
  data.forEach(item => {
    const reg = /(.*?:)(.*)/.exec(item)
    const key = RegExp.$1
      .replace(':', '')
      .trim()
      .toLowerCase()
    responseHeaders[key] = RegExp.$2.trim()
  })
  return responseHeaders
}
/**
 * @description: 兼容Content-Type大小写不一致
 * @param {any} headers
 * @param {string} normalizeName
 * @return {void}
 */
function normalizeContentType(headers: any, normalizeName: string) {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}
/**
 * @description: 处理请求头
 * @param {any} headers
 * @param {any} data
 * @return {*}
 */
export function transformHeaders(headers: any, data: any) {
  normalizeContentType(headers, 'Content-Type')
  if (isPlanObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
    }
  }
  return headers
}
