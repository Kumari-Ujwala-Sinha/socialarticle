import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataApi } from "../../utils/fetchData";
import UserCard from "../UserCard";
import Loadicon from "../../images/loading.gif"
const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers]=useState([])
  const [load, setLoad] =useState(false)
  const dispatch=useDispatch()
  const {auth} =useSelector(state=>state)
  

  const handleClose =()=>{
      setSearch("")
      setUsers([])
  }
  const handleSearch=async(e)=>{
      e.preventDefault()
        if(!search) return;
        try{
            setLoad(true)
            const res = await getDataApi(`/search?username=${search}`,auth.token)
       
            setUsers(res.data.user)
            setLoad(false)
        }catch(err){
            dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
        }
        
  }
  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        value={search}
        name="search"
        type="text"
        id="search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />
      <button type="submit" style={{display:"none"}}>Search</button>
      
      {load && <img src={Loadicon} alt="loading" className="loading"/>}

      <div className="search-icon" style={{opacity: `${search ? '0' :'0.5'}` }}>
        <span className="material-icons">search</span>
        <span>Search</span>
      </div>
      <div className="close-search" style={{opacity:users.length > 0 ? 1 : 0}} onClick={handleClose}>&times;</div>
      <div className="users" style={{transform:"translateY(-3px)"}}>
         {search && users.map(user=>(
             
                 <UserCard user={user} key={user._id} border="border" handleClose={handleClose}/>
             
         ))}
      </div>
    </form>
  );
};

export default Search;
