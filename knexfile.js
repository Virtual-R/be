// Update with your config settings.

const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds"
  }
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