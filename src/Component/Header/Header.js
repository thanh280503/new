
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.scss'
import * as actions from '../../store/actions'
import { connect } from "react-redux"
import { toast } from 'react-toastify'
import { logoutUserService } from '../../services/UserService'


const Header = (props) => {
    const navigation = useNavigate()

    const handleOnClickLogout = async () => {
        await logoutUserService()
        props.resetUser()
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        toast.success("Đăng xuất thành công!")
        navigation("/")
    }

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
                        {props.detailUser && props?.detailUser?.idUser
                            ?
                            <div className='user'>
                                {
                                    props.detailUser?.avatar
                                    ?
                                    <img src={props.detailUser?.avatar} alt='avatar'/>
                                    :
                                    <i className="fa-solid fa-user"></i>
                                }
                                <span>{props.detailUser?.name}</span>
                                <div className='drop'>
                                    <NavLink to={'/profile'} style={{color: 'black', textDecoration: 'none'}}>
                                        <span>Chỉnh sửa thông tin</span>
                                    </NavLink>
                                    <span onClick={handleOnClickLogout}>Đăng xuất</span>
                                </div>
                            </div>
                            :
                            <div className='information'>
                            <NavLink to="/login">
                                <span className='log-in'>Đăng nhập</span>
                            </NavLink>
                            <NavLink to="/register">
                                <span className='register'>Đăng Ký</span>
                            </NavLink>
                        </div>
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        detailUser: state.users
    }
}

function mapDispatchToProps (dispatch) {
    return {
        resetUser: () => dispatch(actions.resetUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)