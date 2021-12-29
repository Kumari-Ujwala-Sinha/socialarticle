import { PROFILETYPES } from "../actions/profileAction";

const initialState={
    loading:false,
    users:[],
    posts:[]
}

const profileReducer=(state=initialState,action)=>{
    switch (action.type){
        case PROFILETYPES.LOADING:
            return {...state, loading:action.payload}
        case PROFILETYPES.GET_USER:
            
                return {...state, users:[...state.users,action.payload.users]}    
        default:
            return state;    
    }
}

export default profileReducer