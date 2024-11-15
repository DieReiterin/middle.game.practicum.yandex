## Первый запуск и подготовка БД
1. Установите зависимости командой `yarn install`
2. Создайте файл `.env` в корне `packages\server` и укажите в нем переменные окружения:
```
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_PORT
POSTGRES_HOST
```

3. Создайте `.env` файл в корне проекта и укажите в нем переменные окружения:
```
CLIENT_PORT
SERVER_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_HOST
POSTGRES_PORT
PGADMIN_PORT
PGADMIN_DEFAULT_EMAIL
PGADMIN_DEFAULT_PASSWORD
```

Для продовой сборки используйте ```POSTGRES_HOST = postgres``` (имя контейнера в docker-compose)

4. Запустите контейнер с Postgres командой
```bash
docker-compose up -d
```
5. Запустите миграции командой 
```bash
yarn sequelize db:migrate
```
6. Запустите наполнение таблиц данными командой 
```bash
yarn sequelize db:seed:all
```
7. Запустите сервер командой 
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
