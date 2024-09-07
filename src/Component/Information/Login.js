import React from 'react'
import './Login.scss'
import HeaderLogin from './HeaderLogin'
import AdminFooter from '../AdminFooter/AdminFooter'


const Login = () => {

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


export default Login