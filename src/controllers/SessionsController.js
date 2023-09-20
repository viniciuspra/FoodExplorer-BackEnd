const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const authConfig = require("../configs/auth");

const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new AppError("E-mail e senha são obrigatórios.", 400);
    }

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta!", 401);
    }

    const passwordMatched = await compare(password, user.password);

    const isAdminPasswordMatched = user.isAdmin && password === user.password;

    if (!passwordMatched && !isAdminPasswordMatched) {
      throw new AppError("E-mail e/ou senha incorreta!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ isAdmin: user.isAdmin }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
