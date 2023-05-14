import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import addicon from '../../../image/Add_round_fill.png'
import dealIcon from "../../../image/headingicon/Paper_fill.svg";
import { NavLink } from 'react-router-dom';

const NewsAnalyticsList = () => {


  const categoryList = [
    {
      id:1,
      title:"Top Stories",
      business:"5",
      times:"1"
    },
    {
      id:2,
      title:"US",
      business:"2",
      times:"0"
    },
    {
      id:3,
      title:"World",
      business:"3",
      times:"1"
    },
    {
      id:4,
      title:"Business",
      business:"1",
      times:"1"
    },
    {
      id:5,
      title:"Politics",
      business:"5",
      times:"1"
    },
  ]




  return (
    <>
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={dealIcon}/> News Analytics
        </div>
    
      </div>
      <div className='comon-layout category-list'>
      <div className='container'>
           <ul>
            {categoryList.map((item,index)=>{
              return (
                <li key={index}>
                  <div className='cl-left'>
                    <label>{item.title} <i className="fa-solid fa-arrow-right-long"></i></label>
                    <span>({item.business}) Business Advertised</span>
                    <span>({item.times}) Times Advertised</span>
                </div>
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
              <NavLink to="/add-category">
                <img src ={addicon}   alt="addicon" />
              </NavLink>
            </div>


        </div>
       

    </div>
    </>
  )
}

export default NewsAnalyticsList