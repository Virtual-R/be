exports.up = async function(knex) {
    await knex.schema.createTable('projects', (table) => {
        table.increments('project_id')
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.string('title', 256).notNullable()
        table.string('description', 1024)
        table.decimal('goal_amount')
        table.decimal('amount_received')
        table.boolean('funding_completed').defaultTo(false)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('projects')
};
