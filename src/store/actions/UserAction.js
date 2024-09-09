import { getDetailUserService } from "../../service/UserService"
import actionTypes from "./actionTypes"

export const getDetailUser = (id, token) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailUserService(id, token)
            if(res && res.status === 'OK') {
                let data = {...res.data, access_token: token}
                dispatch(fetchDetailUserSuccess(data))
            }else {
                dispatch(fetchDetailUserFailed())
            }
        } catch (error) {
            dispatch(fetchDetailUserFailed())
            console.log('Error get all users: '. error);
        }
    }
}

export const fetchDetailUserSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_USER_SUCCESS,
    data: data
})

export const resetUser = () => ({
    type: actionTypes.RESET_USER
})

export const fetchDetailUserFailed = () => ({
    type: actionTypes.FETCH_DETAIL_USER_FAILED
})
