import Services from '../controller/auth'
import express from 'express'

const router = express.Router()

// Can receive req.query or req.params
router.post('/login', Services.handleLogin)
router.post('/refresh-token', Services.refreshToken)
router.post('/register', Services.handleRegister)

export default router
