import actionTypes from "../actions/actionTypes";

const initState = {
    destinations: [],
    departures: [],
    times: [],
    searchTrips: []
}

const TripReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STATUS_DESTINATIONS_SUCCESS:
            state.destinations = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_STATUS_DESTINATIONS_FAILED:
            state.destinations = []
            return {
                ...state
            }
        case actionTypes.FETCH_STATUS_DEPARTURES_SUCCESS:
            state.departures = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_STATUS_DEPARTURES_FAILED:
            state.departures = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_TIME_SUCCESS:
            state.times = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_TIME_FAILED:
            state.times = []
            return {
                ...state
            }
        case actionTypes.SEARCH_TRIPS_SUCCESS:
            state.searchTrips = action.data
            return {
                ...state
            }
        case actionTypes.SEARCH_TRIPS_FAILED:
            state.searchTrips = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default TripReducers