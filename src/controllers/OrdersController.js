const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersController {
  async create(request, response) {
    const { details } = request.body;
    const user_id = request.user.id

    const highestOrder = await knex("orders")
      .select("order_code")
      .orderBy("order_code", "desc")
      .first();

    let nextOrderNumber = 1
    if (highestOrder) {
      const highestOrderNumber = parseInt(highestOrder.order_code, 10) 
      nextOrderNumber = highestOrderNumber + 1
    }

    const orderCode = String(nextOrderNumber).padStart(4, '0')

    await knex("orders").insert({
      order_details: details,
      order_code: orderCode,
      user_id
    });

    return response.json();
  }

  async update(request, response) {
    const { id } = request.params
    const { status } = request.body

    await knex('orders').where({ id }).update({ status })

    return response.json()
  }
}

module.exports = OrdersController;
