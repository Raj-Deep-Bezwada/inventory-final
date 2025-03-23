import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Header.css'
import UserLoginContext from '../../../contexts/UserLoginContext';
import { useContext } from 'react';

function Header() {
  let { logoutUser, userLoginStatus } = useContext(UserLoginContext);
  return  (
    <div>
      <div className='d-flex flex-wrap justify-content-around p-1 main'>
        <div className="productHeader">
          <img src="https://img.freepik.com/premium-vector/inventory-icon-set-storage-product-box-vector-symbol-distribution-inventory-control-sign-black-filled-outlined-style_268104-9477.jpg" alt="" className = "logoheader"/>
          <h3 className='companyname text-white'>Inventory</h3>
        </div>
        <ul className='nav justify-content-end fs-4 navMain'>
          <li className='nav-item'>
            <Link to='' className='nav-link text-white'>
              Home 
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='register' className='nav-link text-white'>
              register 
            </Link>
          </li>
          {userLoginStatus === false ? (
            <li className="nav-item">
              <Link to="login" className="nav-link text-white" >
                Login
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="login" className="nav-link text-white" onClick={logoutUser}>
                Logout
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <Link to='aboutus' className='nav-link text-white'>
              about us 
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
