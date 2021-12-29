import { postDataApi } from "../../utils/fetchData";

import { GLOBALTYPES } from "./globalTypes";
import valid from "../../utils/valid";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataApi("login", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });
    localStorage.setItem("firstlogin", true);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

export const refreshtoken = () => async (dispatch) => {
    const firstlogin = localStorage.getItem("firstlogin")
    if(firstlogin){
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      
  
      const res = await postDataApi("refresh_token");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { token: res.data.access_token, user: res.data.user },
      });
      
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}
  };

export const register =(data)=>async (dispatch)=>{
  const check= valid(data)
  if(check.errLength > 0)
  return dispatch({type:GLOBALTYPES.ALERT, payload:check.errMsg})
  try{
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataApi('register',data)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });
    localStorage.setItem("firstlogin", true);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })

  }catch(err){
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }
}

export const logout=() => async (dispatch) => {
  const firstlogin = localStorage.getItem("firstlogin")
    if(firstlogin){
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
  try{
     await postDataApi("logout");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {},
      });
      localStorage.removeItem("firstlogin")
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });

  }catch(err){
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }}
}