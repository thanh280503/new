import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import './HistoryBookTicket.scss';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  deleteTicketUserService,
  getAllTicketUserService,
  updateTicketUserService,
} from '../../services/TicketService';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAllPaymentService } from '../../services/TripService';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const HistoryBookTicket = (props) => {
  const [data, setData] = useState([]);
  const [dataPayments, setDataPayments] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [ticketUpdate, setTicketUpdate] = useState({});
  const [ticketPayment, setTicketPayment] = useState({});
  const [valuePayment, setValuePayment] = useState('');
  const [numberBookUpdate, setNumberBookUpdate] = useState(0);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (props.idUser) {
      getAllTicket(props.idUser);
      getAllPayment();
    }
  }, []);

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setIdDelete(id);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
    setTicketPayment({});
    setValuePayment('');
  };

  const handlePaymentShow = (ticket) => {
    setShowPayment(true);
    setTicketPayment(ticket);
  };

  const handleUpdateClose = () => {
    setShowUpdate(false);
  };

  const handleUpdateShow = (ticket) => {
    setShowUpdate(true);
    setTicketUpdate(ticket);
    setNumberBookUpdate(ticket?.numberOfBooked);
  };

  const getAllTicket = async (id) => {
    let res = await getAllTicketUserService(id);
    if (res && res.status === 'OK') {
      setData(res.data);
    }
  };

  const getAllPayment = async (id) => {
    let res = await getAllPaymentService();
    if (res && res.status === 'OK') {
      setDataPayments(res.data);
    }
  };

  const handleUpdateTicket = async () => {
    if (numberBookUpdate === ticketUpdate?.numberOfBooked) {
      toast.error('Bạn chưa thay đổi gì!');
      return;
    }

    let ticket = {
      id: ticketUpdate?._id,
      ...ticketUpdate,
      numberOfBooked: numberBookUpdate,
      totalPrice: numberBookUpdate * ticketUpdate?.trip?.price,
    };

    let res = await updateTicketUserService(ticket);
    if (res && res.status === 'OK') {
      toast.success('Cập nhật thành công!');
      handleUpdateClose();
      setTicketUpdate({});
      setNumberBookUpdate(0);
      getAllTicket(props.idUser);
    }
  };

  const handleDeleteTrip = async () => {
    let res = await deleteTicketUserService(idDelete);
    if (res && res.status === 'OK') {
      toast.success('Bạn đã xóa thành công!');
      setIdDelete('');
      handleDeleteClose();
      getAllTicket(props.idUser);
    } else {
      toast.error('Xóa thất bại!');
      setIdDelete('');
      handleDeleteClose();
    }
  };

  const handlePaymentTicket = () => {
    if (!valuePayment || valuePayment === 'P1') {
      toast.error('Phương thức này k thể thanh toán online!');
    } else {
    }
  };

  const addPaypalScript = async () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=AT7EBr6jVilRNlisLhqloAyPvmyrSsfCNrnofoJjKUvO3FQHE4m5MBPuNdaDsa8smSCZBYBsW44zlPA4`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPaypal = async (details, data) => {
    let ticket = {
      id: ticketPayment?._id,
      ...ticketPayment,
      isPaid: true,
      payment: valuePayment,
    };
    let res = await updateTicketUserService(ticket);
    if (res && res.status === 'OK') {
      toast.success('Bạn đã thanh toán thành công!');
      handlePaymentClose();
      setTicketPayment({});
      getAllTicket(props.idUser);
    }
  };
  const onErrorPaypal = () => {
    toast.error('Thanh toán bị lỗi!');
  };
  return (
    <div>
      <Header />
      <div className='history-content'>
        <div className='container'>
          <h4 className='my-3'>Danh sách đặt vé</h4>
          <div className='data'>
            {data && data?.length > 0 ? (
              <table className='table-manage-book-ticket my-5'>
                <thead>
                  <tr>
                    <th>Xe</th>
                    <th>Điểm đi - Điểm đến</th>
                    <th>Ngày đi</th>
                    <th>Số vé đặt</th>
                    <th>Tồng tiền</th>
                    <th>Thanh toán</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => {
                    return (
                      <tr key={item?._id}>
                        <td>
                          <div className='car'>
                            <img src={item?.trip?.car?.image} alt='Ảnh xe' />
                            <label>{item?.trip?.car?.name}</label>
                          </div>
                        </td>
                        <td>
                          {item?.trip?.departure?.value} - {item?.trip?.destination?.value}
                        </td>
                        <td>{item?.trip?.dayStart}</td>
                        <td>{item?.numberOfBooked}</td>
                        <td>{item?.totalPrice}</td>
                        <td>
                          {item?.isPaid ? (
                            <>Đã thanh toán</>
                          ) : (
                            <div>
                              <button
                                className='btn btn-primary'
                                onClick={() => handlePaymentShow(item)}
                              >
                                Thanh toán
                              </button>
                            </div>
                          )}
                        </td>
                        <td>
                          <button
                            className='btn btn-primary update'
                            // onClick={() => handleDetailCar(item)}
                          >
                            Chi tiết
                          </button>
                          <button
                            className='btn btn-warning update'
                            onClick={() => handleUpdateShow(item)}
                          >
                            Sửa
                          </button>
                          <button
                            className='btn btn-danger delete'
                            onClick={() => handleDeleteShow(item?._id)}
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
              <div className='loading'>
                <i className='fa-solid fa-suitcase-rolling'></i>
                <span>Hiện tại bạn chưa đặt vé nào cả!</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {/* update */}
      <Modal show={showUpdate} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật Chuyến đi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-12 content-modal'>
              <div className='item'>
                <span>Tên xe:</span>
                <span>{ticketUpdate?.trip?.car?.name}</span>
              </div>
              <div className='item'>
                <span>Khởi hành:</span>
                <span className='item'>
                  {ticketUpdate?.trip?.departure?.value} - {ticketUpdate?.trip?.destination?.value}
                </span>
              </div>
              <div className='item'>
                <span>Ngày:</span>
                <span className='item'>
                  {ticketUpdate?.trip?.dayStart} - {ticketUpdate?.trip?.time?.value}
                </span>
              </div>
              <div className='number'>
                <span
                  onClick={() =>
                    numberBookUpdate === 0
                      ? numberBookUpdate
                      : setNumberBookUpdate(numberBookUpdate - 1)
                  }
                >
                  -
                </span>
                <span className='con'>{numberBookUpdate}</span>
                <span onClick={() => setNumberBookUpdate(numberBookUpdate + 1)}>+</span>
              </div>
              <div className='item'>
                <span>Số tiền:</span>
                <span className='item'>{numberBookUpdate * ticketUpdate?.trip?.price}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant='warning' onClick={handleUpdateTicket}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* delete */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Chuyến đi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <span>Bạn có chắc chắn xóa chuyến đi này?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDeleteTrip}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* payment */}
      <Modal show={showPayment} onHide={handlePaymentClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row modal-payment'>
            <div className='col-6 text'>
              <span>Tổng tiền:</span>
              <span>{ticketPayment?.totalPrice}</span>
            </div>
            <select className='col-6' onChange={(e) => setValuePayment(e.target.value)}>
              <option value={''}>Chọn hình thức thanh toán</option>
              {dataPayments &&
                dataPayments.length > 0 &&
                dataPayments.map((item) => {
                  return (
                    <option key={item._id} value={item?._id}>
                      {item?.value}
                    </option>
                  );
                })}
            </select>
            {valuePayment === '66f8b5354a4a22f73043d5c3' && sdkReady ? (
              <div className='paypal'>
                <PayPalScriptProvider
                  options={{
                    clientId:
                      'AT7EBr6jVilRNlisLhqloAyPvmyrSsfCNrnofoJjKUvO3FQHE4m5MBPuNdaDsa8smSCZBYBsW44zlPA4',
                  }}
                >
                  <PayPalButtons
                    style={{ width: '200px' }}
                    amount={ticketPayment?.totalPrice}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={onErrorPaypal}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handlePaymentClose}>
            Close
          </Button>
          <Button variant='warning' onClick={handlePaymentTicket}>
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    idUser: state.users.idUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBookTicket);
