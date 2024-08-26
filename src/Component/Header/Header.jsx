import React from 'react'
import './Header.scss'
const Header = () => {
    return (
        <div className="header-homepage-container">
            <div className='container'>
                <div className='content-home-header'>
                    <NavLink to={'/'} style={{color: 'black', textDecoration: 'none'}}>
                        <div className='left'>
                            <i className="fa-solid fa-car-side"></i>
                            <span>Vexe</span>
                        </div>
                    </NavLink>
                    <div className='center'>
                        <ul>
                            <li>Đặt vé xe</li>
                            <li>
                                <NavLink to={'/rental-car'} style={{color: 'black', textDecoration: 'none'}}>
                                    Thuê xe
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/book-ticket'} style={{color: 'black', textDecoration: 'none'}}>
                                    Lịch sử đặt vé
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='right'>
                        <span className='language'>Tiếng việt</span>
                        <div className='hotline'>
                            <i className="fa-solid fa-phone"></i>
                            <span>Hotline</span>
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
        </div>
    )
}

export default Header
