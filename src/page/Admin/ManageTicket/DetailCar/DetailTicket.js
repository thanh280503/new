import { useLocation, useNavigate } from 'react-router-dom';
import './DetailTicket.scss';
import AdminFooter from '../../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../Component/SidebarAdmin/SidebarAdmin';
import Header from '../../../../Component/Header/Header';
import Footer from '../../../../Component/Footer/Footer';
import { useState, useEffect } from 'react';

const DetailTicket = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    setTicket(location?.state);
  }, []);
  console.log(ticket);
  const handleBack = () => {
    if (location?.pathname === '/admin/manage-ticket/detail') {
      navigation('/admin/manage-ticket');
    } else {
      navigation('/book-ticket');
    }
  };

  return (
    <div className='container-detail-ticket'>
      {location.pathname === '/admin/manage-ticket/detail' ? <AdminHeader /> : <Header />}
      <div className='content'>
        {location.pathname === '/admin/manage-ticket/detail' ? <SidebarAdmin /> : ''}
        <div className='right'>
          <div className='top'>
            <h3>Chi tiết xe</h3>
            <button className='btn btn-primary col-2 mx-3 my-3' onClick={() => handleBack()}>
              {'<-- Quay lại'}
            </button>
          </div>
          {ticket ? (
            <div className='bottom'>
              <div className='data'>
                <div className='image'>
                  <img src={ticket?.trip?.car?.image} alt='' />
                </div>
                <div className='list'>
                  <div className='item'>
                    <label>Biển số xe:</label>
                    <p>{ticket?.trip?.car?.licensePlate}</p>
                  </div>
                  <div className='item'>
                    <label>Người đặt:</label>
                    <p>{ticket?.user?.name}</p>
                  </div>
                  <div className='item'>
                    <label>Số lượng đặt:</label>
                    <p>{ticket?.numberOfBooked}</p>
                  </div>
                  <div className='item'>
                    <label>Lộ trình:</label>
                    <p>
                      {ticket?.trip?.departure?.value} - {ticket?.trip?.destination?.value}
                    </p>
                  </div>
                  <div className='item'>
                    <label>Giá:</label>
                    <p>{ticket?.totalPrice} VND</p>
                  </div>
                  <div className='item'>
                    <label>Trạng thái thanh toán:</label>
                    <p>{ticket?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='loading'>...loading</div>
          )}
        </div>
      </div>
      {location.pathname === '/admin/manage-ticket/detail' ? <AdminFooter /> : <Footer />}
    </div>
  );
};

export default DetailTicket;
