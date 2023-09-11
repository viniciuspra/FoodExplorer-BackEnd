const { Router } = require('express')

const OrdersController = require("../controllers/OrdersController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersController = new OrdersController();

const orderRoutes = Router();

orderRoutes.use(ensureAuthenticated);

orderRoutes.post("/", ordersController.create);
orderRoutes.put("/:id", ordersController.update);

module.exports = orderRoutes
