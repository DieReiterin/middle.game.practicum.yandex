### Подготовка базы данных

1. Переходим в терминале в папку сервера - `cd packages/server`

2. (Если вы в продакшне: переходим в контейнер через `docker exec -it prakticum-server sh`, далее все команды в нём, выход - `exit`)

3. Запуск миграций - `yarn sequelize db:migrate`

4. Наполнение таблиц данными - `yarn sequelize db:seed:all`

### Откат изменений в базе данных, удаление таблиц

1. Откат миграций - `yarn sequelize db:migrate:undo:all`

2. Удаление таблиц - `yarn sequelize db:seed:undo:all`

---

### Апи форума

#### Пример полного адреса - `http://localhost:3001/api/forum/topic/1`

1. Получение списка топиков:

- Метод запроса - GET
- Адрес - /topics
- Тело запроса пустое
- Тело ответа:

```javascript
{
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
}
```

2.  Создать новый топик:

- Метод запроса - POST
- Адрес - /topics
- Тело запроса:

```javascript
{
   topic_name: 'topic3',
   topic_descr: 'topic description'
}
```

- Тело ответа:

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

- Метод запроса - GET
- Адрес - /topic/:topic_id
- Тело запроса пустое
- Тело ответа:

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

- Метод запроса - POST
- Адрес - /topic/:topic_id
- Тело запроса:

```javascript
{
   user_name: 'Max',
   message_text: 'Some message text',
}
```

- Тело ответа:

```javascript
{
   message: 'Message added successfully',
   data:
      {
        message_id: 123,
        topic_id: 456,
        user_name: 'Max',
        message_text: 'Some text'
      },
}
```
