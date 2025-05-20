import express from "express";
import { loginUser, registerUser, updateUsernames, userDetails } from "../controllers/user.controller.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/userDetails', userDetails)
router.post('/update-username', updateUsernames)

export default router