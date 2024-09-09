import { getAllDepartureAdminService, getAllDestinationAdminService, getAllTimeAdminService, searchTripsService } from "../../service/TripService"
import actionTypes from "./actionTypes"


export const getAllDestination = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDestinationAdminService()
            if(res && res.status === 'OK') {
                dispatch(fetchAllDestinationSuccess(res.data))
            }else {
                dispatch(fetchAllDestinationFailed())
            }
        } catch (error) {
            dispatch(fetchAllDestinationFailed())
            console.log('Error get all destination: '. error);
        }
    }
}

export const fetchAllDestinationSuccess = (data) => ({
    type: actionTypes.FETCH_STATUS_DESTINATIONS_SUCCESS,
    data: data
})

export const fetchAllDestinationFailed = () => ({
    type: actionTypes.FETCH_STATUS_DESTINATIONS_FAILED
})

export const getAllDeparture = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDepartureAdminService()
            if(res && res.status === 'OK') {
                dispatch(fetchAllDepartureSuccess(res.data))
            }else {
                dispatch(fetchAllDepartureFailed())
            }
        } catch (error) {
            dispatch(fetchAllDepartureFailed())
            console.log('Error get all departure: '. error);
        }
    }
}

export const fetchAllDepartureSuccess = (data) => ({
    type: actionTypes.FETCH_STATUS_DEPARTURES_SUCCESS,
    data: data
})

export const fetchAllDepartureFailed = () => ({
    type: actionTypes.FETCH_STATUS_DEPARTURES_FAILED
})

export const getAllTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTimeAdminService()
            if(res && res.status === 'OK') {
                dispatch(fetchAllTimeSuccess(res.data))
            }else {
                dispatch(fetchAllTimeFailed())
            }
        } catch (error) {
            dispatch(fetchAllTimeFailed())
            console.log('Error get all time: '. error);
        }
    }
}

export const fetchAllTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_TIME_SUCCESS,
    data: data
})

export const fetchAllTimeFailed = () => ({
    type: actionTypes.FETCH_ALL_TIME_FAILED
})

export const searchTripsAction = (search) => {
    return async (dispatch, getState) => {
        try {
            let res = await searchTripsService(search)
            if(res && res.status === 'OK') {
                dispatch(fetchSeachTripsSuccess(res.data))
            }else {
                dispatch(fetchSeachTripsFailed())
            }
        } catch (error) {
            dispatch(fetchSeachTripsFailed())
            console.log('Error get all time: '. error);
        }
    }
}

export const fetchSeachTripsSuccess = (data) => ({
    type: actionTypes.SEARCH_TRIPS_SUCCESS,
    data: data
})

export const fetchSeachTripsFailed = () => ({
    type: actionTypes.SEARCH_TRIPS_FAILED
})