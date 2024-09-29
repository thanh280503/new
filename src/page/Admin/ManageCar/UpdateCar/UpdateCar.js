import './UpdateCar.scss';
import AdminFooter from '../../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../Component/SidebarAdmin/SidebarAdmin';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';
import { updateCarAdminService } from '../../../../services/CarService';

const UpdateCar = (props) => {
  const location = useLocation();
  const idCar = location.state._id;
  const [car, setCar] = useState({
    name: '',
    type: '',
    numberOfSeats: '',
    color: '',
    yearOfManufacture: '',
    licensePlate: '',
    image: '',
    note: '',
    status: '',
  });
  console.log('Car:', location.state);
  const [carCompare, setCarCompare] = useState();
  const [imagePreview, setImagePreview] = useState(`${location.state.image}`);
  const navigation = useNavigate();

  useEffect(() => {
    setCar(location?.state);
    setCarCompare(location?.state);
  }, []);

  const onChangeSelectStatus = (e) => {
    setCar({ ...car, status: e.target.value });
  };

  const onClickUpdateCar = async () => {
    // if (car !== carCompare) {
    let res = await updateCarAdminService(idCar, car);
    if (res && res === 'OK') {
      toast.success('Cập nhật thành công');
      return;
    }
    // } else {
    //   toast.error('Bạn chưa thay đổi gì!');
    //   return;
    // }
  };

  const handleBack = () => {
    navigation('/admin/manage-car');
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCar({ ...car, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className='container-update-car'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Cập nhật xe</h3>
            <button className='btn btn-primary col-2 mx-3 my-3' onClick={() => handleBack()}>
              {'<-- Quay lại'}
            </button>
          </div>
          <div className='bottom'>
            <div className='row'>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Tên xe
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car?.name}
                  onChange={(e) => setCar({ ...car, name: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Loại xe
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car?.type}
                  onChange={(e) => setCar({ ...car, type: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Số chỗ ngồi
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car?.numberOfSeats}
                  onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Màu sắc
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car?.color}
                  onChange={(e) => setCar({ ...car, color: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Năm sản xuất
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car?.yearOfManufacture}
                  onChange={(e) => setCar({ ...car, yearOfManufacture: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Biển số xe
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car?.licensePlate}
                  onChange={(e) => setCar({ ...car, licensePlate: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4 status'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Trạng thái
                </label>
                <select onChange={(e) => onChangeSelectStatus(e)}>
                  <option value={''}>Chọn trạng thái</option>
                  {props.statusCar &&
                    props.statusCar.length > 0 &&
                    props.statusCar.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
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
                {imagePreview && <img src={imagePreview} width={'100px'} height={'100px'} />}
              </div>
              <div className='mb-3 col-12'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Ghi chú
                </label>
                <textarea
                  name='Text1'
                  rows='4'
                  style={{ width: '100%' }}
                  onChange={(e) => setCar({ ...car, note: e.target.value })}
                ></textarea>
              </div>
              <button
                className='btn btn-warning col-2 mx-3 my-3'
                onClick={() => onClickUpdateCar()}
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

function mapStateToProps(state) {
  return {
    statusCar: state.cars.statusCars,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllStatusCar: () => dispatch(actions.getAllStatusCar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCar);
