const knex = require("./src/database/knex");
const AppError = require("./src/utils/AppError");

const createAdminUser = async () => {
  try {
    const existingAdminUser = await knex("users")
      .where({ isAdmin: true })
      .first();

    if (existingAdminUser) {
      throw new AppError("Já existe um usuário administrador.");
    }

    const adminUserData = {
      name: "admin",
      email: "admin",
      password: "admin",
      isAdmin: true,
    };

    await knex("users").insert(adminUserData);

    console.log("Usuário administrador criado com sucesso!");
    process.exit(0);
  } catch (error) {
    throw new AppError("Erro ao criar o usuário administrador:", error.message);
  }
};

createAdminUser()
  .catch((error) => {
    console.error(error.message, error.statusCode);
    process.exit(1);
  });