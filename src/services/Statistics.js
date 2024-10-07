import axios from './CustomizeAxios';

const getAllStatisticAdminService = () => {
  return axios.get(`/statistic/get-all-statistics`);
};

export { getAllStatisticAdminService };
