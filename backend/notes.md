# TODO

 1. Config eslint & prettier
 2. Finalize all missing integration tests
 3. Improve authentication with JWT 

## Knex migration stuff
https://knexjs.org/#Installation-migrations

 - Create a knew config file
 `npx knex init`

 - Add migrations directory in config
 ```
 migrations: {
      directory: './src/database/migrations'
    }
 ```

 - Create a migrate file
 `npx knex migrate:make <name of file (ex: create_users)>`

 - Execute migration
 `npx knex migrate:latest`