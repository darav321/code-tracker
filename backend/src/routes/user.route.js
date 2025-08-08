import express from "express";
import { loginUser, registerUser, userDetails } from "../controllers/user.controller.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/userDetails', userDetails)

export default router