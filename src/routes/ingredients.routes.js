const { Router } = require('express')

const IngredientsController = require('../controllers/IngredientsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const ingredientsController = new IngredientsController()

const ingredientsRoutes = Router()

ingredientsRoutes.use(ensureAuthenticated)

ingredientsRoutes.put('/:id', ingredientsController.update)
ingredientsRoutes.delete('/:id', ingredientsController.delete)

module.exports = ingredientsRoutes