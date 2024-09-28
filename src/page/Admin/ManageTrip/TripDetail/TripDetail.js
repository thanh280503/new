import './TripDetail.scss'
import AdminFooter from '../../../../Component/AdminFooter/AdminFooter'
import AdminHeader from '../../../../Component/AdminHeader/AdminHeader'
import SidebarAdmin from '../../../../Component/SidebarAdmin/SidebarAdmin'
import { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TripDetail = (props) => {
    const [trip, setTrip] = useState()

    const location = useLocation()
    const navigation = useNavigate()
    
    useEffect(() => {
        setTrip(location?.state)
    }, [])

    const handleBack = () => {
        navigation("/admin/manage-trip")
    }

    console.log("trip: ", trip);
    return (
        <div className='container-update-car'>
            <AdminHeader />
            <div className='content'>
                <SidebarAdmin />
                <div className='right'>
                    <div className='top'>
                        <h3>Thông tin chi tiết</h3>
                        <button className='btn btn-primary col-2 mx-3 my-3'
                            onClick={() => handleBack()}
                        >{"<-- Quay lại"}</button>
                    </div>
                    <div className='bottom'>
                        <div className="row contain">
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Loại xe: </label>
                                    <span className='item-value'>{trip?.car?.name}</span>
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Ngày khởi hành: </label>
                                    <span className='item-value'>{trip?.dayStart}</span>
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Giờ đi: </label>
                                    <span className='item-value'>{trip?.time?.value}</span>
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Điểm đi - Điểm đến: </label>
                                    <span className='item-value'>{trip?.departure?.value} - {trip?.destination?.value}</span>
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Số lượng vé có sẵn: </label>
                                    <span className='item-value'>{trip?.numberOfAvailable}</span>
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Số lượng vé đã đặt: </label>
                                    <span className='item-value'>{trip?.numberOfBooked}</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </div>
    )
}


export default TripDetail