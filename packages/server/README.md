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

Для продовой сборки используйте `POSTGRES_HOST = postgres` (имя контейнера в docker-compose)

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

---

## Апи форума

1. Получение списка топиков:
   Метод запроса - GET
   Адрес - /topics
   Тело запроса пустое
   Тело ответа:

```javascript
{
   data: [
     {
        topic_id: 1234
        topic_name: 'forum1'
        topic_descr: 'descr1'
        messages_count: 156
     },
    {
        topic_id: 5678
        topic_name: 'forum2'
        topic_descr: 'descr2'
        messages_count: 234
     }
    ]
}
```

2.  Создать новый топик:
    Метод запроса - POST
    Адрес - /topics
    Тело запроса:

```javascript
{
   topic_name: 'topic3',
   topic_descr: 'topic description'
}
```

Тело ответа:

```javascript
{
   message: 'Topic created',
   data: {
     topic_name: 'topic3',
     topic_descr: 'topic description'
   }
}
```

3. Получить один топик и его сообщения:
   Метод запроса - GET
   Адрес - /topic/:topic_id
   Тело запроса пустое
   Тело ответа:

```javascript
{
   topic_id: 1234,
   topic_name: 'topic3',
   messages_count: 156,
   messages: [
      {
        user_name: 'Max',
        message_text: 'Some text'
      },
      {
        user_name: 'Max2',
        message_text: 'Some text2'
      },
   ],
}
```

4. Добавить сообщение в топик:
   Метод запроса - POST
   Адрес - /topic/:topic_id
   Тело запроса:

```javascript
{
   user_name: Max,
   message_text: 'Some text',
}

```

Тело ответа:

```javascript
{
   message: 'Message added',
   data:
      {
        message_id: 123,
        topic_id: 456,
        user_name: 'Max',
        message_text: 'Some text'
      },
}
```
