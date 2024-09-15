import { getAllStatusCarAdminService,  } from "../../services/CarService"
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


