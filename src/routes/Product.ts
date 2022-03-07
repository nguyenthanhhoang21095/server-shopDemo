import Services from '../controller/product'
import express from 'express'
const router = express.Router()
import { authenticateToken, protectedRoute } from '../middlewares/authMiddleware'

// Can receive req.query or req.params
router.get('/', Services.get)
router.get('/:id', Services.getById)
router.get('/related/:id', Services.getRelatedById)

// Can receive req.body req.query or req.params
router.use(authenticateToken, protectedRoute)

router.post('/', Services.post)

router.put('/', Services.put)

router.delete('/', Services.delete)

export default router
