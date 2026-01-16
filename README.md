<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
</p>

## Description

Easyauth, a simple auth api based on NestJS, MongoDB, and JWT

## Project setup

```bash
$ npm install
```

You can setup the database using docker for convience, but be sure to load env variables first. You can use the `ci-dev.sh` script to load the variables before laucnhing the database.

```bash
# loading env variables for convience
bash ./ci-dev.sh

docekr compose up -d
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## CI/CD

```bash
bash ./ci-dev.sh

# prod build
bash ./ci-prod.sh
```
