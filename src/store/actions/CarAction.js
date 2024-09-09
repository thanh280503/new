import { getAllStatusCarAdminService, getCarsStatusAdminService } from "../../service/CarService"
import actionTypes from "./actionTypes"


export const getAllStatusCar = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllStatusCarAdminService()
            if(res && res.status === 'OK') {
                dispatch(fetchAllStatusCarSuccess(res.data))
            }else {
                dispatch(fetchStatusCarFailed())
            }
        } catch (error) {
            dispatch(fetchStatusCarFailed())
            console.log('Error get all users: '. error);
        }
    }
}

export const fetchAllStatusCarSuccess = (data) => ({
    type: actionTypes.FETCH_STATUS_CARS_SUCCESS,
    data: data
})

export const fetchStatusCarFailed = () => ({
    type: actionTypes.FETCH_STATUS_CARS_FAILED
})


export const getCarsStatus = (status) => {
    return async (dispatch, getState) => {
        try {
            let res = await getCarsStatusAdminService(status)
            if(res && res.status === 'OK') {
                dispatch(fetchCarsStatusCarSuccess(res.data))
            }else {
                dispatch(fetcCarsStatusCarFailed())
            }
        } catch (error) {
            dispatch(fetcCarsStatusCarFailed())
            console.log('Error get all users: '. error);
        }
    }
}

export const fetchCarsStatusCarSuccess = (data) => ({
    type: actionTypes.FETCH_CARS_STATUS_SUCCESS,
    data: data
})

export const fetcCarsStatusCarFailed = () => ({
    type: actionTypes.FETCH_CARS_STATUS_FAILED
})
