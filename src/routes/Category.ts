import Services from '../controller/category'
import express from 'express'
const router = express.Router()

router.get('/', Services.get)
router.get('/:id', Services.getById)

export default router;
