import { isDate, isPlanObject } from './util'
/**
 * @description: 不对URL某些特殊字符进行编码
 * @param {string} url
 * @return {string}
 */
function encode(url: string): string {
  return encodeURIComponent(url)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 * @description: 构建合法的URL
 * @param {string} url
 * @param {any} params
 * @return {string}
 */
export function buildURL(url: string, params?: any) {
  if (!params) {
    return url
  }
  const parts = [] as string[]
  Object.keys(params).forEach((key) => {
    const currentVal = params[key]
    if (currentVal === null || typeof currentVal === 'undefined') {
      return
    }

    let values: string[] = []
    if (Array.isArray(currentVal)) {
      values = currentVal
      key += '[]'
    } else {
      values = [currentVal]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlanObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const index = url.indexOf('#')
    if (index !== -1) {
      url = url.slice(0, index)
    }
    url += (url.indexOf('?') !== -1 ? '' : '?') + serializedParams
  }
  return url
}
