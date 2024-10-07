import './Statistics.scss'
import AdminHeader from '../../../Component/AdminHeader/AdminHeader'
import FooterAdmin from '../../../Component/AdminFooter/AdminFooter'
import SidebarAdmin from '../../../Component/SidebarAdmin/SidebarAdmin'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { useEffect, useState } from 'react'
import { getAllStatisticAdminService } from '../../../services/Statistics'
Chart.register(CategoryScale);

const Statistics = () => {
    const [information, setInformation] = useState({})

    useEffect(() => {
        getAllInformation()
    })

    const getAllInformation = async () => {
        let res = await getAllStatisticAdminService()
        if(res && res.status === 'OK') {
            setInformation(res)
        }
    }
  return (
    <div className='container-stactistics'>
        <AdminHeader />
        <div className='content'>
            <SidebarAdmin />
            <div className='content-right'>
                <h3>Thống kê</h3>
                <div className='top'>
                    <div className='item'>
                        <div className='left'>
                            <i className="order fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className='right'>
                            <span className='title'>Khách hàng</span>
                            <span className='quanlity'>{information?.countUser}</span>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='left'>
                            <i className="inventory fa-solid fa-bag-shopping"></i>
                        </div>
                        <div className='right'>
                            <span className='title'>Xe</span>
                            <span className='quanlity'>{information?.countCar}</span>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='left'>
                            <i className="user fa-regular fa-user"></i>
                        </div>
                        <div className='right'>
                            <span className='title'>Chuyến đi</span>
                            <span className='quanlity'>{information?.countTrip}</span>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='left'>
                            <i className="renvenue fa-solid fa-dollar-sign"></i>
                        </div>
                        <div className='right'>
                            <span className='title'>Doanh thu</span>
                            <span className='quanlity'>22</span>
                        </div>
                    </div>
                </div>
                <div className='center'>
                    <Bar
                        data={{
                            labels:['Tháng 1', 'Tháng 2', 'Tháng 3'],
                            datasets:[{
                                label: 'Doanh thu',
                                data: [100, 200, 300],
                                backgroundColor: 'red',
                                barThickness: 60
                            }],
                        }}
                        options={{
                            scales: {
                                x: {
                                    scaleLabel: {
                                        labelString: 'Months',
                                        display: true
                                    }
                                },
                                y: {
                                    scaleLabel: {
                                        labelString: 'Revenue',
                                        display: true
                                    },
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        }}
                    >
                    </Bar>
                </div>
            </div>
        </div>
        <FooterAdmin />
    </div>
  )
}

export default Statistics