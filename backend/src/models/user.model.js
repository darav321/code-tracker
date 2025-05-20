import mongoose from'mongoose'

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    leetcode_username : {
        type : String
    },
    gfg_username : {
        type : String
    },
    codeforces_username : {
        type : String
    }
}, {timestamps : true})

const User = new mongoose.model('User', userSchema)

export default User