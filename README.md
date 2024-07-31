# Real Estate CRM built using NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

- This project demonstrates how to build a simple backend REST API for a Real Estate CRM.

Below are some features implemented to date:

- ### [Create, filter, Edit, Update, and Delete a user.](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/users.png)

- ![Create, filter, Edit, Update, and Delete a user.](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/users.png)

### Development environment:

To follow along with this project, you will be expected to:

- ... have Node.js installed.
- ... have Docker or PostgreSQL installed.
- ... have the Prisma VSCode Extension installed.(optional, you can also use your desired code editor)

## Setup and Run:

### clone the repository

To get started, clone the repository.

```
git clone https://github.com/Ermi24et/Real-Estate-CRM
```

### Navigate to the cloned directory

```
cd Real-Estate-CRM
```

### Install dependencies:

```
pnpm install
```

### Start the PostgreSQL database with Docker:

```
docker-compose up -d
```

### Apply database migrations:

```
pnpm prisma migrate dev
```

### Start the project:

```
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### unit tests

```
$ pnpm run test
```

### e2e tests

```
$ pnpm run test:e2e
```

### test coverage

```
$ pnpm run test:cov
```

### Access the project at:

```
http://localhost:8000/api
```

### Concepts covered:

- Controller
- Service
- Module
- DTO
- Entity
- Pipes
- Guards
- Interceptors
- Decorators
- Providers
- Exception Filters

### Technologies used:

- NestJS as a core framework.
- Prisma as an ORM.
- PostgreSQL for the database.
- Swagger for API documentation.
- Passport and passport-jwt for authentication.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
