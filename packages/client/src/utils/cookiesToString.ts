export const cookiesToString = (cookies: { [key: string]: string }): string =>
  Object.entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(';')
