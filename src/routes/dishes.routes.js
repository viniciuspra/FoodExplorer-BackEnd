const { Router } = require('express')
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const DishesController = require('../controllers/DishesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');

const dishesController = new DishesController()

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', ensureIsAdmin ,upload.single("image_url"),dishesController.create)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.put('/:id', ensureIsAdmin ,upload.single("image_url"),dishesController.update)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes