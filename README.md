## Mage Fight

### Игра для 2 модуля Яндекс.Практикума

![preview.png](packages/client/public/images/rawPreview.png)

- Видео для командного зачёта: [первое](https://disk.yandex.ru/i/bemFDp9nvTfZHA), [второе](https://disk.yandex.ru/i/iu2oCUOj1yAxTA)

- [Прототип в фигме](https://www.figma.com/design/JxDvcmFWCqOx6ll6lmoTRD/MAGE-FIGHT)

- [Документация](docs/README.md) (Порядок работы с проектом, сценарий игры)

- [Отчет об утечках памяти](MEMORYLEAKS.md)

---

## Инструкция по работе с исходными файлами репозитория

### Как запускать в Docker-контейнерах

- [Инструкция](packages/server/README.md)

### Как запускать локально

1. Убедитесь что у вас установлен `node` 20 версии и `docker`
2. Выполните команду `yarn bootstrap` для установки зависимостей
3. Выберите команду запуска:

#### Для локальной работы
- `docker-compose up postgres` для запуска бд
- действия, описанные в README сервера для заполнения базы (нужно проделывать находясь в packages/server)
- В корне сервере в env-файле есть переменная POSTGRES_PORT_CONNECTION. Она должна совпадать по значению с POSTGRES_EXTERNAL_PORT из корневого env, т.к. мы подключаемся снаружи к базе, которая крутится внутри докера (зелёный прямоугольник на схеме ниже). Кроме того POSTGRES_HOST в серверном env должен быть равен localhost
- `yarn dev` для запуска режима разработки на порту `3000`

 
#### Для продовой сборки
- `docker-compose build` для сборки образа (необязательно выполнять, если ничего не меняли)
- `docker-compose up` для запуска за порту, который прописан в env-файле в корне проекта
- Подключение происходит в соответствии со схемой ниже (синий прямоугольник)

  ![img.png](packages/client/public/images/schema.png)
### Тесты, Линтинг, Форматирование (prettier)

`yarn test`, `yarn lint`, `yarn format`

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

### Как добавить зависимости

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

---

### Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

### Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {service_name}`, например `docker compose up server`
