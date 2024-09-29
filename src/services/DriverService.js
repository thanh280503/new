import axios from './CustomizeAxios';

const getAllDriverAdminService = (page) => {
  return axios.get(`/driver/get-all-driver?page=${page}`);
};

const createDriverAdminService = (driver) => {
  return axios.post(`/driver/create-driver`, driver);
};

const updateDriverAdminService = (id, driver, fileImage) => {
  return axios.post(`/driver/update-driver/${id}`, driver, fileImage);
};

const deleteDriverAdminService = (id) => {
  return axios.delete(`/driver/delete-driver/${id}`);
};

export {
  getAllDriverAdminService,
  createDriverAdminService,
  updateDriverAdminService,
  deleteDriverAdminService,
};
