import Services from '../controller/user'
import express from 'express'
const router = express.Router()

// Can receive req.query or req.params
router.get('/', Services.getAllUsers)

// Can receive req.body req.query or req.params
router.post('/', Services.createNewUser)
router.post('/auth', Services.checkAuthUser)

router.put('/', Services.put)

// router.delete('/', Services.delete)

export default router
