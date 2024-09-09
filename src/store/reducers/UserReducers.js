import actionTypes from "../actions/actionTypes";

const initState = {
    idUser: '',
    name: '',
    email: '',
    avatar: '',
    access_token: '',
    refresh_token: '',
    isUser: ''
}

const CarReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DETAIL_USER_SUCCESS:
            const {name, email, avatar,refresh_token, access_token, _id, isUser} = action.data
            state.idUser = _id
            state.name = name
            state.email = email
            state.avatar = avatar
            state.access_token = access_token
            state.refresh_token = refresh_token
            state.isUser = isUser
            return {
                ...state
            }
        case actionTypes.FETCH_DETAIL_USER_FAILED:
            state.idUser = ''
            state.name = ''
            state.email = ''
            state.avatar = ''
            state.access_token = ''
            state.refresh_token = ''
            state.isAdmin = ''
            return {
                ...state
            }
        case actionTypes.RESET_USER: 
            state.idUser = ''
            state.name = ''
            state.email = ''
            state.avatar = ''
            state.access_token = ''
            state.refresh_token = ''
            state.isAdmin = ''
            return {
                ...state
            } 
        default:
            return state;
    }
}

export default CarReducers