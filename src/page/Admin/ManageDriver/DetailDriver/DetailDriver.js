import { useLocation, useNavigate } from 'react-router-dom';
import './DetailDriver.scss';
import AdminFooter from '../../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../Component/SidebarAdmin/SidebarAdmin';
import { useState, useEffect } from 'react';

const DetailDriver = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [driver, setDriver] = useState({});

  useEffect(() => {
    setDriver(location?.state);
  }, []);

  const handleBack = () => {
    navigation('/admin/manage-driver');
  };

  return (
    <div className='container-detail-driver'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Chi tiết xe</h3>
            <button className='btn btn-primary col-2 mx-3 my-3' onClick={() => handleBack()}>
              {'<-- Quay lại'}
            </button>
          </div>
          {driver ? (
            <div className='bottom'>
              <div className='data'>
                <div className='image'>
                  <img src={driver?.image} alt='' />
                </div>
                <div className='list'>
                  <div className='item'>
                    <label>Tên tài xế:</label>
                    <p>{driver?.name}</p>
                  </div>
                  <div className='item'>
                    <label>Căn cước công dân:</label>
                    <p>{driver?.idNumber}</p>
                  </div>
                  <div className='item'>
                    <label>Số điện thoại:</label>
                    <p>{driver?.phoneNumber}</p>
                  </div>
                  <div className='item'>
                    <label>Địa chỉ:</label>
                    <p>{driver?.address}</p>
                  </div>
                  <div className='item'>
                    <label>Kinh nghiêm:</label>
                    <p>{driver?.workHistory} năm</p>
                  </div>
                  <div className='item'>
                    <label>Thông tin giới thiệu:</label>
                    <p>{driver?.personalInformation}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='loading'>...loading</div>
          )}
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default DetailDriver;
