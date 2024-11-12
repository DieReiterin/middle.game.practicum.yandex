import { Response } from 'express'

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    return res.status(500).json({ error: error.message })
  } else {
    return res.status(500).json({ error: 'Unknown error' })
  }
}
