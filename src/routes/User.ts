import Services from '../controller/user'
import express from 'express'

const router = express.Router()

// Can receive req.query or req.params

router.get('/', Services.getAllUsers)

router.get('/:id', Services.getUserById)

router.put('/', Services.put)

// router.delete('/', Services.delete)

export default router
