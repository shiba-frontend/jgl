import React, { useEffect,useState } from 'react'
import { NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { toast } from 'react-toastify';


const PageMenu = ({response}) => {
   
    console.log(response)

  return (
    <div className='pageMenu'>
        <ul>
            
            <li>
                <NavLink to={`/home-article/${response&&response[0]?.category_id
}`}>{response&&response[0].category_name}</NavLink>
            </li>
            <li>
                <NavLink to="/">{response&&response[1]?.category_name}</NavLink>
            </li>
            <li>
                <NavLink to="/">{response&&response[2]?.category_name}</NavLink>
            </li>
            <li>
                <NavLink to="/">{response&&response[3]?.category_name}</NavLink>
            </li>
            <li>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    More
                </Dropdown.Toggle>

                <Dropdown.Menu>
                   <ul>
                    {response&&response.slice(4).map((cat,i)=>{
                        return (
                            <li key={i}>
                            <NavLink to="">{cat?.category_name}</NavLink>
                        </li>
                        )
                       
                    })}
                    
                   
                   </ul>
                </Dropdown.Menu>
                </Dropdown>
            </li>
        </ul>
    </div>
  )
}

export default PageMenu