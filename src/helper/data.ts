/*
 * @Author: Mario
 * @Date: 2021-10-24 09:37:07
 * @LastEditTime: 2021-10-26 22:52:11
 * @LastEditors: Mario
 * @Description:
 */
import { isPlanObject } from './util'

/**
 * @description: 处理请求体
 * @param {any} data
 * @return {any}
 */
export function transformBodyData(data: any): any {
  if (isPlanObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
/**
 * @description: 处理响应结果
 * @param {any} data
 * @return {any}
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do something
    }
  }
  return data
}
