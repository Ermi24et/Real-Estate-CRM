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

- This project demonstrates how to build a simple backend REST API for a Real Estate CRM(customer relationship management). CRM is a system for managing all of your company's interactions with current and potential customers(lead and opportunity).

Below are some features implemented to date:

- [Create, Filter, Edit, Update, and Delete a user.](https://github.com/Ermi24et/Real-Estate-CRM?tab=readme-ov-file#create-filter-edit-update-and-delete-a-user):

  - you can create a user with first name, last name, email, password, when you register you will get an OTP by your email then you can verify your email using that OTP.
  - you can find a user with its email or Id.
  - you can update a user by using his Id with first name, last name, email, password.
  - you can delete a user by Id.

- [Authorize, Authenticate, Verify password of a user](https://github.com/Ermi24et/Real-Estate-CRM?tab=readme-ov-file#authorize-authenticate-verify-password-of-a-user)
  - when log in using email and password you will get access tokens and refresh tokens, using those the access token you can access protected routes(eg. user profile).
  - here is the route to verify your email using the OTP.
- [Create, filter, Edit, Update, Delete a property](https://github.com/Ermi24et/Real-Estate-CRM?tab=readme-ov-file#create-filter-edit-update-delete-a-property)
  - you can create a property using name, price, and the neccessary attributes to create your property.
  - you can filter property by its Id
  - you can update a property by its Id.
  - you can delete a property by its Id.
- [Upload a file(image)]():
  - you can also upload a file(images) relating to the properties, the image will be optimized(tested example: an image optimized from 1826 KB to 38.2 KB)
- [Create, Filter, Edit, Update, Delete a lead](https://github.com/Ermi24et/Real-Estate-CRM?tab=readme-ov-file#create-filter-edit-update-delete-a-lead)
  - you can create a lead(potential customer) with name, email...
  - you can find a lead by its Id.
  - you can update a lead by its Id.
  - you can delete a lead by its Id.
- [Create, Filter, Edit, Update, Delete a opportunity](https://github.com/Ermi24et/Real-Estate-CRM?tab=readme-ov-file#create-filter-edit-update-delete-a-opportunities)
  - you can create an opportunity by its stage, probability, expected close date...
  - you can find an opportunity by its Id.
  - you can update an opportunity by its Id.
    you can delete an opportunity by its Id.
- [Create, Filter, Edit, Update, Delete a comments for the lead or opportunity created](https://github.com/Ermi24et/Real-Estate-CRM?tab=readme-ov-file#create-filter-edit-update-delete-a-comment-for-the-lead-or-opportunity-created)
  - you can create comments for lead and opportunity.
  - you can also filter the comments by Id and by page(eg. get the first 10 comments written for this lead or opportunity)
  - you can update the comments using Id(lead, opportunity)
  - you can delete the comments using Id(lead, opportunity)

### Create, Filter, Edit, Update, and Delete a user.

![users api](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/users.png)

### Authorize, Authenticate, Verify password of a user

![authorize user api](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/auth.png)

### Create, filter, Edit, Update, Delete a property

![property api](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/property.png)

### Upload a file(image)

![upload image api](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/uploadfile.png)

### Create, Filter, Edit, Update, Delete a lead

![lead api](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/lead.png)

### Create, Filter, Edit, Update, Delete a opportunities

![opportunities api](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/opportunity.png)

### Create, Filter, Edit, Update, Delete a comment for the lead or opportunity created

![comment api for lead and opportunity](https://github.com/Ermi24et/Real-Estate-CRM/blob/master/images/comments.png)

## Development environment:

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
