import React,{useState} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import PageMenu from '../header/PageMenu'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import story from "../../../image/maxresdefault.jpg";
import adv from "../../../image/advertise.png";
import cart from "../../../image/cart-icon.png";
import BottomTabCustomer from '../header/BottomTabCustomer';

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  var total_length = "3";


  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    afterChange: function(index) {
      var indexed = index + 1
      if(indexed == total_length){
        setTimeout(()=>{
          dispatch({ type: "setid", newsdetailsId: "3" })
          navigate("/news-details/2", { replace: true });
        },1000)
      }
  
    }
  };


  const slider = [
    {
      id:1,
      image:adv
    },
    {
      id:2,
      image:adv
    },
    {
      id:3,
      image:adv
    },
  ]

  const categoryL = [
    {
      id:1,
      image:story,
      title:"  The standard Lorem Ipsum passage, used since the 1500s",
      description:"Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,  making it over 2000 years old."
    },
    {
      id:2,
      image:story,
      title:"  The standard Lorem Ipsum passage, used since the 1500s",
      description:"Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,  making it over 2000 years old."
    },
    {
      id:3,
      image:story,
      title:"  The standard Lorem Ipsum passage, used since the 1500s",
      description:"Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,  making it over 2000 years old."
    }
  ]


  return (
    <div className='customer-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar
      />
      <div className='header-info'>
        <div className='container'>
          Top Stories
        </div>
    
      </div>
      </div>
      <div className='comon-layout'>
      <div className='container'>
      <PageMenu/>

        <div className='top-stories'>
            <h1>Top Stories For The Day:</h1>
            <div className='row'>
              {categoryL.map((item,index)=>{
                return (
                  <div className='col-lg-4 col-12'>
                      <div className='story-list'>
                        <div className='story-list-img'>
                            <img src={item.image}/>
                          </div>
                          <div className='story-list-info'>
                            <Button  onClick={handleShow}>
                              {item.title}
                            </Button>
                            <p>{item.description}</p>
                          </div>
                      </div>
                    </div>
                )
              })}
              
            
            </div>
         
        </div>


        </div>
       

    </div>
    <BottomTabCustomer/>

    <Modal show={show} onHide={handleClose} centered animation={true} className='advertisement-slider'>
        
        <Modal.Body >
      
            <Slider {...settings}>
              {slider.map((item, index)=>{
                var Total = slider.length
                return (
                  <div className='adimage' key={index}>
                    <img src={item.image}/>
                    <h5>Advertisement {index + 1} of {Total}</h5>
                    <NavLink to="/cart" className="advCart">
                        <img src={cart}/>
                    </NavLink>
                </div>
                )
              })}
              
             
            </Slider>


        </Modal.Body>
       
      </Modal>
    </div>
    
  )
}

export default Home