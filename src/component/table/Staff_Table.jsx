import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Insert_Staff from '../form/Insert_Staff'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import "./Staff.css"
// import { Link,Outlet } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};


const Staff_Table = () => {
  const [search, setSearch] = useState("");
  const [c_data, setc_data] = useState([]);
  const [filterdata, setfilter] = useState([]);
  const [show,setshow] = useState(false);
  const [staffid,setstaffid]=useState("");
  const [staffData,setStaffData] = useState({
    
    Name: "",
    Email:"",
    Degree: "",
    Subject: "",
    Salary: "",
    Fresher: "",
    Experience: "",
  
   
  });

// view-------------------------------
const [open, setOpen] = useState(false);
  const handleOpen =async (id)=>{
     setOpen(true);
    try{
    const res = await axios.get(`http://192.168.1.40:8070/staff/viewById/${id}`);
    console.log(res.data.data)
    setStaffData(res.data.data)
    }catch(error)
    {
      console.log(error);
    }
  } 
  const handleClose = () => setOpen(false);

// -----------------------update-----------------------------------

const [openupdate, setOpenupdate] = React.useState(false);
const handleOpenUpdate = async (id) => {
  setOpenupdate(true);
  const data = await axios.get(`http://192.168.1.40:8070/staff/viewById/${id}`).then((res) => {
    console.log(res.data.data)
    setStaffData(res.data.data)
    setstaffid(res.data.data._id)
  }).catch((err) => {
    console.log(err);
  })
};

const handleCloseupdate = () => {
  setOpenupdate(false);

};
function handel(e) {
  const newdata = { ...staffData }
  newdata[e.target.name] = e.target.value
  setStaffData(newdata)
  console.log(newdata)
}
useEffect(() => {
  
}, [staffData]);
function updateuser(e){
e.preventDefault();
// console.log("----------");
    fetch(`http://192.168.1.40:8070/staff/edit/${staffid}`,{
    method:"PUT",
    headers:{
        'Accept':'application/json',
        'Content-type':"application/json"
    },
    body:JSON.stringify(staffData)
}).then((rst)=>{
    rst.json().then((resp)=>{
      getdata();
    })
})
}

  // -----------------------------datatable
  const getdata = async () => {
    try {
      const res = await axios.get("http://192.168.1.40:8070/staff/view?page=2&size=3");
      // console.log(res.data.data[0].Name)
      setc_data(res.data.data);
      setfilter(res.data.data);
    
      
    }
    catch (error) {
      console.log(error);
    }
  };
const columns =[
  {
    name : "Name",
    selector : (row) => row.Name,
    sort:true
  },
  {
    name : "Email",
    selector : (row) => row.Email
  },
  {
    name : "Degree",
    selector : (row) => row.Degree
  },
  {
    name : "Subject",
    selector : (row) => row.Subject
  },
  {
    name : "Salary",
    selector : (row) => row.Salary
  },
  {
    name : "Fresher",
    selector : (row) => row.Fresher
  },
 {
  name:"action",
  cell:(row) => <>
  
  
      <EditIcon onClick={()=>handleOpenUpdate(row._id)}></EditIcon>
      <VisibilityIcon  onClick={() => handleOpen(row._id)} ></VisibilityIcon>
     <DeleteIcon onClick={()=>deletestaff(row._id)}></DeleteIcon>
  </>

}
]
useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  const result = c_data.filter(val => {
    return val.Name.toLowerCase().match(search.toLowerCase());

  });

  setfilter(result);
}, [search]);






// delete--------------------------
function deletestaff(_id){
  fetch(`http://192.168.1.40:8070/staff/delete/${_id}`,{
    method:"DELETE"
  }).then((r)=>{
    r.json().then((resp)=>{
      console.log(resp); 
      getdata();
    })
  })
}

// --------------------------------------------
  return (
    <>
     <h1 className=' text-center'>Staff Data</h1>
        
        {
          show ?  <Insert_Staff /> : ""
        }
         <button onClick={()=>setshow(!show)} className="insert"> { show ? "X":"create Staff"}</button>
       {
          show ? "": <DataTable
          title="Staff list"
          columns={columns}
          data={filterdata}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='550px'
          highlightOnHover
          subHeader
          subHeaderAlign="left"
          subHeaderComponent={
            <input
              type="text"
              placeholder='search'
              className='w-25 form-control'
              value={search}
              onChange={(event) => setSearch(event.target.value)} />
          }
        />
       }
    

      {/* modal box */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
        <div className="d-flex">
             <PersonIcon style={{"width":"100%", "height":"100px"}} />
        </div>
          <div className='d-flex view_staff'>
             <h6 >Name:</h6><p>{staffData.Name}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Email:</h6><p>{staffData.Email}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Degree:</h6><p>{staffData.Degree}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Salary:</h6><p>{staffData.Salary}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Subject:</h6><p>{staffData.Subject}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Fresher:</h6><p>{staffData.Fresher}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Experience:</h6><p>{staffData.Experience}</p>
          </div>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openupdate}
        onClose={handleCloseupdate}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
        <form method="" action="" className='updateform'>
        <label>Name<span>*</span></label>
          <input type="text"  name="Name"  value={staffData.Name} onChange={(e) => handel(e)}></input>
          <label >Email</label>
          <input type="text" name="Degree" value={staffData.Degree} onChange={(e) => handel(e)}></input>
          <label >Subject </label>
          <input type="text" name="Subject" value={staffData.Subject} onChange={(e) => handel(e)}></input>
          <label >Salary</label>
          <input type="text" name="Salary" value={staffData.Salary} onChange={(e) => handel(e)}></input>
          <label>Are you Fresher ?
          </label>
                  <select name="Fresher">
                      <option value={staffData.Fresher} onChange={(e) => handel(e)}>0</option>
                      <option value={staffData.Fresher} onChange={(e) => handel(e)}>1</option>
                  </select>
          <label >Experience</label>
          <input type="text"  name="Experience" value={staffData.Experience} onChange={(e) => handel(e)}></input> 
        <input type='submit' value="SAVE" className='btn-info mt-2' onClick={(e)=>updateuser(e)}></input>
         </form>
        </Box>
      </Modal>




    </>
  
  
  )
}

export default Staff_Table
