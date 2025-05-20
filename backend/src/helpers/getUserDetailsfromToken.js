import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'

const getUserDetailsFromToken = async (token) => {
    if(!token) {
        return {
            message : 'session out',
            logOut : true
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decode.id) 

        return user
    }
}