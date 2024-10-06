import { useState } from 'react';
import AdminFooter from '../../../Component/AdminFooter/AdminFooter';
import AdminHeader from '../../../Component/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../Component/SidebarAdmin/SidebarAdmin';
import { deleteTicketUserService, getAllTicketService } from '../../../services/TicketService';
import './ManageTicket.scss';
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Panigation from '../../../Component/Panigation/Panigation';

const ManageTicket = () => {
  const [page, setPage] = useState(0);
  const [listTicket, setListTicket] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [idTicketDelete, setIdTicketDelete] = useState('');

  const navigation = useNavigate();

  useEffect(() => {
    getAllTicket();
  }, [page]);

  const getAllTicket = async () => {
    let res = await getAllTicketService(page);
    if (res && res.status === 'OK') {
      setListTicket(res);
    }
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setIdTicketDelete(id);
  };

  const handleDeleteTicket = async () => {
    if (idTicketDelete) {
      const res = await deleteTicketUserService(idTicketDelete);
      if (res && res.status === 'OK') {
        toast.success('Bạn đã xóa thành công');
        handleDeleteClose();
        setIdTicketDelete('');
        getAllTicket();
      } else {
        toast.error('Xóa thất bại');
        handleDeleteClose();
        setIdTicketDelete('');
        getAllTicket();
      }
    }
  };

  const handleDetailTicket = (ticket) => {
    navigation('/admin/manage-ticket/detail', { state: ticket });
  };

  const handlePageClick = (e) => {
    if (e) {
      setPage(e.selected);
    }
  };
  return (
    <div className='container-manage-car'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Quản lý vé xe</h3>
          </div>
          <div className='data'>
            {listTicket && listTicket?.data?.length > 0 ? (
              <table className='table-manage-users'>
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Người đặt</th>
                    <th>Lộ trình</th>
                    <th>Trạng thái thanh toán</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listTicket?.data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={item?.trip?.car?.image}
                            width={'100px'}
                            height={'100px'}
                            alt='ảnh xe'
                          />
                          <p>{item?.trip?.car?.licensePlate}</p>
                        </td>
                        <td>{item?.user?.name}</td>
                        <td>
                          {item?.trip?.departure?.value} - {item?.trip?.destination?.value}
                        </td>
                        <td>{item?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                        <td>
                          <button
                            className='btn btn-primary update'
                            onClick={() => handleDetailTicket(item)}
                          >
                            Chi tiết
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
            maxPage={listTicket?.maxPage > 0 ? listTicket?.maxPage : 5}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
      <AdminFooter />

      {/* Modal delete ticket */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <span>Bạn có chắc chắn xóa chiếc xe này?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDeleteTicket}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageTicket;
