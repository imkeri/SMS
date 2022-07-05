import React from 'react'
import { Route, Routes } from 'react-router-dom'
import "./style.css"
import "./component/navbar/navstyle.css"
import Dashborad from "./component/dashboard/Dashborad"
import Userprofile from "./component/userprofile/Userprofile"
import Staff_Table  from "./component/table/Staff_Table" 
import Loginuse from './component/login/Loginuse'
import "./component/login/loginuser.css"
import Navbar from './component/Navbar'
import Attandance from "./component/Attandance/Attandance"
import Fesslist from './component/fees/Fesslist'
const App = () => {

  const token = localStorage.getItem("token");
  console.log("token -=", token);
  return (
    <>
    
        <Routes >
        <Route path="/" element={<Loginuse/>}/>
        <Route element={ token ? <Navbar/> : <Loginuse />}>
            <Route path="dashborad" element={token ? <Dashborad /> : <Loginuse/>}/>
            <Route  path="student" element={token ?   <Userprofile />: <Loginuse /> }> </Route> 
            <Route path="tablelist" element={token ?   <Staff_Table />: <Loginuse />}></Route>
            <Route path="fees" element={token ?   <Fesslist></Fesslist>: <Loginuse />}/>
            <Route path = 'attandance' element={ token ?  <Attandance />: <Loginuse />}></Route>
            

        </Route>
        </Routes> 
    </>
  )
}
export default App
