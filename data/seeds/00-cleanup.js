exports.seed = async function(knex) {
  await knex('projects').truncate()
  await knex('users').truncate()
};

