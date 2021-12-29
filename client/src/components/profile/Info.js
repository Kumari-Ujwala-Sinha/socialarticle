import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import { getProfileUser } from "../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
const Info = () => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit]=useState(false)
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    }else{
        dispatch(getProfileUser({users:profile.users,auth, id}))
     const newData=profile.users.filter(user=>user._id === id)
     setUserData(newData)
        
    }
  }, [id, auth, dispatch, profile.users]);
  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar size="super-avatar" src={user.avatar} />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              <button className="btn btn-outline-info" onClick={()=>setOnEdit(true)}>Edit Profile</button>
            </div>
            <div className="follow_btn">
              <span className="mr-4">{user.followers.length} Follower</span>
              <span className="ml-4">{user.following.length} Following</span>
            </div>
            <h6>{user.fullname} {user.mobile}</h6>
            <p className="m-0">{user.address}</p>
            <h6>{user.email}</h6>
            <a href={user.website} target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile user={user} setOnEdit={setOnEdit}/>}
        </div>
        
      ))}
    </div>
  );
};

export default Info;