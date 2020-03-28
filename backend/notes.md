# TODO

 1. Extract celebrate middleware logic
 2. Config eslint & prettier
 3. Finalize all missing integration tests
 4. Improve authentication with JWT 

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