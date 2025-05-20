import jwt from 'jsonwebtoken'
import User from '../src/models/user.model.js'

const userDetailsFromToken = async (token) => {
    try {
        if(!token) {
            return {
                message : "Session Out",
                logOut : true
            }
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
    
        if(!decode.id) {
            throw new Error("Invalid token payload")
        }
    
        const user = await User.findById(decode.id)
    
        console.log(user)
        return user
    } catch (error) {
        console.error("Error while fetching user", error)
        return {
            message : "invalid or expired token",
            logOut : true
        }
    }
}

export default userDetailsFromToken