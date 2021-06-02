import Services from '../controller/order'
import express from 'express'

const router = express.Router()

// Can receive req.query or req.params
router.get('/', Services.getOrderList);
router.get('/:id', Services.getOrderById);

router.post('/submit', Services.submitOrder);

export default router
