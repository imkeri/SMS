import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Insert_attandance from '../form/Insert_attandance';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import Insert_fees from '../form/Insert_fees';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};




const Attandance = () => {
  const [search, setSearch] = useState("");
  const [c_data, setc_data] = useState([]);
  const [filterdata, setfilter] = useState([]);
  const [show,setshow] = useState(false);
  const [open, setOpen] = React.useState(false);
const [studid,setsdtudid]=useState("");
  const [data, setData] = useState([{
    SID:"",
    Rollno:"",
    Class:"",
    Attendance:[{
        date:"",
        presant:""

    }]
  

}]);
const [date,setdate] = useState("")
const [presant,setpresant] = useState("")
// view----------------------------
  const handleClickOpen = async (id) => {
    setOpen(true);
    const data = await axios.get(`http://192.168.1.40:8070/attendance/viewById/${id}`).then((res) => {
      console.log(res.data.data)
     
      setData(res.data.data)
      setdate(res.data.data.Attendance[0].date)
      setpresant(res.data.data.Attendance[0].presant)
    }).catch((err) => {
      console.log(err);
    })
  };
  const handleClose = () => {
    setOpen(false);
  
  };

  //   -------------------update
const [openupdate, setOpenupdate] = React.useState(false);
const handleClickOpenupdate = async (id) => {
  setOpenupdate(true);
  const data = await axios.get(`http://192.168.1.40:8070/attendance/viewById/${id}`).then((res) => {
    console.log(res.data.data)
    setData(res.data.data)
    setsdtudid(res.data.data._id)
    setdate(res.data.data.Attendance[0].date)
    setpresant(res.data.data.Attendance[0].presant)
  }).catch((err) => {
    console.log(err);
  })
};

const handleCloseupdate = () => {
  setOpenupdate(false);

};
function handel(e) {
  
  const {name,value} = e.target
  setData({...data,[name]:value})
}
useEffect(() => {
  
}, [data]);
function updateuser(e){
console.log(data);
e.preventDefault();
// console.log("----------");
    fetch(`http://192.168.1.40:8070/attendance/edit/${studid}`,{
    method:"PUT",
    headers:{
        'Accept':'application/json',
        'Content-type':"application/json"
    },
    body:JSON.stringify(data)
}).then((rst)=>{
    rst.json().then((resp)=>{
      getdata();
    })
})
}
  


  // -----------------------------datatable
  const getdata = async () => {
    try {
      const res = await axios.get("http://192.168.1.40:8070/attendance/view");
     
      setc_data(res.data.data);
      setfilter(res.data.data);
  
      
    }
    catch (error) {
      console.log(error);
    }
  };
const columns =[
  {
    name : "SID",
    selector : (row) => row.SID,

  },
  {
    name : "Rollno",
    selector : (row) => row.Rollno,

  },
  {
    name : "Class",
    selector : (row) => row.Class,

  },
  {
    name : "date",
    selector : (row) => (row.Attendance[0].date),

  },
  {
    name : "presant",
    selector : (row) => (row.Attendance[0].presant),

  },
  {
    name:"action",
    cell:(row) => <>
    
    
        <EditIcon onClick={()=> handleClickOpenupdate(row._id)} className="text-primary" ></EditIcon>
        <VisibilityIcon onClick={() => handleClickOpen(row._id)} className="text-info"/>
    </>
  
  }
]
useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  const result = c_data.filter(val => {
    return val.Attendance[0].date.toLowerCase().match(search.toLowerCase());

  });

  setfilter(result);
}, [search]);
// --------------------------------------------
  return (
    <>
     <h1 className=' text-center'>Attandance Data</h1>
        
        {
          show ?  <Insert_attandance /> : ""
        }
         <button onClick={()=>setshow(!show)} className="insert"> { show ? "X":"attendance"}</button>
       {
          show ? "": <DataTable
          title="Attandance"
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
             <h6 >SID:</h6><p>{data.SID}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Rollno:</h6><p>{data.Rollno}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Class:</h6><p>{data.Class}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Date:</h6><p>{date}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>presant:</h6><p>{presant}</p>
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
          <label >Rollno</label>
          <input type="text" name="Rollno" value={data.Rollno} onChange={(e) => handel(e)}></input>
          <label >Class</label>
          <input type="text" name="Class" value={data.Class} onChange={(e) => handel(e)}></input>
          <label >presant </label>
           <input type="text" name="presant" defaultValue={presant} onChange={(e) => handel(e)}></input>
        <input type='submit' value="SAVE" className='btn-info mt-2' onClick={(e)=>updateuser(e)}></input>
         </form>
        </Box>
      </Modal>
    </>
  )
}

export default Attandance
