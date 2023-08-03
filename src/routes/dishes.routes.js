const { Router } = require('express')
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const DishesController = require('../controllers/DishesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const dishesController = new DishesController()

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', upload.single("image_url"),dishesController.create)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.put('/:id', upload.single("image_url"),dishesController.update)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes