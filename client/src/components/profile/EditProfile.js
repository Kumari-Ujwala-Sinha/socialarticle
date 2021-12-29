import { handleInput } from "concurrently/src/defaults";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = ({ user, setOnEdit }) => {
  const initState = {
    fullname: "",
    gender: "",
    address: "",
    website: "",
    story: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, gender, address, website, story } = userData;
  const [avatar, setAvatar] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const changeAvatar = () => {};
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn-close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <div className="info_avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          alt="avatar"
        />
        <span>
          <i className="fas fa-camera" />
          <p>change</p>
          <input
            type="file"
            name="file"
            id="file-up"
            onChange={changeAvatar}
            accept="image/*"
          />
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="fullname">Full Name</label>
        <div className="position-relative">
          <input
           name="fullname"
            id="fullname"
            value={fullname}
            onChange={handleInput}
            className="form-control"
          />
          <small className="position-absolute text-danger" style={{top:"50%", right:"5px", transform:"translateY(-50%)"}}>
              {fullname.length}/25
          </small>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
