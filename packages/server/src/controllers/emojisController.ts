import { Request, Response } from 'express'
import Emojis from '../models/emojis'
import { handleError } from '../utils/errorHandler'

export const getEmojis = async (_: Request, res: Response): Promise<void> => {
  try {
    const emojis = await Emojis.findAll()

    res.status(200).json(emojis)
  } catch (error) {
    handleError(res, error)
  }
}
