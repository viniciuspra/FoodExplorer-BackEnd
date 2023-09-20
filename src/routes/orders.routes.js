const { Router } = require('express')

const OrdersController = require("../controllers/OrdersController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");

const ordersController = new OrdersController();

const orderRoutes = Router();

orderRoutes.use(ensureAuthenticated);

orderRoutes.post("/", ordersController.create);
orderRoutes.put("/:id", ensureIsAdmin, ordersController.update);
orderRoutes.get("/", ordersController.index);
orderRoutes.delete("/:id", ordersController.delete);

module.exports = orderRoutes
