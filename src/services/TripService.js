import axios from './CustomizeAxios'

const getAllTripAdminService =  (page) => {
    return axios.get(`/trip/get-all-trip?page=${page}`) 
}

const addNewTripAdminService =  (trip) => {
    return axios.post(`/trip/create-trip`, {trip}) 
}

const updateTripAdminService =  (trip) => {
    return axios.post(`/trip/update-trip`, {trip}) 
}

const updateNumberOfSeatsService =  (id, number) => {
    return axios.post(`/trip/update-number-of-seats`, {id, number}) 
}
//destination
const getAllDestinationAdminService = () => {
    return axios.get('/destination/get-all-destination')
}

const getAllDepartureAdminService = () => {
    return axios.get('/departure/get-all-departure')
}

const getAllTimeAdminService = () => {
    return axios.get('/trip/get-all-time')
}

const deleteTripAdminService = (id) => {
    return axios.delete(`/trip/delete-trip/${id}`)
}

const getAllDepartureService = () => {
    return axios.get(`/departure/get-all-departure`)
}

const searchTripsService = (search) => {
    return axios.get(`/trip/search-trips?departure=${search?.departure}&destination=${search?.destination}&day=${search?.day}`)
}

const getAllPaymentService = () => {
    return axios.get(`/payment/get-all-payment`)
}

export {
    getAllTripAdminService,
    getAllDestinationAdminService,
    getAllDepartureAdminService,
    updateNumberOfSeatsService,
    getAllTimeAdminService,
    addNewTripAdminService,
    updateTripAdminService,
    deleteTripAdminService,
    getAllDepartureService,
    searchTripsService,
    getAllPaymentService
}

