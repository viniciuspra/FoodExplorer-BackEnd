const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { name, description, price, ingredients, image_url } = request.body;
    const { user_id } = request.params;

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      image_url,
      user_id,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
        user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }

  async update(request, response) {
    const { name, description, price, image_url } = request.body;
    const { dish_id } = request.params;

    const dish = await knex("dishes").where({ id: dish_id }).first();
    if (!dish) {
      throw new AppError("Prato não encontrado!");
    }

    await knex("dishes")
      .where({ id: dish_id })
      .update({
        name: name || dish.name,
        description: description || dish.description,
        price: price || dish.price,
        image_url: image_url || dish.image_url,
      });

    return response.json();
  }
}

module.exports = DishesController;
