import React, { useState } from 'react'
import "../form/Insert.css"
import axios from 'axios'

const Insert_attandance = () => {
  const [msg,setmsg] = useState("");
  const dt = new Date().toLocaleDateString()
  console.log("rtyuio",dt);
  const url="http://192.168.1.39:8070/attendance/insert"
  const [data,setdata] = useState({
    SID:"",
    Rollno:"",
    Class: "",
    Date:dt,
    presant: "",

 
      
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
                            <label>SID<span>*</span></label>
                            <input type="text" name='SID' autoComplete='off'  onChange={(e)=>handle(e)} value={data.SID} ></input>
                            <label>Rollno<span>*</span></label>
                            <input type="text" name='Rollno' autoComplete='off' onChange={(e)=>handle(e)} value={data.Rollno}></input>
                            <label>Class<span>*</span></label>
                            <input type="text" name='Class' autoComplete='off'  onChange={(e)=>handle(e)} value={data.Class} ></input>
                            <label>presant<span>*</span></label>
                            <input type="text" name='presant' autoComplete='off' onChange={(e)=>handle(e)} value={data.presant}></input>
                            <button className="btn1" >insert</button>
                        </form>
                        
                    </div>     




    </>
  )
}


export default Insert_attandance
