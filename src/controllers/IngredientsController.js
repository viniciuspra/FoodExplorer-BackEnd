const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {
  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!id) {
      throw new AppError("ID do ingrediente não fornecido.");
    }

    if (!name) {
      throw new AppError("O novo nome do ingrediente não foi fornecido.");
    }

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

    if (!id) {
      throw new AppError("ID do ingrediente não fornecido.");
    }

    await knex("ingredients").where({ id }).delete();

    if (!ingredient) {
      throw new AppError("Ingrediente não encontrado!");
    }

    return response.json();
  }
}

module.exports = IngredientsController;
