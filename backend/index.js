import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'
import cookieParser from 'cookie-parser'
import userRoutes from './src/routes/user.route.js'
import leetcodeRoutes from './src/routes/leetcode.route.js'
import gfgRoutes from './src/routes/gfg.route.js'
import { connectDB } from './helpers/connectDB.js'

dotenv.config()

const app = express()
app.use(cors({
    origin : "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/leetcode', leetcodeRoutes)
app.use('/api/gfg', gfgRoutes)

app.listen(5000, '0.0.0.0', ()=>{
    console.log('server running on port', 5000)
    connectDB()
})
