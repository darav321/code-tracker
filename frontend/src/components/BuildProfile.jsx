import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeetcode, setUser } from "../redux/Users/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuildProfile = () => {
  const [data, setData] = useState({
    leetcode: "",
    gfg: "",
  });
  const user = useSelector((state) => state.user);
  console.log(user)
  const dispatch = useDispatch();
  const [userid, setUserid] = useState("")
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  
  useEffect(()=>{
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/userDetails`, {withCredentials : true})
        console.log(response)
        setUserid(response.data.data._id)
        setData({leetcode : response.data.data.leetcode_username, gfg : response.data.data.gfg_username})
        dispatch(setLeetcode(response.data.data.leetcode_username))
        dispatch(setUser(response.data.data))

      } catch (error) {
        console.log("Error while fetching user details", error)
      }
    }
    fetchUserDetails()
  },[])

  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/update-username`, {id : userid, leetcode : data.leetcode, gfg : data.gfg}, {withCredentials : true})
      console.log(response)
      dispatch(setLeetcode(data.leetcode));
      navigate(`/home/dashboard/${userid}`)
    } catch (error) {
      
    }
  };
  return (
    <div className="flex flex-col py-10 px-10 h-screen">
      <div className="w-full">
        <h1 className="text-5xl font-bold tracking-wide">
          Welcome to CodeTrack
        </h1>
        <p className="text-xl font-medium tracking-wide mt-2">
          Let's build a quick Profile
        </p>
      </div>
      <form onSubmit={handleOnSubmit} className="w-full">
        <div className="my-4">
          <TextField
            label="Leetcode username"
            type="text"
            name="leetcode"
            value={data.leetcode}
            onChange={handleOnChange}
          />
        </div>
        <div className="my-4">
          <TextField
            label="GFG username"
            type="text"
            name="gfg"
            value={data.gfg}
            onChange={handleOnChange}
          />
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BuildProfile;
