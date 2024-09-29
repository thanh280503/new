import { useState, useEffect } from 'react';
import AdminFooter from '../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../Component/SidebarAdmin/SidebarAdmin';

import './ManageDriver.scss';
import Panigation from '../../../Component/Panigation/Panigation';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  deleteDriverAdminService,
  getAllDriverAdminService,
} from '../../../services/DriverService';

const ManageDriver = () => {
  const [page, setPage] = useState(0);
  const [listDriver, setListDriver] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [idDriverDelete, setIdDriverDelete] = useState('');

  const navigation = useNavigate();

  useEffect(() => {
    getAllDriver();
  }, [page]);

  const getAllDriver = async () => {
    let res = await getAllDriverAdminService(page);
    if (res && res.status === 'OK') {
      setListDriver(res);
    }
  };

  const handleCreateDriver = () => {
    navigation('/admin/manage-driver/create');
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setIdDriverDelete(id);
  };

  const handleDeleteDriver = async () => {
    if (idDriverDelete) {
      const res = await deleteDriverAdminService(idDriverDelete);
      if (res && res.status === 'OK') {
        toast.success('Bạn đã xóa thành công');
        handleDeleteClose();
        setIdDriverDelete('');
        getAllDriver();
      } else {
        toast.error('Xóa thất bại');
        handleDeleteClose();
        setIdDriverDelete('');
        getAllDriver();
      }
    }
  };

  const handleUpdateDriver = (driver) => {
    navigation('/admin/manage-driver/update', { state: driver });
  };

  const handleDetailDriver = (driver) => {
    navigation('/admin/manage-driver/detail', { state: driver });
  };

  const handlePageClick = (e) => {
    if (e) {
      setPage(e.selected);
    }
  };

  return (
    <div className='container-manage-driver'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Quản lý tài xế</h3>
            <button className='btn btn-primary' onClick={() => handleCreateDriver()}>
              + Thêm mới
            </button>
          </div>
          <div className='data'>
            {listDriver && listDriver?.data?.length > 0 ? (
              <table className='table-manage-drivers'>
                <thead>
                  <tr>
                    <th>Tên tài xế</th>
                    <th>Hình ảnh</th>
                    <th>Số điện thoại</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listDriver?.data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                          <img src={item.image} width={'100px'} height={'100px'} alt='ảnh tài xế' />
                        </td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          <button
                            className='btn btn-primary update'
                            onClick={() => handleDetailDriver(item)}
                          >
                            Chi tiết
                          </button>
                          <button
                            className='btn btn-warning update'
                            onClick={() => handleUpdateDriver(item)}
                          >
                            Sửa
                          </button>
                          <button
                            className='btn btn-danger delete'
                            onClick={() => handleDeleteShow(item._id)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className='loading'>...loading</div>
            )}
          </div>
          <Panigation
            maxPage={listDriver?.maxPage > 0 ? listDriver?.maxPage : 5}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
      <AdminFooter />
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Tài Xế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <span>Bạn có chắc chắn xóa tài xế này?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDeleteDriver}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageDriver;
