const BASE_URL = 'https://ya-praktikum.tech/api/v2'

interface IOptions {
  timeout?: number
  method?: string
  headers?: Record<string, any>
  data?: Record<string, any> | FormData
  responseType?: XMLHttpRequestResponseType
  [key: string]: any
}

const METHODS: Record<string, string> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

type HttpMethod = (url: string, options?: IOptions) => Promise<unknown>

export default class HttpTransport {
  static queryStringify(data: Record<string, any>) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object')
    }

    const keys = Object.keys(data)
    return keys.reduce((result, key, index) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(data[key])
      return `${result}${encodedKey}=${encodedValue}${
        index < keys.length - 1 ? '&' : ''
      }`
    }, '?')
  }

  get: HttpMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  post: HttpMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  put: HttpMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  delete: HttpMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  request = (
    url: string,
    options: IOptions,
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, responseType } = options

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest()

      const fullUrl = `${BASE_URL}${url}`

      if (method === METHODS.GET && !!data) {
        xhr.open(method, `${fullUrl}${HttpTransport.queryStringify(data)}`)
      } else {
        xhr.open(method as string, fullUrl)
      }

      xhr.withCredentials = true
      xhr.timeout = timeout
      if (responseType) {
        xhr.responseType = responseType
      }
      xhr.onload = function () {
        resolve(xhr)
      }
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (!(data instanceof FormData)) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key])
        })
      }

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
