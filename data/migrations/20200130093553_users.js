//users table. This is the master table that the other tables will reference.

exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
};
