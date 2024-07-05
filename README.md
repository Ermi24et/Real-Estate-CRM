# Real Estate CRM built using NestJS

## Description

- This project demonstrates how to build a simple backend REST API for a Real Estate CRM.

### Development environment:

To follow along with this project, you will be expected to:

- ... have Node.js installed.
- ... have Docker or PostgreSQL installed.
- ... have the Prisma VSCode Extension installed.(optional, you can also use your desired code editor)

## Setup and Run

### clone the repository

To get started, clone the repository.

```
git clone https://github.com/Ermi24et/Real-Estate-CRM
```

# Navigate to the cloned directory

```
cd Real-Estate-CRM
```

# Install dependencies:

```
pnpm install
```

# Start the PostgreSQL database with Docker:

```
docker-compose up -d
```

# Apply database migrations:

```
pnpm prisma migrate dev
```

# Start the project:

```
pnpm run start:dev
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
