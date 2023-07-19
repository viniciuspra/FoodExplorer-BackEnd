const { Router } = require('express')

const DishesController = require('../controllers/DishesController');

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.get('/', dishesController.index)
dishesRoutes.post('/:user_id', dishesController.create)
dishesRoutes.put('/:id', dishesController.update)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes