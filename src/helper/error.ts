/*
 * @Author: Mario
 * @Date: 2021-10-26 21:03:33
 * @LastEditTime: 2021-10-26 22:53:06
 * @LastEditors: Mario
 * @Description: 错误类定义
 */

import { AxiosRequestConfig, AxiosResponse, IAxiosError } from '../types'

export class AxiosError extends Error {
  message: string
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.message = message
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    // Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
/**
 * @description: 工厂函数生成错误实例
 * @param {IAxiosError} param1
 * @return {AxiosError}
 */
export function createAxiosError({ message, config, code, request, response }: IAxiosError) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
