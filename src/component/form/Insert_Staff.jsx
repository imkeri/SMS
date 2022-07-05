import React, { useState } from 'react'
import "../form/Insert.css"
import axios from 'axios'

const Insert_Staff = () => {
  const [msg,setmsg] = useState("");
  const url="http://192.168.1.40:8070/staff/ragister"
  const [data,setdata] = useState({
    Name:"",
    Email:"",
    Degree: "",
    Subject:"",
    Salary: "",
    Fresher: "0",
    Experience:"",

 
      
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
                            <label>Name<span>*</span></label>
                            <input type="text" name='Name' autoComplete='off'  onChange={(e)=>handle(e)} value={data.Name} ></input>
                            <label>Email<span>*</span></label>
                            <input type="text" name='Email' autoComplete='off' onChange={(e)=>handle(e)} value={data.Email}></input>
                            <label>Degree<span>*</span></label>
                            <input type="text" name='Degree' autoComplete='off'  onChange={(e)=>handle(e)} value={data.Degree} ></input>
                            <label>Subject<span>*</span></label>
                            <input type="text" name='Subject' autoComplete='off' onChange={(e)=>handle(e)} value={data.Subject}></input>
                            <label>Salary<span>*</span></label>
                            <input type="text" name='Salary' autoComplete='off' onChange={(e)=>handle(e)} value={data.Salary}></input>
                            <label>Are you Fresher ?</label>
                            <select name="Fresher"  onChange={(e)=>handle(e)} >
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            <label>Experience (if you are not Fresher)<span>*</span></label>
                            <input type="text" name='Experience' autoComplete='off' onChange={(e)=>handle(e)} value={data.Experience}></input>
                            <button className="btn1" > submit</button>
                        </form>
                        
                    </div>         

    </>
  )
}


export default Insert_Staff
