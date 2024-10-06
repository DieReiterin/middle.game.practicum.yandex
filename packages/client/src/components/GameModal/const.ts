interface IActions {
    key: string | string[]
    action: string
}

export const actions: IActions[] = [
    {
        key: ['A', 'D'],
        action: 'Движение влево-вправо',
    },
    {
        key: 'Space',
        action: 'Прыжок',
    },
    {
        key: 'E',
        action: 'Выстрелить файерболом',
    },
    {
        key: 'F',
        action: 'Воздушный удар',
    },
    {
        key: 'W',
        action: 'Поставить щит',
    },
    {
        key: 'Esc',
        action: 'Пауза',
    },
]
