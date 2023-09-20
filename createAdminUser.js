const knex = require("./src/database/knex");
const AppError = require("./src/utils/AppError");

const createOrUpdateAdminUser = async () => {
  try {
    const existingAdminUser = await knex("users")
      .where({ isAdmin: true })
      .first();

    if (existingAdminUser) {
      // Atualize os dados do Admin caso queira
      const updatedAdminUserData = {
        name: "Novo Nome", // Atualize com o novo nome desejado
        email: "novoemail@example.com", // Atualize com o novo email desejado
        password: "novasenha", // Atualize com a nova senha desejada
        isAdmin: true,
      };

      await knex("users")
        .where({ id: existingAdminUser.id })
        .update(updatedAdminUserData);

      console.log("Dados do administrador atualizados com sucesso!");
    } else {
      // Caso nao tenha admin sera criado um com esss informçôes, modifique se necessário
      const adminUserData = {
        name: "admin",
        email: "admin",
        password: "admin",
        isAdmin: true,
      };

      await knex("users").insert(adminUserData);

      console.log("Usuário administrador criado com sucesso!");
    }

    process.exit(0);
  } catch (error) {
    throw new AppError(
      "Erro ao criar ou atualizar o usuário administrador:",
      error.message
    );
  }
};

createOrUpdateAdminUser().catch((error) => {
  console.error(error.message, error.statusCode);
  process.exit(1);
});
