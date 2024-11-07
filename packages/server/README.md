## Первый запуск и подготовка БД
1. Установите зависимости командой `yarn install`
2. Создайте файл `.env` в корне проекта и укажите в нем переменные окружения:
```
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_PORT
```
3. Запустите контейнер с Postgres командой
```bash
docker-compose up -d
```
4. Запустите миграции командой 
```bash
yarn sequelize db:migrate
```
5. Запустите наполнение таблиц данными командой 
```bash
yarn sequelize db:seed:all
```
6. Запустите сервер командой 
```bash
yarn run preview
```

## Откат изменений или удаление таблиц
1. Откат миграций командой 
```bash
yarn sequelize db:migrate:undo:all
```
2. Удаление таблиц командой 
```bash
yarn sequelize db:seed:undo:all
```
