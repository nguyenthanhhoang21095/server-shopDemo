import Services from '../controller/search'
import express from 'express'
const router = express.Router()

router.post('/', Services.post)
router.get('/', Services.get)

export default router
