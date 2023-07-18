exports.up = knex => knex.schema.createTable('dishes',table => {
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
  table.string('name')
  table.string('description')
  table.string('category')
  table.string('image_url')
  table.float('price')

  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('dishes');
