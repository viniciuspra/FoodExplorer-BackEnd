const { Router } = require("express");

const IngredientsController = require("../controllers/IngredientsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");

const ingredientsController = new IngredientsController();

const ingredientsRoutes = Router();

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.put("/:id", ensureIsAdmin, ingredientsController.update);
ingredientsRoutes.delete("/:id", ensureIsAdmin, ingredientsController.delete);

module.exports = ingredientsRoutes;
