const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {
  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const ingredient = await knex("ingredients").where({ id }).first();
    if (!ingredient) {
      throw new AppError("Ingrediente não encontrado!");
    }

    await knex("ingredients")
      .where({ id })
      .update({
        name: name || ingredient.name,
      });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("ingredients").where({ id }).delete();

    return response.json();
  }
}

module.exports = IngredientsController;
