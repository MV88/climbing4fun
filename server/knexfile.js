// Update with your config settings.

require("dotenv").config();

module.exports = {
  development: {
    debug: true,
    client: "pg",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: `./db/migrations`,
    },
    seeds: {
      directory: `./db/seeds`,
    },
  },
  test: {
    debug: false,
    client: "pg",
    connection: {
      database: process.env.POSTGRES_DB_TEST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: `./db/migrations`,
    },
    seeds: {
      directory: `./db/seeds`,
    },
  },
};
