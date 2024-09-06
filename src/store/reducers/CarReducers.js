import actionTypes from "../actions/actionTypes";

const initState = {
    statusCars: [],
    carsStatus: []
}

const CarReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STATUS_CARS_SUCCESS:
            const data = action.data
            state.statusCars = data
            return {
                ...state
            }
        case actionTypes.FETCH_STATUS_CARS_FAILED:
            state.statusCars = []
            return {
                ...state
            }
        case actionTypes.FETCH_CARS_STATUS_SUCCESS:
            state.carsStatus = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_CARS_STATUS_FAILED:
            state.carsStatus = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default CarReducers