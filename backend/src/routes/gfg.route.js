import express from 'express'
import { gfgUserDetails } from '../controllers/gfg.controller.js'

const router = express.Router()

router.get("/userDetails/:username", gfgUserDetails)

export default router