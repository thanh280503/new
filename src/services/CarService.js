import axios from './CustomizeAxios';

const getAllCarAdminService = (page) => {
  return axios.get(`/car/get-all-car?page=${page}`);
};

const getCarsStatusAdminService = (status) => {
  return axios.get(`/car/get-cars-status?status=${status}`);
};

const createNewCarAdminService = (car) => {
  return axios.post(`/car/create-car`, car);
};

const updateCarAdminService = (car) => {
  return axios.post(`/car/update-car`, car);
};

const deleteCarAdminService = (id) => {
  return axios.delete(`/car/delete-car/${id}`);
};

const getAllStatusCarAdminService = () => {
  return axios.get(`/car/get-all-status-car`);
};

export {
  getAllCarAdminService,
  createNewCarAdminService,
  updateCarAdminService,
  deleteCarAdminService,
  getAllStatusCarAdminService,
  getCarsStatusAdminService,
};
