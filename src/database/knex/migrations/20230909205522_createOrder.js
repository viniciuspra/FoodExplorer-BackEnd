exports.up = knex => knex.schema.createTable('orders', table => {
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users')
  table.string('status').defaultTo('Pendente')
  table.string('order_code').unique()
  table.string('order_details')

  table.dateTime('order_date').defaultTo(knex.fn.now())
  table.dateTime('confirmed_at')
})



exports.down = knex => knex.schema.dropTable('orders')
