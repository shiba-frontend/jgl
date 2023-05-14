import React from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import addicon from '../../../image/Add_round_fill.png'
import dealIcon from "../../../image/headingicon/Paper_fill.svg";
import { NavLink } from 'react-router-dom';

const PoliticalNewsArticle = () => {


    const categoryList = [
        {
          id:1,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:2,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:3,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:4,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:5,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
      ]

  return (
    <>
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={dealIcon}/> Political News Articles
        </div>
    
      </div>
      <div className='comon-layout category-list'>
      <div className='container'>
           <ul>
            {categoryList.map((item,index)=>{
              return (
                <li key={index}>
                <p>{item.title}</p>
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
              <NavLink to="/add-articles">
                <img src ={addicon}   alt="addicon" />
              </NavLink>
            </div>


        </div>
       

    </div>
    </>
  )
}

export default PoliticalNewsArticle