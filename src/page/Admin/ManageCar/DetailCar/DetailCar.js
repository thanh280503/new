import { useLocation, useNavigate } from 'react-router-dom';
import './DetailCar.scss';
import AdminFooter from '../../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../Component/SidebarAdmin/SidebarAdmin';
import { useState, useEffect } from 'react';

const DetailCar = () => {
  const [car, setCar] = useState({});

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    setCar(location?.state);
  }, []);

  const handleBack = () => {
    navigation('/admin/manage-car');
  };

  return (
    <div className='container-detail-car'>
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
          {car ? (
            <div className='bottom'>
              <div className='data'>
                <div className='image'>
                  <img src={car?.image} />
                </div>
                <div className='list'>
                  <div className='item'>
                    <label>Tên xe:</label>
                    <p>{car?.name}</p>
                  </div>
                  <div className='item'>
                    <label>Loại xe:</label>
                    <p>{car?.type}</p>
                  </div>
                  <div className='item'>
                    <label>Số chỗ ngồi:</label>
                    <p>{car?.numberOfSeats}</p>
                  </div>
                  <div className='item'>
                    <label>Năm sản xuất:</label>
                    <p>{car?.yearOfManufacture}</p>
                  </div>
                  <div className='item'>
                    <label>Màu sắc:</label>
                    <p>{car?.color}</p>
                  </div>
                  <div className='item'>
                    <label>Trạng thái:</label>
                    <p>{car?.status?.value}</p>
                  </div>
                  <div className='item'>
                    <label>Ghi chú:</label>
                    <p>{car?.note}</p>
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

export default DetailCar;
