import './ManageTrip.scss'
import AdminFooter from '../../../components/AdminFooter/AdminFooter'
import AdminHeader from '../../../components/AdminHeader/AdminHeader'
import SidebarAdmin from '../../../components/SidebarAdmin/SidebarAdmin'
import { useState, useEffect } from 'react'
import { deleteTripAdminService, getAllTripAdminService, updateTripAdminService } from '../../../service/TripService'
import { useNavigate } from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker'
import { connect } from "react-redux"
import * as actions from '../../../store/actions'
import { toast } from 'react-toastify'
import { id } from 'date-fns/locale'

const ManageTrip = (props) => {
    const [page, setPage] = useState(0)
    const [listTrip, setListTrip] = useState({})
    const navigation = useNavigate()
    const [showUpdate, setShowUpdate] = useState(false);
    const [trip, setTrip] = useState({})
    const [tripCompare, setTripCompare] = useState({})
    const [showDelete, setShowDelete] = useState(false);
    const [idTrip, setIdTrip] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        getAllTrip()
    }, [page])

    useEffect(() => {
        getDestinations()
        getDepartures()
        getTimes()
        getCars()
    }, [])

    const getDestinations = async () => {
        await props.getAllDestination()
    }

    const getDepartures = async () => {
        await props.getAllDeparture()
    }

    const getTimes = async () => {
        await props.getAllTime()
    }

    const getCars = async () => {
        await props.getCarsStatus('650ba7679b97f144d2cdbe41')
    }

    const getAllTrip = async () => {
        let res = await getAllTripAdminService(page)

        if(res && res.status === 'OK') {
            setListTrip(res)
        }
    }

    const handleCreateTrip = () => {
        navigation("/admin/manage-trip/create")
    }

    const handleShowUpdate = (trip) => {
        setShowUpdate(true)
        setTrip(trip)
        setTripCompare(trip)
    }

    const handleCloseUpdate = () => {
        setShowUpdate(false)
        // setUserUpdate({})
    }

    const handleUpdateTrip = async () => {
        if(trip !== tripCompare) {
            let newCar
            if(trip?.car !== tripCompare?.car) {
                newCar = trip?.car.split('-')[0]
            }else {
                newCar = trip?.car
            }

            let update = {
                _id: trip?._id,
                time: trip?.time, 
                dayStart: trip?.dayStart, 
                departure: trip?.departure, 
                numberOfBooked: trip?.numberOfBooked, 
                destination: trip?.destination, 
                price: trip?.price,
                car: newCar
            }

            let res = await updateTripAdminService(update)

            if(res && res.status === 'OK') {
                toast.success("Bạn đã cập nhật thành công!")
                handleCloseUpdate()
                setTrip({})
                setTripCompare({})
                getAllTrip()
            }else {
                toast.error("Cập nhật thất bại!")
            }
        }else {
            toast.error("Bạn chưa thay đổi gì!")
        }
    }

    const handleDeleteClose = () => {
        setShowDelete(false)
    }

    const handleDeleteShow = (id) => {
        setShowDelete(true)
        setIdTrip(id)
    }

    const handleDeleteTrip = async () => {
        if(idTrip) {
            let res = await deleteTripAdminService(idTrip)

            if(res && res.status === 'OK')  {
                toast.success("Bạn đã xóa thành công!")
                setIdTrip('')
                handleDeleteClose()
                getAllTrip()
            }else {
                toast.error("Xóa thất bại!")
                setIdTrip('')
                handleDeleteClose()
                getAllTrip()
            }
        }
    }

    return (
        <div className='container-manage-trip'>
            <AdminHeader />
            <div className='content'>
                <SidebarAdmin />
                <div className='right'>
                    <div className='top'>
                        <h3>Chuyến đi</h3>
                        <button className='btn btn-primary col-2 mx-3 my-3'
                            onClick={() => handleCreateTrip()}
                        >+ Thêm mới</button>
                    </div>
                    <div className='data'>
                        {listTrip && listTrip?.data?.length > 0 ?
                            <table className="table-manage-users">
                                <thead>
                                    <tr>
                                        <th>Xe</th>
                                        <th>Điểm bắt đầu</th>
                                        <th>Ngày đi</th>
                                        <th>Số chỗ ngồi</th>
                                        <th>Giá tiền</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listTrip?.data?.map((item, index) => {
                                        return (
                                            <tr key={item?._id}>
                                                <td>{item?.car?.name}</td>
                                                <td>{item?.departure?.value}</td>
                                                <td>{item?.destination?.value}</td>
                                                <td>{item?.car?.numberOfSeats}</td>
                                                <td>{item?.price}</td>
                                                <td>
                                                    <button className="btn btn-primary update"
                                                        // onClick={() => handleDetailCar(item)}
                                                    >Chi tiết</button>
                                                    <button className="btn btn-warning update"
                                                        onClick={() => handleShowUpdate(item)}
                                                    >Sửa</button>
                                                    <button className="btn btn-danger delete"
                                                        onClick={() => handleDeleteShow(item._id)}
                                                    >Xóa</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                            :
                            <div className='loading'>...loading</div>
                        } 
                    </div>
                </div> 
            </div>
            <AdminFooter />

            {/* update */}
            <Modal show={showUpdate} onHide={handleCloseUpdate} >
                <Modal.Header closeButton>
                <Modal.Title>Cập nhật người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="mb-3 col-4">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Ngày khởi hành</label>
                        <ReactDatePicker selected={trip?.dayStart ? Date.parse(trip?.dayStart) : startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="mb-3 col-4">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Điểm bắt đầu</label>
                        <select 
                            value={trip?.departure?.value}
                            onChange={(e) => setTrip({...trip, departure: e.target.value})}
                        >
                            <option value={""}>
                                Chọn nơi đi
                            </option>
                            {props.departures && props.departures.length > 0 
                                && props.departures.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id}>
                                            {item?.value}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3 col-4">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Điểm đến</label>
                        <select 
                            value={trip?.destination?.value}
                            onChange={(e) => setTrip({...trip, destination: e.target.value})}
                        >
                            <option value={""}>
                                Chọn nơi đến
                            </option>
                            {props.destinations && props.destinations.length > 0 
                                && props.destinations.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id}>
                                            {item?.value}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3 col-4">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Thời gian</label>
                        <select 
                            value={trip?.time?.value}
                            onChange={(e) => setTrip({...trip, time: e.target.value})}
                        >
                            <option value={""}>
                                Chọn giờ đi
                            </option>
                            {props.times && props.times.length > 0 
                                && props.times.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id}>
                                            {item?.value}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3 col-4">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Xe</label>
                        <select 
                            selected={trip?.car?.name}
                            onChange={(e) => setTrip({...trip, car: e.target.value})}
                        >
                            <option value={""}>
                                Chọn xe
                            </option>
                            {props.carsStatus && props.carsStatus.length > 0 
                                && props.carsStatus.map((item) => {
                                    return (
                                        <option key={item._id} value={ `${item._id}-${item?.numberOfSeats}`  }>
                                            {item?.name} - {item?.numberOfSeats}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3 col-4">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Giá tiền</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." 
                            value={trip?.price} 
                            onChange={(e) => setTrip({...trip, price: e.target.value})}
                        />
                    </div>
                   
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="warning" 
                    onClick={handleUpdateTrip}
                >
                    Cập nhật
                </Button>
                </Modal.Footer>
            </Modal>

              {/* Modal delete */}
              <Modal show={showDelete} onHide={handleDeleteClose} >
                    <Modal.Header closeButton>
                    <Modal.Title>Xóa người dùng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <span>Bạn có chắc chắn xóa chuyến đi này?</span>                             
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteTrip}>
                        Delete
                    </Button>
                    </Modal.Footer>
            </Modal> 
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        destinations: state.trips.destinations,
        departures: state.trips.departures,
        times: state.trips.times,
        carsStatus: state.cars.carsStatus,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllDestination: () => dispatch(actions.getAllDestination()),
        getAllDeparture: () => dispatch(actions.getAllDeparture()),
        getAllTime: () => dispatch(actions.getAllTime()),
        getCarsStatus: (status) => dispatch(actions.getCarsStatus(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTrip)