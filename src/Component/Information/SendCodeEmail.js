import { useState } from 'react';
import HeaderLogin from './HeaderLogin';
import './SendCodeEmail.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, verifyEmailForgotPassword } from '../../services/UserService';

const SendCodeEmail = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/login');
  };

  const handleOnClickReceiveCode = async () => {
    console.log('email', email);
    if (email === '') {
      toast.error('Bạn chưa nhập email');
    }
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!isCheckEmail) {
      toast.error('Email của bạn không đúng định dạng!');
      return;
    }
    let res = await forgotPassword(email);
    console.log('res: ', res);

    if (res && res.status === 'OK') {
      toast.success('Xác thực email bạn nhé!');
    } else {
      toast.error('Lấy lại mật khẩu thất bại');
    }
  };

  const handleSendOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Chỉ 6 kí tự thôi bro!');
      return;
    }
    let res = await verifyEmailForgotPassword({
      email,
      otp,
    });

    if (res && res.status === 'OK') {
      toast.success('Thành công!');
      navigate('/forgot-password', { state: email });
    }
  };

  return (
    <div>
      <HeaderLogin />
      <div className='content'>
        <div className='container'>
          <div
            className='back'
            // onClick={handleClickBack}
          >
            <i className='fa-solid fa-angle-left'></i>
            <span onClick={() => handleBack()}>Quay lại</span>
          </div>

          <div className='center'>
            <h3>Xác minh bảo mật</h3>
            <div className='verify'>
              <span className='title'>Email của bạn</span>
              <input
                type='text'
                placeholder='......'
                className='text-email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className='receive-code' onClick={() => handleOnClickReceiveCode()}>
                Nhận mã
              </span>
              <span className='title'>Ứng dụng xác thực</span>
              <input
                type='text'
                placeholder='......'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <span className='description'>
                Hãy nhập mã gồm 6 chữ số được gửi đến email của bạn
              </span>
              <button className='btn send' onClick={handleSendOtp}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendCodeEmail;
