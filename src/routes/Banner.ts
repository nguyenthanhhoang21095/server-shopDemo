import Services from '../controller/banner'
import express from 'express'
const router = express.Router()

router.get('/', Services.get)

export default router;
