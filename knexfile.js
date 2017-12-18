// Update with your config settings.

module.exports = {

  development: {
    debug: true,
    client: 'postgresql',
    connection: 'postgres://localhost:5432/passport_users',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/passport_users_test',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }

};
