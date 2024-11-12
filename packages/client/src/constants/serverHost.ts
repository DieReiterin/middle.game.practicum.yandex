export const SERVER_HOST =
  typeof window === 'undefined'
    ? import.meta.env.VITE_INTERNAL_SERVER_URL
    : import.meta.env.VITE_EXTERNAL_SERVER_URL
