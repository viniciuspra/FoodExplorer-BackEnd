const { hash } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userWithEmail = await knex("users").where({ email }).first();
    if (userWithEmail) {
      throw new AppError("Este E-mail ja está em uso!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.json();
  }
}

module.exports = UsersController;
