import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios'
import toast from "react-hot-toast";

const Register = () => {
    const [data, setData] = useState({
      name : "",
      email : "",
      password : ""
    })
    const [touched, setTouched] = useState({email : false, password : false})
    const [vis, setVis] = useState(false)
    const ref = useRef()
    const toggleVis = () => {
      if(!vis) {
        ref.current.type = "text"
      }
      else {
        ref.current.type = "password"
      }
      setVis((prev) => !prev)
    }
    const handleOnChange = (e) => {
      const {name, value} = e.target

      setData((prev) => {
        return {
          ...prev,
          [name] : value
        }
      })
    }
    const handleBlur = (e) => {
      setTouched({ ...touched, [e.target.name]: true });
    }
    const handleOnSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, data)
        if(response.statusText === "OK")
        {
          toast.success("User registered successfully")
        }
      } catch (error) {
        toast.error(error.response.data.message)
        
      }
      console.log(data)
    }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleOnSubmit} className="flex items-center justify-center flex-col w-full max-w-md shadow-2xl border py-5 px-10 rounded-lg">
        <h1 className="text-3xl font-bold m-1 text-slate-800">
          Register to CodeTrack
        </h1>
        <p className="text-sm font-medium text-gray-400 tracking-wide">All fields are required</p>
        <div className="w-full mt-6">
          <TextField
            id="outlined-password-input"
            label="Name"
            type="text"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            InputProps={{
              endAdornment : <InputAdornment position="end"><FaRegUser size={22}/></InputAdornment>
            }}
            fullWidth
            required
            onBlur={handleBlur}
            error={touched.email && !data.email}
            helperText={touched.email && !data.email ? "Email is required..." : ""}
          />
        </div>
        <div className="w-full mt-6">
          <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            autoComplete="current-password"
            InputProps={{
              endAdornment : <InputAdornment position="end"><MdOutlineEmail size={25}/></InputAdornment>
            }}
            fullWidth
            required
            onBlur={handleBlur}
            error={touched.email && !data.email}
            helperText={touched.email && !data.email ? "Email is required..." : ""}
          />
        </div>
        <div className="w-full mt-6">
        <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            inputRef={ref}
            value={data.password}
            onChange={handleOnChange}
            autoComplete="current-password"
            fullWidth
            required
            InputProps={{
              endAdornment : <InputAdornment position="end">{vis ? <MdOutlineVisibility onClick={()=>toggleVis()} size={25} className="cursor-pointer"/> : <MdOutlineVisibilityOff onClick={()=>toggleVis()} size={25} className="cursor-pointer"/>}</InputAdornment>
            }}
            onBlur={handleBlur}
            error={touched.password && !data.password}
            helperText={touched.password && !data.password ? "Password is required..." : ""}
          />
        </div>
        <div onClick={handleOnSubmit} className="mt-7 w-full">
            <Button size="large" fullWidth type="submit" variant="contained"><p>Register</p></Button>
        </div>
        <Link to={'/login'} className="mt-6 text-sm tracking-wide font-medium text-slate-500 w-full text-center">
          <p>Already registered? <span className="text-blue-400 cursor-pointer hover:text-blue-500">Login</span></p>
        </Link>
        <div className="flex items-center w-full justify-center">
          <div className="bg-slate-300 p-[0.5px] w-[45%] mt-4"></div>
          <p className="mt-4 px-2 text-slate-500">or</p>
          <div className="bg-slate-300 p-[0.5px] w-[45%] mt-4"></div>
        </div>
        <div className="mt-6 w-full">
          <GoogleLogin
          onSuccess={(response) => {
            const decodedUser = jwtDecode(response.credential);
            console.log(decodedUser)
          }}
          onError={() => console.log("Login Failed")}
        />
        </div>
      </form>
    </div>
  );
};

export default Register;
