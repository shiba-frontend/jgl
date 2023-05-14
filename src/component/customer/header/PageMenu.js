import React from 'react'
import { NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

const PageMenu = () => {
  return (
    <div className='pageMenu'>
        <ul>
            <li>
                <NavLink to="/">International</NavLink>
            </li>
            <li>
                <NavLink to="/">National</NavLink>
            </li>
            <li>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    More
                </Dropdown.Toggle>

                <Dropdown.Menu>
                   <ul>
                    <li>
                        <NavLink to="">More 1</NavLink>
                    </li>
                    <li>
                        <NavLink to="">More 2</NavLink>
                    </li>
                    <li>
                        <NavLink to="">More 3</NavLink>
                    </li>
                   </ul>
                </Dropdown.Menu>
                </Dropdown>
            </li>
        </ul>
    </div>
  )
}

export default PageMenu