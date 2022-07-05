// import { Switch } from '@mui/material'
import React, { useState } from 'react'
// import { validate1 } from './Validate1'
import "../form/Insert.css"
import axios from 'axios'



const Login = () => {
  // const [togglee,settoggle] = useState(false);
  //   const toggle =()=>{
  //       togglee ? settoggle(false):settoggle(true)
  //   } 
  const [msg,setmsg] = useState("");
  const url="http://192.168.1.39:8070/stud/ragister"
  const [data,setdata] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    F_occupation: "",
    M_occupation: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    gender: "male",
    Rollno: " ",
    Class: "",
 
      
  });
  function insert(e){
    console.log("DAtA",data)
    e.preventDefault();
    axios.post(url,data)
    .then(res=>{
      console.log(res)
      setmsg(res.data.message)
    }).catch((error)=>{
      console.log(error)
    })
  }
  function handle(e){
    const {name,value}=e.target
    setdata({...data, [name]:value})
  }
  return ( 
    <>
<div className="box">
                        
                        <form method="" action="" name='test_form' onSubmit={(e)=>insert(e)}>
                            <label>Student Name<span>*</span></label>
                            <input type="text" name='name' autoComplete='off'  onChange={(e)=>handle(e)} value={data.name} ></input>
                            <label>Father name<span>*</span></label>
                            <input type="text"  name='fatherName' autoComplete='off'  onChange={(e)=>handle(e)} value={data.fatherName}></input>
                            <label>Mother Name<span>*</span></label>
                            <input type="text"  name='motherName' autoComplete='off' onChange={(e)=>handle(e)}  value={data.motherName}></input>
                            <label>Father occupation<span>*</span></label>
                            <input type="text" name='F_occupation' autoComplete='off'  onChange={(e)=>handle(e)} value={data.F_occupation}></input>
                            <label>Mother occupation<span>*</span></label>
                            <input type="text"  name='M_occupation' autoComplete='off'  onChange={(e)=>handle(e)} value={data.M_occupation}></input>
                            <label>Email<span>*</span></label>
                            <input type="text" name='email' autoComplete='off' onChange={(e)=>handle(e)} value={data.email}></input>
                            <label>Mobile number<span>*</span></label>
                           
                            <input type="text"  name='phone' autoComplete='off' onChange={(e)=>handle(e)} value={data.phone} ></input>
                            <label>Address</label>
                            <textarea rows=" " cols=""  onChange={(e)=>handle(e)} name="address" value={data.address}> </textarea>
                            <label>City<span>*</span></label>
                            <input type="text"  name='city' autoComplete='off' onChange={(e)=>handle(e)}  value={data.city } ></input>
                            <label >Gender:</label>
                            <select name="gender"  onChange={(e)=>handle(e)} >
                                <option value="male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Female">other</option>
                            </select>
                            <label>Rollno<span>*</span></label>
                            <input type="text" name='Rollno' autoComplete='off' onChange={(e)=>handle(e)} value={data.Rollno}></input>
                            <label>Class<span>*</span></label>
                            <input type="text" name='Class' autoComplete='off' onChange={(e)=>handle(e)} value={data.Class}></input>
                            <button className="btn1" > ragistration</button>
                            <h6 className='text-center'>{msg}</h6>
                        </form>
                        
                    </div>         

    </>
  )
}

export default Login