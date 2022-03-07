import Services from '../controller/cart';
import express from 'express';

const router = express.Router();

// Can receive req.query or req.params
router.get('/:id', Services.getById);
// router.post('/:id', Services.initNewCart);
router.post('/add', Services.addToCart);
router.post('/remove', Services.removeFromCart);
router.put('/update', Services.updateCart);


export default router
