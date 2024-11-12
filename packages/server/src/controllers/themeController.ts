import { Request, Response } from 'express'
import Theme from '../models/theme'
import UserTheme from '../models/userTheme'
import { handleError } from '../utils/errorHandler'

export const setUserTheme = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id, theme_id } = req.body

  try {
    const theme = await Theme.findByPk(theme_id)
    if (!theme) {
      res.status(404).json({ message: 'Тема не найдена' })
    }

    await UserTheme.upsert({ user_id, theme_id })

    res.status(200).json({ message: 'Тема успешно установлена' })
  } catch (error) {
    handleError(res, error)
  }
}

export const getUserTheme = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id } = req.params

  try {
    const userTheme = await UserTheme.findOne({
      where: { user_id },
      include: [
        {
          model: Theme,
          attributes: ['name', 'id'],
        },
      ],
    })

    if (!userTheme) {
      res.status(404).json({ message: 'Тема для пользователя не найдена' })
    } else {
      console.log(userTheme)
      res.status(200).json({
        name: userTheme.Theme?.dataValues.name,
        id: userTheme.Theme?.dataValues.id,
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

export const getThemes = async (_: Request, res: Response): Promise<void> => {
  try {
    const themes = await Theme.findAll()

    res.status(200).json(themes)
  } catch (error) {
    handleError(res, error)
  }
}
