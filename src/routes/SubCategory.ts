import Services from '../controller/subCategory'
import express from 'express'
const router = express.Router()

router.get('/', Services.get)
router.get('/:id', Services.getById)

export default router;
