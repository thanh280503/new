import React, { useEffect } from 'react'
import { useState } from 'react'
import { connect } from "react-redux"
import * as actions from '../../store/actions'
import ReactDatePicker from 'react-datepicker';
import './Search.scss'
import { toast } from 'react-toastify';
import { searchTripsService } from '../../services/TripService';
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Search = (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [search, setSearch] = useState({})
    const navigation = useNavigate()

    useEffect(() => {
        props.getAllDestination()
        props.getAllDeparture()
    }, [])

    const handleSearchTrips = async () => {
        if(!search?.departure) {
            toast.error("Bạn chưa nhập điểm đi!")
            return
        }

        if(!search?.destination) {
            toast.error("Bạn chưa nhập điểm đến!")
            return
        }
        let dayStart = moment(startDate).format('MM/DD/YYYY');;
        let currentSearch = {
            ...search, day: dayStart
        }

        await props.searchTrips(currentSearch)
        if(window.location.pathname !== "/trips") {
            navigation('/trips',  { state: currentSearch })
        }
    }

    return (
        <div className='search'>
            <div className='top'>
                <div className='item active'>
                    <i className="fa-solid fa-car"></i>
                    <span>Xe khách</span>
                </div>
                <div className='item'>
                    <i className="fa-solid fa-car-rear"></i>
                        <NavLink to={'/rental-car'} style={{color: 'black', textDecoration: 'none'}}>
                            <span>Thuê xe</span>
                        </NavLink>
                </div>
            </div>
            <div className='bottom'>
                <div className='bottom-content'>
                    <div className='departure'>
                        <div>
                            <img src='https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/pickup_vex_blue_24dp.svg'/>
                        </div>
                        <div className='item'>
                            <span>Nơi xuất phát</span>
                            <select style={{width: '180px'}}
                                value={props?.departures?.value}
                                onChange={(e) => setSearch({...search, departure: e.target.value})}
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
                    </div>
                    <div className='destination'>
                        <div>
                            <img src='https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/pickup_negative_24dp.svg'/>
                        </div>
                        <div className='item'>
                            <span>Nơi đến</span>
                            <select style={{width: '180px'}}
                                value={props?.destinations?.value}
                                onChange={(e) => setSearch({...search, destination: e.target.value})}
                            >
                                <option value={""}>
                                    Chọn nơi đi
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
                    </div>
                    <div className='date'>
                        <div>
                            <i className="fa-regular fa-calendar"></i>
                        </div>
                        <div className='item'>
                            <span>Ngày đi</span>
                            <ReactDatePicker
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                            />
                        </div>
                    </div>
                </div>
                <button className='btn btn-warning'
                    onClick={() => handleSearchTrips()}
                >Tìm chuyến</button>
            </div>
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        destinations: state.trips.destinations,
        departures: state.trips.departures,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllDestination: () => dispatch(actions.getAllDestination()),
        getAllDeparture: () => dispatch(actions.getAllDeparture()),
        searchTrips: (search) => dispatch(actions.searchTripsAction(search)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)