import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminFooter from '../AdminFooter/AdminFooter';
import HeaderLogin from './HeaderLogin';
import { toast } from 'react-toastify';
import { createNewPassword } from '../../services/UserService';

const ForgotPassword = () => {
  const location = useLocation();
  const [user, setUser] = useState({ email: location?.state, newPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  // useEffect(() => {
  //   setEmail(location?.state);
  // }, []);
  console.log('user', user);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    let { email, newPassword } = user;
    if (!email || !newPassword) {
      toast.error('Bạn chưa nhập mật khẩu mới');
    } else {
      let createPassword = {
        email: email,
        newPassword,
      };
      let res = await createNewPassword(createPassword);
      if (res.status === 'OK') {
        toast.success('Tạo mới mật khẩu thành công');
        navigate('/login');
      } else {
        toast.error('Tạo mới khẩu thất bại');
      }
    }
  };
  return (
    <div>
      <HeaderLogin />
      <div className='login-content'>
        <div className='container'>
          <div className='wrapper'>
            <i className='icon fas fa-walking'></i>
            <div className='form '>
              <h4>Quên mật khẩu</h4>
              <div className='item password'>
                {showPassword ? (
                  <>
                    <label>Mật khẩu</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='...'
                      value={user?.newPassword}
                      onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                    />
                    <i className='fa-solid fa-eye' onClick={() => setShowPassword(false)}></i>
                  </>
                ) : (
                  <>
                    <label>Mật khẩu</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='...'
                      value={user?.newPassword}
                      onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                    />
                    <i className='fa-solid fa-eye-slash' onClick={() => setShowPassword(true)}></i>
                  </>
                )}
              </div>
              <button className='btn btn-danger' onClick={() => handleSubmit()}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default ForgotPassword;
