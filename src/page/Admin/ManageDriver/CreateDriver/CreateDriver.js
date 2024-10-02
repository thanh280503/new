import { useState } from 'react';
import AdminFooter from '../../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../Component/SidebarAdmin/SidebarAdmin';
import './CreateDriver.scss';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createDriverAdminService } from '../../../../services/DriverService';

const CreateDriver = (props) => {
  const navigation = useNavigate();
  const [newDriver, setNewDriver] = useState({
    idNumber: '',
    name: '',
    address: '',
    phoneNumber: '',
    personalInformation: '',
    workHistory: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {}, []);

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  }

  const handleAddNewDriver = async () => {
    let { idNumber, name, phoneNumber, address, personalInformation, workHistory, image } =
      newDriver;
    if (!idNumber || !name || !phoneNumber || !address || !personalInformation || !workHistory || !image
    ) {
      toast.error('Bạn chưa điền đầy đủ thông tin!');
      return;
    }

    console.log('idNumber.length !== 12', idNumber.length !== 12);
    
    if(idNumber.length !== 12 && !isNumeric(idNumber)) {
      toast.error('Số căn cước công dân không đúng định dạng!');
      return;
    }

    if((phoneNumber.length < 10 || phoneNumber.length < 11)  && !isNumeric(idNumber)) {
      toast.error('Số điện thoại không đúng định dạng!');
      return;
    }
    
    let formData = new FormData();
    Object.keys(newDriver).forEach((key) => formData.append(key, newDriver[key]));

    const res = await createDriverAdminService(formData);

    if (res && res.status === 'OK') {
      toast.success('Thêm tài xế thành công');
      setNewDriver({
        idNumber: '',
        name: '',
        phoneNumber: '',
        address: '',
        personalInformation: '',
        workHistory: '',
        image: null,
      });
      setImagePreview(null);
    } else {
      toast.error('Thêm thất bại');
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDriver({ ...newDriver, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleBack = () => {
    navigation('/admin/manage-driver');
  };

  return (
    <div className='container-create-car'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Thêm xe</h3>
            <button className='btn btn-primary col-2 mx-3 my-3' onClick={() => handleBack()}>
              {'<-- Quay lại'}
            </button>
          </div>
          <div className='bottom'>
            <div className='row'>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Số căn cước công dân
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='....'
                  value={newDriver.idNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, idNumber: e.target.value })}
                />
              </div>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Tên
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Họ và tên'
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                />
              </div>

              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Điện thoại
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Số điện thoại'
                  value={newDriver.phoneNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
                />
              </div>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Địa chỉ
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Địa chỉ'
                  value={newDriver.address}
                  onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
                />
              </div>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Thông tin cá nhân
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Thông tin cá nhân'
                  value={newDriver.personalInformation}
                  onChange={(e) =>
                    setNewDriver({ ...newDriver, personalInformation: e.target.value })
                  }
                />
              </div>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Kinh nghiệm làm việc
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Kinh nghiệm làm việc'
                  value={newDriver.workHistory}
                  onChange={(e) => setNewDriver({ ...newDriver, workHistory: e.target.value })}
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
            </div>
            <button
              className='btn btn-primary col-2 mx-3 my-3'
              onClick={() => handleAddNewDriver()}
            >
              + Thêm mới
            </button>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default CreateDriver;
