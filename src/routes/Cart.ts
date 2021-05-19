import Services from '../controller/cart';
import express from 'express';

const router = express.Router()

// Can receive req.query or req.params
router.get('/:id', Services.getById)
// router.post('/:id', Services.initNewCart)
router.put('/', Services.updateCart)

router.delete('/:id', Services.deleteCart)

export default router
