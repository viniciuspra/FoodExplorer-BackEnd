const { Router } = require('express')

const DishesController = require('../controllers/DishesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', dishesController.create)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.put('/:id', dishesController.update)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes