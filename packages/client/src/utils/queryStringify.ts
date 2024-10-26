const parseObject = (obj: TObject): string => {
  let res = ''
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'object' && value) {
      res += `[${key}]${parseObject(value as TObject)}&`
    } else {
      res += `[${key}]=${value}&`
    }
  }
  return res.substring(0, res.length - 1)
}

export const queryStringify = (data: TObject): string | never => {
  if (typeof data !== 'object') throw new Error('input must be an object')
  let result = ''

  for (const key in data) {
    const value = data[key]
    if (Array.isArray(value)) {
      result += value.reduce((acc, item, idx) => {
        acc += `${key}[${idx}]=${item}&`
        return acc
      }, '')
    } else if (typeof value === 'object' && value) {
      result += `${key}${parseObject(value as TObject)}&`
    } else result += `${key}=${value}&`
  }

  return result.substring(0, result.length - 1)
}
