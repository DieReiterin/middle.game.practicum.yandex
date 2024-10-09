import HttpTransport from './HttpTransport'

const getStaticApiInstance = new HttpTransport()

type TResponse = Blob | string

export default class GetStaticApi {
  request(path: string): Promise<TResponse> {
    return getStaticApiInstance
      .get(`/resources${path}`, { responseType: 'blob' })
      .then(xhr => {
        const response = (xhr as XMLHttpRequest).response
        if (!response) {
          throw new Error('Empty response received')
        }
        return response
      })
  }
}
