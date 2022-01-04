import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const {auth, profile} =useSelector(state=>state)
  const dispatch=useDispatch()
  const handleFollow =()=>{
      setFollowed(true)
      dispatch(follow({users:profile.users, auth, user}))
  }

  const handleUnfollow =()=>{
    setFollowed(false)
    dispatch(unfollow({users:profile.users, auth, user}))
}

  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnfollow}>UNFOLLOW</button>
      ) : (
        <button className="btn btn-outline-info" onClick={handleFollow}>FOLLOW</button>
      )}
    </>
  );
};

export default FollowBtn;
