import './UpdateDriver.scss';
import AdminFooter from '../../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../Component/SidebarAdmin/SidebarAdmin';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import { updateDriverAdminService } from '../../../../services/DriverService';

const UpdateDriver = (props) => {
  const location = useLocation();
  const idDriver = location.state._id;
  const [driver, setDriver] = useState({
    idNumber: '',
    name: '',
    address: '',
    phoneNumber: '',
    personalInformation: '',
    workHistory: '',
    image: null,
  });
  console.log('driver:', location.state);
  const [driverCompare, setDriverCompare] = useState();
  const [imagePreview, setImagePreview] = useState(`${location.state.image}`);
  const navigation = useNavigate();

  useEffect(() => {
    setDriver(location?.state);
    setDriverCompare(location?.state);
  }, []);

  const onChangeSelectStatus = (e) => {
    setDriver({ ...driver, status: e.target.value });
  };

  const onClickUpdatedriver = async () => {
    // if (driver !== driverCompare) {
    let res = await updateDriverAdminService(idDriver, driver, driver.image);
    if (res && res.status === 'OK') {
      toast.success('Cập nhật thành công');
      navigation('/admin/manage-driver');
      return;
    }
    // } else {
    //   toast.error('Bạn chưa thay đổi gì!');
    //   return;
    // }
  };

  const handleBack = () => {
    navigation('/admin/manage-driver');
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDriver({ ...driver, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className='container-update-driver'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Cập nhật tài xế</h3>
            <button className='btn btn-primary col-2 mx-3 my-3' onClick={() => handleBack()}>
              {'<-- Quay lại'}
            </button>
          </div>
          <div className='bottom'>
            <div className='row'>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Tên tài xế
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={driver?.name}
                  onChange={(e) => setDriver({ ...driver, name: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Căn cước công dân
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={driver?.idNumber}
                  onChange={(e) => setDriver({ ...driver, idNumber: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Số điện thoại
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={driver?.phoneNumber}
                  onChange={(e) => setDriver({ ...driver, phoneNumber: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Địa chỉ
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={driver?.address}
                  onChange={(e) => setDriver({ ...driver, address: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Kinh nghiệm
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={driver?.workHistory}
                  onChange={(e) => setDriver({ ...driver, workHistory: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Hình ảnh
                </label>
                <input
                  type='file'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  onChange={handleImageChange}
                />
                {imagePreview && <img src={imagePreview} width={'100px'} height={'100px'} alt='' />}
              </div>
              <div className='mb-3 col-12'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Thông tin giới thiệu
                </label>
                <textarea
                  name='Text1'
                  rows='4'
                  style={{ width: '100%' }}
                  onChange={(e) => setDriver({ ...driver, personalInformation: e.target.value })}
                ></textarea>
              </div>
              <button
                className='btn btn-warning col-2 mx-3 my-3'
                onClick={() => onClickUpdatedriver()}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     statusdriver: state.drivers.statusdrivers,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllStatusdriver: () => dispatch(actions.getAllStatusdriver()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UpdateDriver);
export default UpdateDriver;
