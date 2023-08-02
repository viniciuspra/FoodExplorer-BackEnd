const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { name, description, price, ingredients, image_url } = request.body;
    const user_id = request.user.id;

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
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("Prato não encontrado!");
    }

    await knex("dishes")
      .where({ id })
      .update({
        name: name || dish.name,
        description: description || dish.description,
        price: price || dish.price,
        image_url: image_url || dish.image_url,
      });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return response.json({
      ...dish,
      ingredients,
    });
  }

  async index(request, response) {
    const { name, ingredients } = request.query;
    const user_id = request.user.id;

    let dishes;
    if (ingredients) {
      const filteredIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      dishes = await knex("ingredients")
        .select(["dishes.id", "dishes.name", "dishes.user_id"])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("ingredients.name", filteredIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name");
    } else {
      dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    }

    const userIngredients = await knex("ingredients").where({ user_id });
    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredients = userIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });

    return response.json(dishesWithIngredients);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }
}

module.exports = DishesController;
