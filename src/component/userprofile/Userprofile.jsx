import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import Insert from "../form/Insert"
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PersonIcon from '@mui/icons-material/Person';

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

const Userprofile = () => {

  const [search, setSearch] = useState("");
  const [c_data, setc_data] = useState([]);
  const [filterdata, setfilter] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [studid,setsdtudid]=useState("");
  const [data, setData] = useState({
    id:"",
    name: "",
    fatherName:"",
    motherName: "",
    F_occupation: "",
    M_occupation: "",
    phone: "",
    address: "",
    city: "",
    gender: "male",
    Rollno:"",
    Class:""

});

const [openupdate, setOpenupdate] = React.useState(false);
const handleClickOpenupdate = async (id) => {
  setOpenupdate(true);
  const data = await axios.get(`http://192.168.1.40:8070/stud/view/${id}`).then((res) => {
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
  // const newdata = { ...data }
  // newdata[e.target.name] = e.target.value
  // setData(newdata)
  // console.log(newdata)
  const {name,value} = e.target
  setData({...data,[name]:value})
}
useEffect(() => {
  
}, [data]);
function updateuser(e){
console.log(data);
e.preventDefault();
// console.log("----------");
    fetch(`http://192.168.1.40:8070/stud/view/edit/${studid}`,{
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
// -----------------------view-----------------
  const handleClickOpen = async (id) => {
    setOpen(true);
    const data = await axios.get(`http://192.168.1.40:8070/stud/view/${id}`).then((res) => {
      console.log(res.data.data)
      setData(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  };
  const handleClose = () => {
    setOpen(false);
  
  };
 
  //data table------------------------------------------- 
  const getdata = async () => {
    try {
      const res = await axios.get("http://192.168.1.40:8070/stud/view");
      console.log(res.data)
      setc_data(res.data);
      setfilter(res.data);
    }
    catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "FullName",
      selector: (row) => row.FullName,
      sort: true

    },
    {
      name: "fatherName ",
      selector: (row) => row.fatherName
    },
    {
      name: "email",
      selector: (row) => row.email
    },
    {
      name: "phone ",
      selector: (row) => row.phone
    },
    {
      name: "address",
      selector: (row) => row.address
    },
    {
      name: "gender",
      selector: (row) => row.gender
    },
    {
      name: "Class",
      selector: (row) => row.Class
    },
    {
      name: "Rollno",
      selector: (row) => row.Rollno
    },
    {
      name: "action",
      cell: (row) => <>
        <VisibilityIcon onClick={() => handleClickOpen(row._id)} className="text-success" />
        <EditIcon onClick={()=>handleClickOpenupdate(row._id)} className="text-primary"></EditIcon>
        <DeleteIcon onClick={() => deletestudent(row._id)} className="text-danger">delete</DeleteIcon>

      </>
    }

  ]
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    const result = c_data.filter(val => {
      console.log("filert")

      return val.email.toLowerCase().match(search.toLowerCase());

    });

    setfilter(result);
  }, [search]);
  // delete----------------------------------------
  function deletestudent(_id) {
    fetch(`http://192.168.1.40:8070/stud/view/delete/${_id}`, {
      method: "DELETE"
    }).then((r) => {
      r.json().then((resp) => {
        console.log(resp);
        getdata();
      })
    })
  }
  // ------------------------------------------------------
  return (
    <>
      <div className='page'>

        <h1 className=' text-center'>student Data</h1>

        {
          show ? <Insert /> : ""
        }
        <button onClick={() => setShow(!show)} className="insert"> {show ? "X" : "create student"}</button>
        {
          show ? "" : <DataTable
            title="Student list"
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
      </div>


      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <div className="d-flex">
            <PersonIcon style={{ "width": "100%", "height": "100px" }} />
          </div>
          <div className='d-flex view_staff'>
            <h6 >ID:</h6><p>{data.id}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6 >Name:</h6><p>{data.FullName}</p>
          </div>

          <div className='d-flex view_staff'>
            <h6>fatherName:</h6><p>{data.fatherName}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>motherName:</h6><p>{data.motherName}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>email:</h6><p>{data.email}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>phone:</h6><p>{data.phone}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>F_occupation:</h6><p>{data.F_occupation}</p>
          </div>

          <div className='d-flex view_staff'>
            <h6>address:</h6><p>{data.address}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>city:</h6><p>{data.city}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>gender:</h6><p>{data.gender}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Class:</h6><p>{data.Class}</p>
          </div>
        </Box>
      </Modal>



      <Modal
        keepMounted
        open={openupdate}
        onClose={handleCloseupdate}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
           <form method="" action="" className='updateform'>
          <label  >Full Name </label>
          <input type="text"  name="name"  value={data.Name} onChange={(e) => handel(e)}></input>
          <label >Father Name </label>
          <input type="text" name="fatherName" value={data.fatherName} onChange={(e) => handel(e)}></input>
          <label >Mother Name </label>
          <input type="text" name="motherName" value={data.motherName} onChange={(e) => handel(e)}></input>
          <label >F_occupation </label>
          <input type="text" name="F_occupation" value={data.F_occupation} onChange={(e) => handel(e)}></input>
          <label >M_occupation</label>
          <input type="text" name="M_occupation" value={data.M_occupation} onChange={(e) => handel(e)}></input>
          <label >Phone</label>
          <input type="text"  name="phone" value={data.phone} onChange={(e) => handel(e)}></input>
          <label >Address</label>
          <input type="text"  name="address" value={data.address} onChange={(e) => handel(e)}></input>
          <label >City</label>
          <input type="text"  name="city" value={data.city} onChange={(e) => handel(e)}></input>
          <label >RollNo</label>
          <input type="text"  name="Rollno" value={data.Rollno} onChange={(e) => handel(e)}></input>
          <label >Class</label>
          <input type="text"  name="Class" value={data.Class} onChange={(e) => handel(e)}></input>  
        <input type='submit' value="SAVE" className='btn-info mt-2' onClick={(e)=>updateuser(e)}></input>
         </form>
        </Box>
      </Modal>
    </>
  )
}

export default Userprofile
