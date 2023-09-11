# КупиПодариДай

Стартеркит проекта разработки бэкенд сервиса вишлистов КупиПодариДай

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TO-DO
1. Во многих методах отсутствует указание на ожидаемый тип возвращаемых данных. Так как мы используем Typescript нам нужно стараться использовать по максимуму его преимущества.
2. Все entities содержат общие поля. Можно вынести данные поля в отдельный класс BaseEntity и использовать его для создания других entities.
3. Функционал связанный с модулем bcrypt лучше вынести в отдельный сервис и поместить в папку shared или common, или helpers.
4. Конфиг подключения к БД также лучше вынести в файл .env.