// Update with your config settings.

module.exports = {

  production: {
    debug: true,
    client: 'postgresql',
    connection: 'postgres://postgres@postgres:5432/postgres',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },

  development: {
    debug: true,
    client: 'postgresql',
    connection: 'postgres://postgres@postgres:5432/postgres',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/postgres',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }

};
