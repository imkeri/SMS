import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import Insert_fees from '../form/Insert_fees';
// import "./Staff.css"



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


const Feeslist = () => {
  const [search, setSearch] = useState("");
  const [c_data, setc_data] = useState([]);
  const [filterdata, setfilter] = useState([]);
  const [show,setshow] = useState(false);
  const [open, setOpen] = React.useState(false);
const [studid,setsdtudid]=useState("");
  const [data, setData] = useState({
    SID:"",
    Fees: "",
    AdminName:"",
    Date: "",
    Installment:""
  

});
// ---------------------view
const handleClickOpen = async (id) => {
    setOpen(true);
    const data = await axios.get(`http://192.168.1.40:8070/fees/viewById/${id}`).then((res) => {
      console.log(res.data.data)
      setData(res.data.data)
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
  const data = await axios.get(`http://192.168.1.40:8070/fees/viewById/${id}`).then((res) => {
    console.log(res.data.data)
    setData(res.data.data)
    setsdtudid(res.data.data._id)
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
    fetch(`http://192.168.1.40:8070/fees/edit/${studid}`,{
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
      const res = await axios.get("http://192.168.1.40:8070/fees/viewAll");
    
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
    name : "Fees",
    selector : (row) => row.Fees
  },
  {
    name : "AdminName",
    selector : (row) => row.AdminName
  },
  {
    name : "Date",
    selector : (row) => row.Date
  },
  {
    name : "Installment",
    selector : (row) => row.Installment
  },
 {
  name:"action",
  cell:(row) => <>
  
  
      <EditIcon onClick={()=> handleClickOpenupdate(row._id)} ></EditIcon>
      <VisibilityIcon onClick={() => handleClickOpen(row._id)} />
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







// --------------------------------------------
  return (
    <>
     <h1 className=' text-center'>fees Data</h1>
        
        {
          show ?  <Insert_fees /> : ""
        }
         <button onClick={()=>setshow(!show)} className="insert"> { show ? "X":"fees"}</button>
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
            <h6>Fees:</h6><p>{data.Fees}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Date:</h6><p>{data.Date}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Installment:</h6><p>{data.Installment}</p>
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
          <label >Fees</label>
          <input type="text" name="Fees" value={data.Fees} onChange={(e) => handel(e)}></input>
          <label >AdminName</label>
          <input type="text" name="AdminName" value={data.AdminName} onChange={(e) => handel(e)}></input>
          <label >Date</label>
          <input type="text" name="Salary" value={data.Date} onChange={(e) => handel(e)}></input>
          <label >Installment </label>
          <input type="text" name="Installment" value={data.Installment} onChange={(e) => handel(e)}></input>
        <input type='submit' value="SAVE" className='btn-info mt-2' onClick={(e)=>updateuser(e)}></input>
         </form>
        </Box>
      </Modal>

    </>
  
  
  )
}

export default Feeslist
