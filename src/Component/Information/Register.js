import React, { useState } from 'react'
import './Register.scss'
import HeaderLogin from './HeaderLogin'
import AdminFooter from '../AdminFooter/AdminFooter'
import { toast } from 'react-toastify'
import { registerUserService } from '../../service/UserService'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [newUser, setNewUser] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()
    
    const handleRegisterUser = async () => {
        let {email, name, password, confirmPassword} = newUser

        if(!email || !name || !password || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin!")
            return
        }

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if(!isCheckEmail) {
            toast.error("Email của bạn không đúng định dạng!")
            return
        }

        if(password !== confirmPassword) {
            toast.error("Nhập lại mật khẩu không trùng khớp!")
            return
        }

        let user = {
            email, 
            password,
            confirmPassword,
            name
        }

        let res = await registerUserService(user)

        if(res && res.status === 'OK') {
            toast.success("Xác thực email bạn nhé!")
            setNewUser({})
            navigate("/verify-email", {state: email})
        }else {
            toast.error("Đăng ký thất bại!")
        }
    }
  return (
    <div>
        <HeaderLogin />
        <div className='login-content'> 
            <div className='container'>
                <div className='wrapper'>
                        <i className="icon fas fa-walking"></i>
                        <div className='form '>
                            <h4>Đăng Ký</h4>
                            <div className='item'>
                                <label>Email</label>
                                <input type='text' placeholder='...'
                                    value={newUser?.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                />
                            </div>
                            <div className='item'>
                                <label>Tên đăng nhập</label>
                                <input type='text' placeholder='...'
                                    value={newUser?.name}
                                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                />
                            </div>
                            <div className='item password'>
                                {showPassword 
                                    ?
                                    <>
                                        <label>Mật khẩu</label>
                                        <input type={showPassword ? 'text' : 'password'} placeholder='...'
                                            value={newUser?.password}
                                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                        />
                                        <i className="fa-solid fa-eye"
                                            onClick={() => setShowPassword(false)}
                                        ></i>
                                        
                                    </>
                                    :
                                    <>
                                        
                                        <label>Mật khẩu</label>
                                        <input type={showPassword ? 'text' : 'password'}  placeholder='...'
                                            value={newUser?.password}
                                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                        />
                                        <i className="fa-solid fa-eye-slash"
                                            onClick={() => setShowPassword(true)}
                                        ></i>
                                    </>
                                }
                            </div>
                            <div className='item password'>
                                {showConfirmPassword 
                                    ?
                                    <>
                                        <label>Xác nhận mật khẩu</label>
                                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder='...'
                                            value={newUser?.confirmPassword}
                                            onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                                        />
                                        <i className="fa-solid fa-eye"
                                            onClick={() => setShowConfirmPassword(false)}
                                        ></i>
                                        
                                    </>
                                    :
                                    <>
                                        
                                        <label>Xác nhận mật khẩu</label>
                                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder='...'
                                            value={newUser?.confirmPassword}
                                            onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                                        />
                                        <i className="fa-solid fa-eye-slash"
                                            onClick={() => setShowConfirmPassword(true)}
                                        ></i>
                                    </>
                                }
                            </div>
                            <button className='btn btn-danger'
                                onClick={() => handleRegisterUser()}
                            >Đăng ký</button>
                        </div>
                </div>
            </div>
        </div>
        <AdminFooter />
    </div>
  )
}

export default Register