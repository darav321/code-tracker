import axios from 'axios'
import User from '../models/user.model.js'
import client from '../../Redis/client.js'

export const setUsername = async (req, res) => {
    try {
        const {username, id} = req.body
        if(!username) {
            return res.status(404).json({message : "Username not Found"})
        }
        if(!id) {
            return res.status(404).json({message : "User not found"})
        }
        const user = await User.findByIdAndUpdate(
            id,
            { $set: { leetcode_username: username } },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json({message : "Username has been set successfully", data : user})
    } catch (error) {
        console.log("Error while setting the leetcode username field")
        res.status(500).json({message : "Internal Server Error"})
    }
}

export const userDetails = async (req, res) => {
    const {username} = req.params

    const cacheData = await client.get(`leetcode:${username}`)
    if(cacheData) {
        return res.status(200).json(JSON.parse(cacheData))
    }

    // bUvCpe74Ki1fphvz

    const query = {
        query : `
        {
            matchedUser(username : "${username}") {
                username
                profile {
                    ranking
                    certificationLevel
                    countryName
                    realName
                }
                submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                languageProblemCount {
                    languageName
                    problemsSolved
                }
                badges {
                    name
                    hoverText
                    creationDate
                    id
                    icon
                }
            }
            userContestRanking(username: "${username}") {
                attendedContestsCount
                globalRanking
                rating
                topPercentage
                totalParticipants
            }
        }
        `,
    }

    try {
        const response  = await axios.post(process.env.LEETCODE_URL, query, {
            headers : {'Content-Type' : 'application/json'},
        })

        await client.set(`leetcode:${username}`, JSON.stringify(response.data.data), "EX", 600)

        res.status(200).json(response.data.data)
    } catch (error) {
        console.log("Error while fetching user details", error)
        res.status(500).json({message : "Internal server error"})
    }
}