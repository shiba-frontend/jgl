import React, { useState } from 'react';
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import adv from "../../../image/slider.png";
import { NavLink } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BottomTabCustomer from '../header/BottomTabCustomer';

const BusinessDetails = () => {
  const [key, setKey] = useState('home');

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
        {
            id:4,
            image:adv
          },
      ]


      var settings = {
        dots: false,
        className: "center",
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        centerPadding:"60px",
        autoplay:true
      };




  return (
    <div className='customer-layout'>
    <AfterLoginTopbar
      />
      <div className='header-info'>
        <div className='container'>
          Business Name
        </div>
    
      </div>
      <div className='comon-layout'>
      <div className='container'>
        <div className='row'>
            <div className='col-lg-5 col-12'>
            <div className='details-slider'>
                <Slider {...settings}>
                {slider.map((item, index)=>{
                    return (
                    <div className='slider-image' key={index}>
                        <img src={item.image}/>
                    
                    </div>
                    )
                })}
                
                
                </Slider>
            </div>
            </div>
            <div className='col-lg-7 col-12'>
                  <div className='product-info'>
                      <table>
                        <tr>
                          <td>
                             <label>Company</label>
                          </td>
                          <td>
                              <span>Taco Bell</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                             <label><i className="fa-solid fa-location-dot"></i> Address 1:</label>
                          </td>
                          <td>
                              <h5>13360, LAUREL BOWIE  ROAD, LAUREL, MD, USA</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                             <label><i className="fa-solid fa-phone"></i> Phone:</label>
                          </td>
                          <td>
                              <a href='tel:(410) 792-9225'>(410) 792-9225</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                             <label><i className="fa-solid fa-clock"></i> Opening Hours:</label>
                          </td>
                          <td>
                              <ul>
                                <li>Monday: 10:00 AM -12:00 PM</li>
                                <li>Tuesday: 10:00 AM -12:00 PM</li>
                                <li>wed: 10:00 AM -12:00 PM</li>
                                <li>Thursday: 10:00 AM -12:00 PM</li>
                                <li>friday: 10:00 AM -12:00 PM</li>
                                <li>saturday: 10:00 AM -12:00 PM</li>
                                <li>sunday: 10:00 AM -12:00 PM</li>
                              </ul>
                          </td>
                        </tr>
                      </table>
                      <ul className='s-btn'>
                        <li>
                          <button className='themeBtn'>Submit A Review</button>
                        </li>
                        <li>
                            <NavLink to="/check-out" className="themeBtnOutline">Check In</NavLink>
                        </li>
                      </ul>
                  </div>
            </div>
        </div>

        <div className='product-tabs mt-4'>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="More Deals">
      dnij
      </Tab>
      <Tab eventKey="profile" title="Video Reviews (0)">
   dds
      </Tab>
      <Tab eventKey="contact" title="Reviews (1)">
    SD
      </Tab>
    </Tabs>
          </div> 

     


        </div>
       

    </div>
    <BottomTabCustomer/>
    </div>
  )
}

export default BusinessDetails