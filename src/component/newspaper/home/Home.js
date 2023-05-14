import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import addicon from '../../../image/Add_round_fill.png'
import { NavLink } from 'react-router-dom';


const Home = () => {

    const categoryList = [
      {
        id:1,
        title:"Top Stories"
      },
      {
        id:2,
        title:"US"
      },
      {
        id:3,
        title:"World"
      },
      {
        id:4,
        title:"Business"
      },
      {
        id:5,
        title:"Politics"
      },
    ]




  return (
    <>
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
             News Categories
        </div>
    
      </div>
      <div className='comon-layout category-list'>
      <div className='container'>
           <ul>
            {categoryList.map((item,index)=>{
              return (
                <li key={index}>
                <label>{item.title} <i className="fa-solid fa-arrow-right-long"></i></label>
                <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu>
                                  <button>Edit</button>
                                  <button>Delete</button>
                                  <button>Mark as Active</button>
                              </Dropdown.Menu>
                        </Dropdown>
            </li>
              )
            })}
           
           </ul>

            <div className='addIcon'>
              <NavLink to="">
                <img src ={addicon}   alt="addicon" />
              </NavLink>
            </div>


        </div>
       

    </div>
    </>
  )
}

export default Home