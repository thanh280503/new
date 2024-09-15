import { useState, useEffect } from 'react'
import AdminFooter from '../AdminFooter/AdminFooter'
import Header from '../Header/Header'
import './Profile.scss'
import * as actions from '../../store/actions'
import { connect } from "react-redux"
import { updatePasswordService, updateUserAdminService } from '../../service/UserService'
import { toast } from 'react-toastify'
import { Button, Modal } from 'react-bootstrap'

const Profile = (props) => {
    const [user, setUser] = useState({})
    const [userCompare, setUserCompare] = useState({})
    const [avatar , setAvatar] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [updatePassword, setUpdatePassword] = useState({})

    useEffect(() => {
      if(props.detailUser) {
        setUser(props.detailUser)
      }
    }, [])

    const handleUpdateUser = async () => {
      if(user !== userCompare) {
        let formData = new FormData()
        Object.keys(user).forEach(key => formData.append(key, user[key]));

        let res = await updateUserAdminService(formData)

        if(res && res.status === 'OK') {
          toast.success("Bạn đã cập nhật thành công!")
        }else {
          toast.error("Cập nhật thất bại!")
        }
      }
    }
    
    const convertToBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader()
  
      reader.readAsDataURL(file)
      reader.onload = () => {
        if(reader.result) {
          resolve(reader.result)
        }
      }
      reader.onerror = reject;
    }
  )

    const handleOnchangeAvater = async (e) => {
      setUser({...user, avatar: e.target.files[0]})
      let base64 =  await convertToBase64(e.target.files[0])
      if(base64) {
          setAvatar(base64)
      }
    }

  const handleShowModal = (productId) => {
      // setIdConfirmProduct(productId)
      setShowModal(true)
  }
  
  const handleCloseConfirm = () => {
      setShowModal(false)
  };

  const handleUpdatePassword = async () => {
    let {idUser} = user
    let {currentPassword, newPassword, confirmPassword} = updatePassword
    if(newPassword !== confirmPassword) {
        toast.error("Mật khẩu không trùng khớp!")
        return
    }
    
    let update = {
        id: idUser,
        currentPassword,
        newPassword
    }

    let res = await updatePasswordService(update)

    if(res && res.status === 'OK') {
        toast.success("Cập nhật mật khẩu thành công!")
        handleCloseConfirm()
        setUpdatePassword({})
    }
  }

    return (
        <div>
          <Header />
            <div className='profile-content'>
              <div className='container'>
                <div className='heading'>
                  <h4 className='my-3'>Chỉnh sửa thông tin</h4>
                </div>
                <div className='form'>
                <div className="row content-list">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6 item">
                                    <label>Email</label>
                                    <input placeholder="Email" disabled
                                        value={user?.email ? user?.email : ""} 
                                    />
                                </div>
                                <div className="col-6 item">
                                    <label>Họ và tên</label>
                                    <input placeholder="Họ và tên"
                                        value={user?.name ? user?.name : ""} 
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 item">
                                    <label>Số điện thoại</label>
                                    <input placeholder="Số điện thoại"
                                        value={user?.phone ? user?.phone : ""} 
                                        onChange={(e) => setUser({...user, phone: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 item">
                                    <label>Địa chỉ</label>
                                    <input placeholder="Địa chỉ"
                                      value={user?.address ? user?.address : ""} 
                                      onChange={(e) => setUser({...user, address: e.target.value})}
                                    />
                                </div>
                                <div className="submit">
                                    <button className="btn btn-warning"
                                        onClick={() => handleUpdateUser()}
                                    >Cập nhật</button>
                                    <button className="btn btn-primary"
                                        onClick={() => handleShowModal()}
                                    >Thay đổi mật khẩu</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 avatar">
                            {!avatar 
                                ? 
                                <div className="avatar-content">
                                    <i className="avatar-icon fa-solid fa-user"></i>
                                    <input id="avatar" hidden type="file"
                                      onChange={(e) => handleOnchangeAvater(e)}
                                     />
                                    <label htmlFor="avatar">Chọn ảnh</label>
                                </div>
                                :
                                <div className="avatar-content">
                                    <img className="image-avatar" 
                                    src={avatar} 
                                    alt="Ảnh đại diện"/>
                                    <input id="avatar" hidden type="file" 
                                      onChange={(e) => handleOnchangeAvater(e)}
                                    />
                                    <label htmlFor="avatar">Chọn ảnh</label>
                                </div>
                            }
                        </div>
                    </div>
                </div>
              </div>
            </div>
          <AdminFooter />
          <Modal show={showModal} onHide={handleCloseConfirm} dialogClassName="modal-update-password">
                <Modal.Header closeButton>
                <Modal.Title>Cập nhật mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row list">
                        <div className="col-12 item">
                            <label>Nhập lại mật khẩu</label>
                            <input type="password" placeholder="..." 
                                value={updatePassword.currentPassword}
                                onChange={(e) => setUpdatePassword({...updatePassword, currentPassword: e.target.value})}
                            />
                        </div>
                        <div className="col-12 item">
                            <label>Mật khẩu mới</label>
                            <input type="password" placeholder="..."
                                value={updatePassword.newPassword}
                                onChange={(e) => setUpdatePassword({...updatePassword, newPassword: e.target.value})}
                            />
                        </div>
                        <div className="col-12 item">
                            <label>Xác nhận mật khẩu</label>
                            <input type="password" placeholder="..."
                                value={updatePassword.confirmPassword}
                                onChange={(e) => setUpdatePassword({...updatePassword, confirmPassword: e.target.value})}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirm}>
                    Close
                </Button>
                <Button variant="warning" 
                onClick={handleUpdatePassword}
                >
                    Xác nhận
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function mapStateToProps (state) {
  return  {
      detailUser: state.users
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)