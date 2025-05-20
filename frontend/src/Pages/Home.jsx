import React from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import {Outlet} from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-slate-100 flex'>
      <div className="bg-white shadow-lg sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className='w-full overflow-y-auto overflow-hidden md:w-[calc(100vw-256px)]'>
        <Outlet/>
      </div>
    </div>    
  )
}

export default Home
