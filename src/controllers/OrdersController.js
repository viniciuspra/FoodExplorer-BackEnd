const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersController {
  async create(request, response) {
    const { details } = request.body;
    const user_id = request.user.id;

    if (!details) {
      throw new AppError("Detalhes do pedido não fornecidos.");
    }

    const highestOrder = await knex("orders")
      .select("order_code")
      .orderBy("order_code", "desc")
      .first();

    let nextOrderNumber = 1;
    if (highestOrder) {
      const highestOrderNumber = parseInt(highestOrder.order_code, 10);
      nextOrderNumber = highestOrderNumber + 1;
    }

    const orderCode = String(nextOrderNumber).padStart(4, "0");

    await knex("orders").insert({
      order_details: details,
      order_code: orderCode,
      user_id,
    });

    return response.json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    if (!id) {
      throw new AppError("ID do pedido não fornecido.");
    }

    if (!status) {
      throw new AppError("Status do pedido não fornecido.");
    }

    const updatedData = { status };

    if (status === "Entregue") {
      updatedData.confirmed_at = new Date().toLocaleDateString("pt-BR");
    } else if (status === "Pendente" || status === "Preparando") {
      updatedData.confirmed_at = null;
    }

    await knex("orders").where({ id }).update(updatedData);

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const ordersQuery = knex("orders").select("*");

    const user = await knex("users").where({ id: user_id }).first();

    if (user_id && !user.isAdmin) {
      ordersQuery.where({ user_id });
    }

    const orders = await ordersQuery.orderByRaw(
      "CASE WHEN status = 'Pendente' THEN 1 WHEN status = 'Preparando' THEN 2 WHEN status = 'Entregue' THEN 3 ELSE 4 END"
    );

    return response.json(orders);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      throw new AppError("ID do pedido não fornecido.");
    }

    await knex("orders").where({ id }).delete;

    return response.json();
  }
}

module.exports = OrdersController;
