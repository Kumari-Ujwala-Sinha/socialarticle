
import { getDataApi, patchDataApi } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
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

  export const updateProfileUser =({userData, avatar, auth})=>async(dispatch)=>{
    if(!userData.fullname) return dispatch({type:GLOBALTYPES.ALERT,payload:{error:"Enter full name"}})
    if(userData.fullname.length>25) return dispatch({type:GLOBALTYPES.ALERT,payload:{error:"Full name must be less than 25 character"}})
    if(userData.story && userData.story.length>200) return dispatch({type:GLOBALTYPES.ALERT,payload:{error:"Story must be less than 200 character"}})
    try{
      let media;
      dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
      if(avatar) media =await imageUpload([avatar]) 
      const res =await patchDataApi("user",{...userData,
        avatar: avatar ? media[0].url : auth.user.avatar}, auth.token)
      
        dispatch({type:GLOBALTYPES.AUTH,payload:{
          ...auth,user:{
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
          }
       
        }})
      
      dispatch({type:GLOBALTYPES.ALERT,payload:{success:res.data.msg}})
    }catch(err){
      dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})
    }
  }

  export const follow =({users, auth, user}) =>async(dispatch)=>{
   console.log({users, auth, user})
   let newUser = {...user, followers:[...user.followers, auth.user]}
   console.log(newUser)
  }

  export const unfollow =({users, auth, user}) =>async(dispatch)=>{
    
  }  