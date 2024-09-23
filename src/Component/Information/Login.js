import React from 'react'
import './Login.scss'
import HeaderLogin from './HeaderLogin'
import AdminFooter from '../AdminFooter/AdminFooter'
import { useState } from 'react'
import { loginUserService } from '../../service/UserService'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify'
import * as actions from '../../store/actions'
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handleLoginUser = async () => {
        const {email, password} = user
        if(!email || !password) {
            toast.error("Vui lòng nhập đầy đủ thông tin!")
            return
        }

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if(!isCheckEmail) {
            toast.error("Email của bạn không đúng định dạng!")
            return
        }

        let loginUser = {
            email: email,
            password: password
        }

        let res = await loginUserService(loginUser)
        if(res && res.status === "OK") {
            toast.success("Đăng nhập thành công!")
            setUser({})
            localStorage.setItem("access_token", JSON.stringify(res?.access_token))
            localStorage.setItem("refresh_token", JSON.stringify(res?.refresh_token))
            if(res?.access_token) {
                const decoded = jwt_decode(res.access_token)
                if(decoded.id) {
                    await props.getDetailUser(decoded.id, res.access_token)
                }
            }

            if(props.detailUser.isAdmin) {
                navigate("/admin")
            }else {
                navigate("/")
            }
        }else {
            toast.error("Email và mật khẩu không trùng khớp!")
        }
    }

    const handleLoginWithFaceBook = () => {
        window.open("http://localhost:3001/api/auth/facebook", "_self")
    }

    const handleLoginWithGoogle = () => {
        window.open("http://localhost:3001/api/auth/google", "_self")
    }

    const handleForgetPassword = () => {
        navigate('/send-code-email')
    }

    return (
        <div>
            <HeaderLogin />
            <div className='login-content'> 
                <div className='container'>
                    <div className='wrapper'>
                            <i className="icon fas fa-walking"></i>
                            <div className='form '>
                                <h4>Đăng nhập</h4>
                                <div className='item'>
                                    <label>Email</label>
                                    <input type='text' placeholder='...'
                                        value={user?.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                    />
                                </div>
                                <div className='item password'>
                                    {showPassword 
                                        ?
                                        <>
                                            <label>Mật khẩu</label>
                                            <input type={showPassword ? 'text' : 'password'} placeholder='...'
                                                value={user?.password}
                                                onChange={(e) => setUser({...user, password: e.target.value})}
                                            />
                                            <i className="fa-solid fa-eye"
                                                onClick={() => setShowPassword(false)}
                                            ></i>
                                            
                                        </>
                                        :
                                        <>
                                            <label>Mật khẩu</label>
                                            <input type={showPassword ? 'text' : 'password'} placeholder='...'
                                                value={user?.password}
                                                onChange={(e) => setUser({...user, password: e.target.value})}
                                            />
                                            <i className="fa-solid fa-eye-slash"
                                                onClick={() => setShowPassword(true)}
                                            ></i>
                                        </>
                                    }
                                </div>
                                <button className='btn btn-danger'
                                    onClick={() => handleLoginUser()}
                                >Đăng nhập</button>
                                <div className='social'>
                                    <button className='btn'
                                        onClick={handleLoginWithFaceBook}
                                    >
                                        <i className="fa-brands fa-facebook fb"></i>
                                        <span>Facebook</span>
                                    </button>
                                    <button className='btn'
                                        onClick={handleLoginWithGoogle}
                                    >
                                        <i className="fa-brands fa-google gg"></i>
                                        <span>Google</span>
                                    </button>
                                </div>
                                <div className='forget-password'>
                                    <span onClick={handleForgetPassword}>Quên mật khẩu?</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <AdminFooter />
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
        getDetailUser: (id, token) => dispatch(actions.getDetailUser(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)