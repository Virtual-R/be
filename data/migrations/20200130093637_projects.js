exports.up = async function(knex) {
    await knex.schema.createTable('projects', (table) => {
        table.increments('project_id')
        table.string('title', 256).notNullable()
        table.string('description', 1024)
        table.integer('goal_amount')
        table.integer('amount_received')
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('projects')
};
