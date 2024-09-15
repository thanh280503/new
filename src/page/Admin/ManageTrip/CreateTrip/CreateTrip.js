import { useState } from 'react'
import AdminFooter from '../../../../components/AdminFooter/AdminFooter'
import AdminHeader from '../../../../components/AdminHeader/AdminHeader'
import SidebarAdmin from '../../../../components/SidebarAdmin/SidebarAdmin'
import { connect } from "react-redux"
import * as actions from '../../../../store/actions'
import './CreateTrip.scss'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addNewTripAdminService } from '../../../../service/TripService'
import moment from 'moment'

const CreateTrip = (props) => {
    const [newTrip, setNewTrip] = useState({})
    const navigation = useNavigate()
    const [startDate, setStartDate] = useState(new Date());

    const handleBack = () => {
        navigation("/admin/manage-trip")
    }

    const onClickAddNewTrip = async () => {
        let {departure, destination, price, time, car, numberOfAvailable} = newTrip
        if(!startDate || !departure || !destination || !price || !time || !car || !numberOfAvailable) {
            toast.error("Bạn chưa điền đầy đủ thông tin!")
            return
        }

        let currentDate = new Date()
        if(startDate < currentDate) {
            toast.error("Ngày đi phải lớn hơn ngày hôm nay!")
            return
        }

        let dayStart = moment(startDate).format('MM/DD/YYYY');;


        let numberOfBooked = car.split('-')[1]
        let idCar = car.split('-')[0]
        let trip = {
            time , 
            dayStart, 
            numberOfBooked,
            departure, 
            destination, 
            price,
            car: idCar,
            numberOfAvailable
        }

        let res = await addNewTripAdminService(trip)

        if(res && res.status === 'OK') {
            toast.success("Bạn đã thêm mới thành công!")
            setNewTrip({})
        }else {
            toast.error("Thêm thất bại!")
        }
    }

    return (
        <div className='container-create-car'>
            <AdminHeader />
            <div className='content'>
                <SidebarAdmin />
                <div className='right'>
                    <div className='top'>
                        <h3>Thêm chuyến đi</h3>
                        <button className='btn btn-primary col-2 mx-3 my-3'
                            onClick={() => handleBack()}
                        >{"<-- Quay lại"}</button>
                    </div>
                    <div className='bottom'>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Ngày khởi hành</label>
                                <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Điểm bắt đầu</label>
                                <select 
                                    onChange={(e) => setNewTrip({...newTrip, departure: e.target.value})}
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
                                    onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
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
                                    onChange={(e) => setNewTrip({...newTrip, time: e.target.value})}
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
                                    onChange={(e) => setNewTrip({...newTrip, car: e.target.value})}
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
                                    value={newTrip?.price} 
                                    onChange={(e) => setNewTrip({...newTrip, price: e.target.value})}
                                />
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Số chỗ có sẵn:</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." 
                                    value={newTrip?.numberOfAvailable} 
                                    onChange={(e) => setNewTrip({...newTrip, numberOfAvailable: e.target.value})}
                                />
                            </div>
                            <div>
                                <button className='btn btn-primary col-2 my-3'
                                    onClick={() => onClickAddNewTrip()}
                                >+ Thêm mới</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AdminFooter />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip)