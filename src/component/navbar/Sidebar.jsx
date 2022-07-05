import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';
import LoginIcon from '@mui/icons-material/Login';

const Sidebar = () => {
  const [responsive,setresponsive] = useState(false)
  return (
    <div>
      <nav className="navbar">
        
        <div className='border_div'>
        <h2 className='logo'>Creative tim</h2>
        </div>
      
          <ul className={ responsive ? "nav_links_responsive" :"navbar_links "}
          onClick={() => setresponsive(false)}>
            <Link to="/dashborad"><li><DashboardIcon style={{marginRight:"15px"}}/> Dashboard</li></Link>
            <Link to="/student" ><li> <PersonIcon style={{marginRight:"15px"}}/> Student List</li></Link>
            <Link to="/tablelist" ><li><TableChartIcon style={{marginRight:"15px"}} /> Staff List</li></Link>
            <Link to="/fees" ><li><TableChartIcon style={{marginRight:"15px"}} /> Fees Detail</li></Link>
            <Link to="/attandance" ><li><LoginIcon style={{marginRight:"15px"}}/> Attandance</li></Link>
          
          </ul>
          <button className='mobile_menu_icon'
          onClick={()=> setresponsive(!responsive)}>
            { responsive ? (
              <i className='fas fa-times'></i>
              ) : (
              <i className='fas fa-bars'></i>
            )}
          </button>
        </nav>
      </div>
  )
}

export default Sidebar
