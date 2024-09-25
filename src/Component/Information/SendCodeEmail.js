import { useState } from 'react'
import HeaderLogin from './HeaderLogin'
import './SendCodeEmail.scss'

const SendCodeEmail = () => {
    const [email, setEmail] = useState('')

  return (
    <div>
        <HeaderLogin />
        <div className='content'>
                <div className='container'>
                    <div className='back' 
                    // onClick={handleClickBack}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                        <span>Quay lại</span>
                    </div>

                    <div className='center'>
                        <h3>Xác minh bảo mật</h3>
                        <div className='verify'>
                                <span className='title'>Email của bạn</span>
                                <input type="text" placeholder='......' 
                                    className='text-email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            <span className='receive-code'>Nhận mã</span>
                            <span className='title'>Ứng dụng xác thực</span>
                            <input type="text" placeholder='......' 
                            // value={otp}
                                // onChange={(e) => handleOnchangeOtp(e)}
                            />
                            <span className='description'>Hãy nhập mã gồm 6 chữ số được gửi đến email của bạn</span>
                            <button className='btn btn-warning'
                                // onClick={handleSendOtp}
                            >Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default SendCodeEmail