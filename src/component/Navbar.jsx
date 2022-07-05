import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './navbar/Sidebar'

const Navbar = () => {
  return (
        <div className='main_page'>
        <div className='sidebar'>
        <Sidebar />
        
        </div>
         <div className='page'>
                <Outlet />
         </div>
         
     </div>
  )
}

export default Navbar
