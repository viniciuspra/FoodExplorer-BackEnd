const knex = require("../database/knex");
const DiskStorage = require("../providers/diskStorage");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { name, description, price, ingredients, category } = request.body;
    const user_id = request.user.id;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFilename);

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
      image_url: filename,
      user_id,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        user_id,
        name: ingredient,
        dish_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }

  async update(request, response) {
    const { name, description, category, price, ingredients, image_url } =
      request.body;
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

    if (request.file && dish.image_url) {
      await diskStorage.deleteFile(dish.image_url);
    }

    let filename = dish.image_url;
    if (request.file) {
      filename = await diskStorage.saveFile(request.file.filename);
    }

    const updatedDish = {
      image_url: image_url || filename,
      name: name || dish.name,
      description: description || dish.description,
      category: category || dish.category,
      price: price || dish.price,
    };

    await knex("dishes").where({ id }).update(updatedDish);

    await knex("ingredients").where({ dish_id: id }).delete();
    const ingredientsInsert = Array.isArray(ingredients)
      ? ingredients.map((ingredient) => ({
          dish_id: id,
          name: ingredient,
        }))
      : [
          {
            dish_id: id,
            name: ingredients,
          },
        ];
    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json("Prato atualizado com sucesso");
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

    let dishes;

    if (ingredients) {
      const filteredIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
        ])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("name", filteredIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name");
    } else {
      dishes = await knex("dishes")
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    }

    const dishesIngredients = await knex("ingredients");
    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredient = dishesIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );
      return {
        ...dish,
        ingredients: dishIngredient,
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
