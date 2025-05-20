import axios from "axios"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userDetailsFromToken from "../../helpers/userDetailsFromToken.js"
import client from "../../Redis/client.js"

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            return res.status(400).json({message : "All fields are required"})
        }

        if(password.length < 6)
        {
            return res.status(400).json({message : "Password length must be at least 6 characters long"})
        }
        
        if(password.length > 12) {
            return res.status(400).json({message : "Password must be no more than 12 characters"})
        }

        const existingUser = await User.findOne({email})
                
        if(existingUser) {
            return res.status(409).json({message : "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new User({name, email, password:hashedPass})
        await newUser.save()

        res.status(200).json({message : "User registered successfully"})

    } catch (error) {
        console.log("Error while registering User", error)
        res.status(500).json({message : "Internal server error"})
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({message : "All fields are required"})
        }

        const useremail = await User.findOne({email})
        
        if(!useremail) {
            return res.status(400).json({message : "User does not exists"})
        }

        const checkPass = await bcrypt.compare(password, useremail.password)
        if(!checkPass) {
            return res.status(400).json({message : "Email and password does not match"})
        }

        const tokenData = {
            id : useremail._id,
            email : useremail.email
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn : '7d'})

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            }

        res.status(200).cookie('token', token, cookieOptions).json({message : "Login Successfull", token:token})
    } catch (error) {
        console.log("Error while signing in the User", error)
        res.status(500).json({message : "Internal server error"})
    }
}

export const userDetails = async (req, res) => {
    try {
        const token = req.cookies.token
        console.log(token)
        if(!token) {
            return res.status(401).json({message : 'Seesion-out', logOut : true})
        }
        console.log(token)
        const user = await userDetailsFromToken(token)
        if (user.logOut) {
            return res.status(401).json(user); 
        }

        res.status(200).json({ message: "User-Details", data: user });
    } catch (error) {
        console.log("Error while getting user details", error)
        res.status(500).json({message : "Internal Server Error"})
    }
}

export const logOut = async (req, res) => {
    try {
        res.cookie('token', "", {
            expires : new Date(0),
            httpOnly : true
        })
    
        res.status(200).json({message : "Log Out Successfull"}) 
    } catch (error) {
        console.log("Error while logging out", error)
        res.status(500).json({message : "Internal Server Error"})
    }
}

export const updateUsernames = async (req, res) => {
    try {
        const {id, leetcode, gfg} = req.body

        if(!id) {
            return res.status(400).json({message : "Userid is required"})
        }

        const user = await User.findByIdAndUpdate(id, {$set : {leetcode_username : leetcode, gfg_username : gfg}}, {new : true})

        if(!user) {
            res.status(404).json({message : "User not found"})
        }

        res.status(200).json({message : "user data updated successfully", dta : user})
    } catch (error) {
        console.log("Error while updating usernames of user")
        res.status(500).json({message : "Internal server error"})
    }
}

