import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    name : "",
    email : "",
    token : "",
    _id : "",
    leetcode : ""
}

export const userSlice = createSlice({
    name : 'tracker',
    initialState,
    reducers : {
        setUser : (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
        },
        setToken : (state, action) => {
            state.token = action.payload
        },
        logOut : (state) => {
            state._id = "",
            state.name = "",
            state.email = "",
            state.token = ""
        },
        setLeetcode : (state, action) => {
            console.log("redux")
            state.leetcode = action.payload
        }
    }
})

export const {setUser, logOut, setLeetcode, setToken} = userSlice.actions

export default userSlice.reducer