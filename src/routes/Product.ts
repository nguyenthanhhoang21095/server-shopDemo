import Services from '../controller/product'
import express from 'express'
const router = express.Router()

// Can receive req.query or req.params
router.get('/', Services.get)
router.get('/:id', Services.getById)

// Can receive req.body req.query or req.params
router.post('/', Services.post)

router.put('/', Services.put)

router.delete('/', Services.delete)

export default router
