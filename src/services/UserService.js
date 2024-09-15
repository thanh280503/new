import axios from './CustomizeAxios';

const axiosJwt = axios.create();

const getAllUserAdminService = (page) => {
  return axios.get(`/user/get-all-user?page=${page}`);
};

const createNewUserAdminService = (user) => {
  return axios.post(`/user/create-user`, user);
};

const updateUserAdminService = (user) => {
  return axios.post(`/user/update-user`, user);
};

const deleteUserAdminService = (id) => {
  return axios.delete(`/user/delete-user/${id}`);
};

export {
  getAllUserAdminService,
  createNewUserAdminService,
  updateUserAdminService,
  deleteUserAdminService,
};
