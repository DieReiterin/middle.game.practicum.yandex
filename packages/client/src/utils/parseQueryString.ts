type TParseQueryString = (query: string) => TObject

export const parseQueryString: TParseQueryString = query => {
  const url = query.substring(1)
  const entities = url.split('&')
  const params: TObject = {}

  entities.forEach(entity => {
    const [key, value] = entity.split('=')
    params[key] = value
  })
  return params
}
