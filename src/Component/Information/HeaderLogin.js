import React from 'react'
import './Login.scss'
import { NavLink } from 'react-router-dom'

const HeaderLogin = () => {
  return (
    <div className='header'>
        <div className='container'>
           <div className='content-login'>
            <div className='left'>
                    <i className="fa-solid fa-car-side"></i>
                    <span>Vexe</span>
                </div>
                <div className='information'>
                    <NavLink to="/login">
                        <span className='log-in'>Đăng nhập</span>
                    </NavLink>
                    <NavLink to="/register">
                        <span className='register'>Đăng Ký</span>
                    </NavLink>
                </div>
           </div>
        </div>
    </div>
  )
}

export default HeaderLogin