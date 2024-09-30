import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import './RentalCar.scss'

const RentalCar = () => {
  return (
    <div className='rental-car-container'>
        <Header />
        <div className='content'>
            <div className='description'>
                <img src='https://vexere.com/vn/thue-xe/wp-content/uploads/2022/07/Thue-xe-Limousine-Phan-Thiet-Mui-Ne2.jpg'/>
                <div className='text'>
                  <h4>
                    Dịch vụ thuê xe du lịch giá rẻ
                  </h4>
                  <ul>
                    <li>Thông tin rõ ràng, minh bạch</li>
                    <li>Nhận báo giá nhanh chóng, chi tiết</li>
                    <li>Xe chất lượng cao, đa dạng chủng loại</li>
                    <li>Hỗ trợ chu đáo, tận tình 24/7</li>
                  </ul>
                  <button className='btn btn-warning'>Đăng ký thuê xe</button>
                </div>
            </div>
            <div className='action'>
              <div className='top'>
                Thuê xe du lịch cùng VEXE trong 3 bước
              </div>
             <div className='container'>
             <div className='bottom'>
                <div className='item'>
                  <i className="fa-solid fa-road"></i>
                  <div className='name'>Mô tả lịch trình</div>
                  <div className='detail'>Mô tả chi tiết lịch trình theo từng gói dịch vụ sẽ giúp Vexere tính toán và báo giá cho bạn tốt hơn.​</div>
                </div>
                <div className='item'>
                  <i className="fa-regular fa-note-sticky"></i>
                  <div className='name'>Nhận báo giá chi tiết</div>
                  <div className='detail'>Giá thuê xe tại Vexere là giá trọn gói dịch vụ, bạn sẽ không phải trả thêm bất cứ chi phí gì.​</div>
                </div>
                <div className='item'>
                  <i className="fa-regular fa-handshake"></i>
                  <div className='name'>Xác nhận thuê xe</div>
                  <div className='detail'>Xác nhận thuê xe sẽ được gửi tới bạn qua tin nhắn hoặc email. Sẵn sàng tận hưởng chuyến đi thôi!​</div>
                </div>
              </div>
             </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default RentalCar