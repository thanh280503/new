import actionTypes from '../actions/actionTypes';

const initState = {
  idUser: '',
  name: '',
  email: '',
  avatar: '',
  access_token: '',
  refresh_token: '',
  isUser: '',
};

const UserReducers = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DETAIL_USER_SUCCESS:
      const { name, email, avatar, refresh_token, access_token, _id, isUser } = action.data;
      return {
        ...state,
        idUser: _id,
        name,
        email,
        avatar,
        access_token,
        refresh_token,
        isUser,
      };
    case actionTypes.FETCH_DETAIL_USER_FAILED:
    case actionTypes.RESET_USER:
      return {
        ...initState, // Đặt lại trạng thái về mặc định
      };
    default:
      return state;
  }
};

export default UserReducers;
