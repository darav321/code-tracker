import express from 'express'
import { setUsername, userDetails } from '../controllers/leetcode.controllers.js'

const router = express.Router()

router.get('/userDetails/:username', userDetails)
router.post('/setValue', setUsername)

export default router