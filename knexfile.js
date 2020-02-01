// Update with your config settings.

const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds"
  },
  pool: {
    afterCreate: (conn, done) => {
      // runs after a connection is made to the sqlite engine
      conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
    },
  },
}

module.exports = {

  dev: {
    ...sqlite,
    connection: {
      filename: './data/dev.sqlite3'
    }
  },

  test: {
    ...sqlite,
    connection: {
      filename: './data/test.sqlite3'
    },
  },
};

//need to run npx knex migrate:latest --env=dev/test.
//need to run npx knex seed:run --env=dev/test