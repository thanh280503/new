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

const updateUserService = (user) => {
  return axios.post(`/user/update-user-service`, user);
};

const verifyEmailService =  ({email, otp}) => {
  return axios.post(`/user/verify-email`, {email, otp}) 
}


const deleteUserAdminService = (id) => {
  return axios.delete(`/user/delete-user/${id}`);
};

const registerUserService =  (user) => {
  return axios.post(`/user/register-user`, user) 
}

const getDetailUserService = (id, access_token) => {
  return axios.get(`/user/get-detail-user/${id}`
  , 
  {
      headers: {
          token: `Bearer ${access_token}`
      }
  }
  )
}

const getDetailUserClient = (id) => {
  return axios.get(`/user/get-detail-user-client/${id}`
  )
}

const loginUserService =  (user) => {
  return axios.post(`/user/login-user`, user) 
}

const updatePasswordService = (user) => {
  return axios.post(`/user/update-password`, user) 
}

const loginUserSuccess = (id, tokenLogin) => {
  return axios.post(`/auth/login-success`, {id, tokenLogin}) 
}

const logoutUserService =  () => {
  return axios.post(`/user/logout-user`) 
}


export {
  getAllUserAdminService,
  createNewUserAdminService,
  updateUserAdminService,
  deleteUserAdminService,
  registerUserService,
  getDetailUserService,
  updatePasswordService,
  loginUserSuccess,
  logoutUserService,
  loginUserService,
  getDetailUserClient,
  updateUserService,
  verifyEmailService
};
