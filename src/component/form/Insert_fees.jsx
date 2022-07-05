import React, { useState } from 'react'
import "../form/Insert.css"
import axios from 'axios'

const Insert_fees = () => {
  const [msg,setmsg] = useState("");
  const dt = new Date().toLocaleDateString()
  console.log("rtyuio",dt);
  const url="http://192.168.1.40:8070/fees/insert"
  const [data,setdata] = useState({
    SID:"",
    Rollno:"",
    Class: "",
    Date:"",
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
                            <label>Fees<span>*</span></label>
                            <input type="text" name='Fees' autoComplete='off' onChange={(e)=>handle(e)} value={data.Fees}></input>
                            <label>AdminName<span>*</span></label>
                            <input type="text" name='AdminName' autoComplete='off'  onChange={(e)=>handle(e)} value={data.AdminName} ></input>
                            <label>Installment<span>*</span></label>
                            <input type="text" name='Installment' autoComplete='off' onChange={(e)=>handle(e)} value={data.Installment}></input>
                            <button className="btn1" >insert</button>
                        </form>
                        
                    </div>         

    </>
  )
}


export default Insert_fees
