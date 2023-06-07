import React,{useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../image/logo.png";
import menu from "../../../image/hamberger-menu.png";
import location from "../../../image/location-outline.png";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';

const AfterLoginTopbar = (props) => {
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  let navigate = useNavigate();
  const handleClose = () => setShow(false);
  const token = localStorage.getItem('accessToken');

  const LogoutHandling = async ()=>{
    setloading(true)

    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token
  }
  await axios.post("/sign-out", JSON.stringify(body))
  .then((response) => {
    setloading(false)
  if(response.data.success){
    toast.success(response.data.message);
    dispatch({ type: "setToken", accessToken: null })
    localStorage.clear();
    setTimeout(()=>{
      navigate("/", { replace: true });
    },2000)
  }
})
.catch((error) => {
  setloading(false)
    if(error.response.status === 404){
        toast.error(error.response.data.message);
    }
});
  }

  
  return (
    <>
    
        <div className='login-after-top'>
      <div className='container'>
          <div className='row align-items-center'>
              <div className='col-4 col-lg-4'>
              <div className='login-after-top-left'>
                  <NavLink to="/home"> <img src={logo}/></NavLink>
                </div>
              </div>
              <div className='col-8 col-lg-8'>
              <div className='login-after-top-right'>
                
          <span>  <img src={location}/> Bowie, MD, USA</span>
        <button
        onClick={() =>
          dispatch({ type: "set", sidebarShow: !sidebarShow })
        }
      >
    <img src={menu}/>
</button>
        </div>
              </div>
          </div>
     
        
      </div>
      <button className='logoutBtn' onClick={()=>setShow(true)}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
      </button>

      

    </div>
    <Modal show={show} onHide={handleClose} centered size="sm" className='AlertMsg'>
    <Modal.Header>
      <Modal.Title><i class="fa-solid fa-triangle-exclamation"></i> Alert !</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Are You sure log out ?</h4>
      <ul>
      <li>
        <button onClick={handleClose} className='btn btn-md btn-danger'>
            No
        </button>
     
      </li>
      <li>
      <button onClick={LogoutHandling} className='btn btn-md btn-success'>
            Yes
        </button>
    
      </li>
    </ul>

    </Modal.Body>
  
   
  </Modal>
    </>
  )
}

export default AfterLoginTopbar