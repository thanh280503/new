import './Footer.scss'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className='footer-content'>
                <div className='container'>
                    <div className='information'>
                        <ul className='list'>
                            <li className='heading'>
                                <h4>Tin tức</h4>
                            </li>
                            <li className='item'>
                                <span>Xe giường nằm</span>
                            </li>
                            <li className='item'>
                                <span>Xe 48 chỗ</span>
                            </li>
                            <li className='item'>
                                <span>Xe giường đôi</span>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li className='heading'>
                                <h4>Tuyến đường</h4>
                            </li>
                            <li className='item'>
                                <span>Xe đi Sài Gòn</span>
                            </li>
                            <li className='item'>
                                <span>Xe đi Đà Lạt</span>
                            </li>
                            <li className='item'>
                                <span>Xe đi Hà Nội</span>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li className='heading'>
                                <h4>Nhà xe</h4>
                            </li>
                            <li className='item'>
                                <span>Nhà xe Phương Trang</span>
                            </li>
                        </ul>
                    </div>
                    <div className='information'>
                        <ul className='list'>
                            <li className='heading'>
                                <h4>Về chúng tôi</h4>
                            </li>
                            <li className='item'>
                                <span>Giới Thiệu Vexe</span>
                            </li>
                            <li className='item'>
                                <span>Tin tức</span>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li className='heading'>
                                <h4>Hỗ trợ</h4>
                            </li>
                            <li className='item'>
                                <span>Hỗ trợ thanh toán</span>
                            </li>
                            <li className='item'>
                                <span>Quy chế Vexe</span>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li className='heading'>
                                <h4>Chứng nhận</h4>
                            </li>
                            <li className='item'>
                                <img src='https://229a2c9fe669f7b.cmccloud.com.vn/images/dangkybocongthuong.png'/>
                            </li>
                        </ul>
                        <ul className='list'>
                            <li className='heading'>
                                <h4>Liên hệ chúng tôi</h4>
                            </li>
                            <li className='item'>
                                <span>Facebook</span>
                            </li>
                            <li className='item'>
                                <span>Instagram</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <h3>Công ty TNHH Thương Mại Dịch Vụ Vexe</h3>
                <span>
                    Địa chỉ đăng ký kinh doanh: Lê Đại Hành, Phường Khuê Trung, Quận Cẩm Lệ, TP Đà Nẵng
                </span>
                <span>Bản quyền © 2020 thuộc về Vexere.Com</span>
            </div>
        </div>
    )
}

export default Footer