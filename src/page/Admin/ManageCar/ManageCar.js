import { useState } from 'react'
import AdminFooter from '../../../Component/AdminFooter/AdminFooter'
import AdminHeader from '../../../Component/AdminHeader/AdminHeader'
import SidebarAdmin from '../../../Component/SidebarAdmin/SidebarAdmin'
import { deleteCarAdminService, getAllCarAdminService } from '../../../services/CarService'
import './ManageCar.scss'
import { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Panigation from '../../../Component/Panigation/Panigation'

const ManageCar = () => {
    const [page, setPage] = useState(0)
    const [listCar, setListCar] = useState({})
    const [showDelete, setShowDelete] = useState(false);
    const [idCarDelete, setIdCarDelete] = useState("");

    const navigation = useNavigate()

    useEffect(() => {
        getAllCar()
    }, [page])

    const getAllCar = async () => {
        let res = await getAllCarAdminService(page)

        if(res && res.status === 'OK') {
            setListCar(res)
        }
    }

    const handleCreateCar = () => {
        navigation("/admin/manage-car/create")
    }


    const handleDeleteClose = () => {
        setShowDelete(false)
    }

    const handleDeleteShow = (id) => {
        setShowDelete(true)
        setIdCarDelete(id)
    }

    const handleDeleteCar = async () => {
        if(idCarDelete) {
            const res = await deleteCarAdminService(idCarDelete)

            if(res && res.status === 'OK') {
                toast.success("Bạn đã xóa thành công")
                handleDeleteClose()
                setIdCarDelete("")
                getAllCar()
            }else {
                toast.error("Xóa thất bại")
                handleDeleteClose()
                setIdCarDelete("")
                getAllCar()
            }
        }
    }

    const handleUpdateCar = (car) => {
        navigation("/admin/manage-car/update", {state: car})
    }

    const handleDetailCar = (car) => {
        navigation("/admin/manage-car/detail", {state: car})
    }

    const handlePageClick = (e) => {
        if(e) {
            setPage(e.selected)
        }
    }

    return (
        <div className='container-manage-car'>
            <AdminHeader />
            <div className='content'>
                <SidebarAdmin />
                <div className='right'>
                    <div className='top'>
                        <h3>Quản lý xe</h3>
                        <button className='btn btn-primary'
                            onClick={() => handleCreateCar()}
                        >+ Thêm mới</button>
                    </div>
                    <div className='data'>
                        {listCar && listCar?.data?.length > 0 ?
                            <table className="table-manage-users">
                                <thead>
                                    <tr>
                                        <th>Tên xe</th>
                                        <th>Hình ảnh</th>
                                        <th>Loại xe</th>
                                        <th>Số chỗ ngồi</th>
                                        <th>Màu sắc</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listCar?.data?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td><img src={item.image} width={'100px'} height={"100px"} alt='ảnh xe'/></td>
                                                <td>{item.type}</td>
                                                <td>{item.numberOfSeats}</td>
                                                <td>{item.color}</td>
                                                <td>
                                                    <button className="btn btn-primary update"
                                                        onClick={() => handleDetailCar(item)}
                                                    >Chi tiết</button>
                                                    <button className="btn btn-warning update"
                                                        onClick={() => handleUpdateCar(item)}
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
                    <Panigation 
                        maxPage={listCar?.maxPage > 0 ? listCar?.maxPage : 5}
                        handlePageClick={handlePageClick}
                    />
                </div>
            </div>
            <AdminFooter />
           

            {/* Modal update user */}
            {/* <Modal show={showUpdate} onHide={handleCloseUpdate} >
                <Modal.Header closeButton>
                <Modal.Title>Cập nhật người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                            <input disabled type="email" className="form-control" id="exampleFormControlInput1"
                                value={userUpdate.email} 
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Họ và tên</label>
                            <input  type="text" className="form-control" id="exampleFormControlInput1"
                                value={userUpdate.name} 
                                onChange={(e) => setUserUpdate({...userUpdate, name: e.target.value})}
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Mật khẩu</label>
                            <input  type="password" className="form-control" id="exampleFormControlInput1"
                                value={userUpdate.password} 
                                onChange={(e) => setUserUpdate({...userUpdate, password: e.target.value})}
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Số điện thoại</label>
                            <input  type="text" className="form-control" id="exampleFormControlInput1"
                                value={userUpdate.phone} 
                                onChange={(e) => setUserUpdate({...userUpdate, phone: e.target.value})}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="primary" 
                onClick={handleUpdateUser}
                >
                    Cập nhật
                </Button>
                </Modal.Footer>
            </Modal> */}

                {/* Modal delete user */}
            <Modal show={showDelete} onHide={handleDeleteClose} >
                    <Modal.Header closeButton>
                    <Modal.Title>Xóa Xe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <span>Bạn có chắc chắn xóa chiếc xe này?</span>                             
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCar}>
                        Delete
                    </Button>
                    </Modal.Footer>
            </Modal> 
        </div>
    )
}

export default ManageCar