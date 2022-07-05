import axios from 'axios'
import React, {useState } from 'react'
import "../login/loginuser.css"

const Loginuse = () => {

    const url="http://192.168.1.40:8070/admin/login"
    const [data,setdata] = useState({
        email:"",
        password:""
    })
   
 
    

    function submit(e){
      e.preventDefault();
      axios.post(url,{
        email:data.email,
        password:data.password
      })
      .then(res=>{
        console.log(res.data)
        localStorage.setItem('token',res.data.token);
        if(res.data.token){
            window.location = '/dashborad'
        }else{
            window.location = '/'      
        }
      })
    }



    function handle(e){
       const newdata={...data}
       newdata[e.target.id] = e.target.value
       setdata(newdata)
       console.log(newdata)
    }



    return (
        <div>
            <div className='main_div2'>
                <div className="main2">
                    <div className="box2">
                        <h3>Login To Your Account</h3>
                        <form method="" action="" onSubmit={ (e)=> submit(e)}>
                            <input type="text" placeholder='Email'
                             onChange={ (e)=>handle(e)} id="email" value={data.email}  
                            />
                            <input type="password" placeholder='password'
                              onChange={ (e)=>handle(e)} id="password" value={data.password}   />
                            <div className='checkbox'>
                                <input type="checkbox" className='chk' style={{ height: "15px", width: "30px" }}></input><p>Agree with Terms & condition</p>
                            </div>
                            <button type='submit' className="btn btn-dark"> Login</button>
                        </form>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Loginuse
