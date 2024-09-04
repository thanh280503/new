import './SidebarAdmin.scss'
import {
    NavLink
  } from "react-router-dom";

const AdminFooter = () => {
    return (
        <div className='side-bar'>
            <ul className='list'>
                <li className='item'>
                    <NavLink to="/admin">
                        <i className="fa-solid fa-house"></i>
                        <span>Quy định</span>
                    </NavLink>
                </li>
                <li className='item' activeClassName="active">
                    <NavLink to="/admin/manage-user">
                        <i className="fa-regular fa-user"></i>
                        <span>Người dùng</span>
                    </NavLink>
                </li>
                <li className='item'>
                    <NavLink to="/admin/manage-staff" activeClassName="active">
                        <i className="fa-solid fa-user"></i>
                        <span>Nhân viên</span>
                    </NavLink>
                </li>
                <li className='item'>
                    <NavLink to="/admin/manage-car" activeClassName="active">
                        <i className="fa-solid fa-car"></i>
                        <span>Xe</span>
                    </NavLink>
                </li>
                <li className='item'>
                    <NavLink to="/admin/manage-trip">
                        <i className="fa-solid fa-car"></i>
                        <span>Chuyến xe</span>
                    </NavLink>
                </li>
                <li className='item'>
                    <NavLink to="/admin/manage-ticket">
                        <i className="fa-solid fa-bag-shopping"></i>
                        <span>Vé xe</span>
                    </NavLink>
                </li>
                <li className='item'>
                    <NavLink to="/admin/statistics">
                        <i className="fa-solid fa-dollar-sign"></i>
                        <span>Thống kê</span>
                    </NavLink>
                    
                </li>
            </ul>
        </div>
    )
}

export default AdminFooter