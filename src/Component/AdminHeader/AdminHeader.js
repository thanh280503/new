import './AdminHeader.scss'

const AdminHeader = () => {
    return (
        <div className='admin-header-container'>
            <div className='left'>
                <i className="fa-solid fa-car-side"></i>
                <span>Vexe</span>
            </div>
            <div className='right'>
                <span>Hello Admin!</span>
                <i className="fa-solid fa-right-from-bracket"></i>
            </div>
        </div>
    )
}

export default AdminHeader