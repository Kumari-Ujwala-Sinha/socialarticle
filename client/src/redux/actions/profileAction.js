import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const PROFILETYPES = {
  LOADING: "LOADING",
  GET_USER: "USER",
};

export const getProfileUser =
  ({ users, auth, id }) =>
  async (dispatch) => {
    if (users.every(user => user._id !== id)) {
      try {
        dispatch({ type: PROFILETYPES.LOADING, payload: true });
        const res = await getDataApi(`/user/${id}`, auth.token);
        
        dispatch({ type: PROFILETYPES.GET_USER, payload: res.data });
        dispatch({ type: PROFILETYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };
