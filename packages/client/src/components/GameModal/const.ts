interface IActions {
  keyboardKey: string | string[]
  gamepadKey: string | string[]
  action: string
}

export const actions: IActions[] = [
  {
    action: 'Движение влево-вправо',
    keyboardKey: ['A', 'D'],
    gamepadKey: 'Левый стик',
  },
  {
    action: 'Прыжок',
    keyboardKey: 'Space',
    gamepadKey: 'A',
  },
  {
    action: 'Выстрелить файерболом',
    keyboardKey: 'E',
    gamepadKey: 'X',
  },
  {
    action: 'Воздушный удар',
    keyboardKey: 'F',
    gamepadKey: 'B',
  },
  {
    action: 'Поставить щит',
    keyboardKey: 'W',
    gamepadKey: 'Y',
  },
  {
    action: 'Пауза',
    keyboardKey: 'Esc',
    gamepadKey: 'Esc',
  },
]
