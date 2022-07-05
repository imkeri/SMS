import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { useNavigate } from 'react-router-dom'








const Dashborad = () => {
 const navigate  = useNavigate()

  const [data,setdata] = useState("")
  const [feesdata,setfeesdata] = useState("")
  const getdata = async (id) => {
      const data = await axios.get(`http://192.168.1.40:8070/stud/countStud`).then((res) => {
        console.log(res.data.countData)
       
        setdata(res.data.countData)
      }).catch((err) => {
        console.log(err);
      })
    };
    useEffect(() => {
      getdata();
      fees();
    }, []);

    const fees = async (id) => {
      const data = await axios.get(`http://192.168.1.40:8070/fees/view/countFeeData`).then((res) => {
        console.log("kkkkkkkkkkkkkkkkkk",res.data.data)
       
        setfeesdata(res.data.data)
      }).catch((err) => {
        console.log(err);
      })
    };
  




  function logout(e){
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");

   
    
    
  }

  //  -----------------------------VIEW

  
  return (
    <div>
       <div className='container mx-0 px-0'>
        <div className='log_out_div'>
            <button className='log_out' onClick={(e)=> logout(e)}>Log out</button>
        </div>
            <div className=' d-flex justify-content-center'>
            <Cards countdata ={data}
              feesdata={feesdata}
            />
            
            </div>
            
            
         </div> 
    </div>
  )
}

export default Dashborad
