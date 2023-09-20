const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const { hash } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Nome, e-mail e senha são obrigatórios.", 400);
    }

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
