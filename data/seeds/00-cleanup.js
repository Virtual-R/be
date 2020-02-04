const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  // await knex('projects').truncate()
  // await knex('users').truncate()

  return cleaner.clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};