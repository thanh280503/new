import axios from './CustomizeAxios';

const getAllStatisticAdminService = () => {
  return axios.get(`/statistics/get-all-statistics`);
};

export { getAllStatisticAdminService };
