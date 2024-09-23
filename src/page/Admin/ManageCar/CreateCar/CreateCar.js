import { useState } from 'react'
import AdminFooter from '../../../../components/AdminFooter/AdminFooter'
import AdminHeader from '../../../../components/AdminHeader/AdminHeader'
import SidebarAdmin from '../../../../components/SidebarAdmin/SidebarAdmin'
import { connect } from "react-redux"
import * as actions from '../../../../store/actions'
import './CreateCar.scss'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { createNewCarAdminService } from '../../../../service/CarService'
import { useNavigate } from 'react-router-dom'

const CreateCar = (props) => {
    const [newCar, setNewCar] = useState({})
    const navigation = useNavigate()

    useEffect(() => {
        getStatusCars()
    }, [])

    const getStatusCars = async () => {
        await props.getAllStatusCar()
    }

    const onChangeSelectStatus = (e) => {
        setNewCar({...newCar, status: e.target.value})
    }

    const onClickAddNewCar = async () => {
        let {name, type, numberOfSeats, color, yearOfManufacture, licensePlate, image, note, status} = newCar

        if(!name || !type || !numberOfSeats || !color || !licensePlate || !image || !status) {
            toast.error("Bạn chưa điền đầy đủ thông tin!")
            return
        }

        let formData = new FormData()
        Object.keys(newCar).forEach(key => formData.append(key, newCar[key]));

        const res = await createNewCarAdminService(formData)

        if(res && res.status === 'OK') {
            toast.success("Tạo mới xe thành công")
            setNewCar({})
            // navigation("/admin/manage-car")
        }else {
            toast.error("Tạo xe thất bại")
        }
    }

    const handleBack = () => {
        navigation("/admin/manage-car")
    }
    
    return (
        <div className='container-create-car'>
            <AdminHeader />
            <div className='content'>
                <SidebarAdmin />

                <div className='right'>
                    <div className='top'>
                        <h3>Thêm xe</h3>
                        <button className='btn btn-primary col-2 mx-3 my-3'
                            onClick={() => handleBack()}
                        >{"<-- Quay lại"}</button>
                    </div>
                    <div className='bottom'>
                        <div className="row">
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Tên xe</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..."
                                        value={newCar?.name} 
                                        onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Loại xe</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." 
                                        value={newCar?.type} 
                                        onChange={(e) => setNewCar({...newCar, type: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Số chỗ ngồi</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." 
                                        value={newCar?.numberOfSeats} 
                                        onChange={(e) => setNewCar({...newCar, numberOfSeats: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Màu sắc</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." 
                                        value={newCar?.color} 
                                        onChange={(e) => setNewCar({...newCar, color: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Năm sản xuất</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." 
                                        value={newCar?.yearOfManufacture} 
                                        onChange={(e) => setNewCar({...newCar, yearOfManufacture: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Biển số xe</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="..." 
                                        value={newCar?.licensePlate} 
                                        onChange={(e) => setNewCar({...newCar, licensePlate: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3 col-4 status">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Trạng thái</label>
                                    <select onChange={(e) => onChangeSelectStatus(e)}>
                                        <option value={""}>
                                            Chọn trạng thái
                                        </option>
                                        {props.statusCar && props.statusCar.length > 0 
                                            && props.statusCar.map((item) => {
                                                return (
                                                    <option key={item._id} value={item._id}>
                                                        {item.value}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Hình ảnh</label>
                                    <input type="file" className="form-control" id="exampleFormControlInput1" placeholder="..."
                                        onChange={(e) => setNewCar({...newCar, image: e.target.files[0]})}
                                    />
                                    {newCar?.image && 
                                        <img src={newCar?.image} width={"100px"} height={"100px"}/>
                                    }       
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Ghi chú</label>
                                    <textarea name="Text1"  rows="4" style={{width: "100%"}}
                                        onChange={(e) => setNewCar({...newCar, note: e.target.value})}
                                    ></textarea>
                                </div>
                                <button className='btn btn-primary col-2 mx-3 my-3'
                                    onClick={() => onClickAddNewCar()}
                                >+ Thêm mới</button>
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
        statusCar: state.cars.statusCars
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllStatusCar: () => dispatch(actions.getAllStatusCar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCar)