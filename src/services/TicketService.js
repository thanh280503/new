import axios from './CustomizeAxios'

const createTicketService =  (ticket) => {
    return axios.post(`/ticket/create-ticket`, ticket) 
}

const getAllTicketUserService =  (id) => {
    return axios.get(`/ticket/get-all-ticket-from-user/${id}`) 
}

const deleteTicketUserService =  (id) => {
    return axios.delete(`/ticket/delete-ticket/${id}`) 
}

const updateTicketUserService =  (ticket) => {
    return axios.post(`/ticket/update-ticket/`, ticket) 
}

export {
    createTicketService,
    getAllTicketUserService,
    deleteTicketUserService,
    updateTicketUserService
}