import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

const EditProfile = ({  setOnEdit }) => {
  const initState = {
    fullname: "",
    gender: "",
    address: "",
    website: "",
    story: "",
    mobile: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, address, website, story, mobile, gender } = userData;
  const [avatar, setAvatar] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch =useDispatch()
  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file)
    if(err) return dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})
    setAvatar(file);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit= e =>{
    e.preventDefault()
    dispatch(updateProfileUser({userData, avatar, auth}))

  }
  useEffect(() => {
    setUserData(auth.user)
  }, [auth.user])
  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn-close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
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
              type="text"
            />
            <small
              className="position-absolute text-danger"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No.</label>
          <div>
            <input
              name="mobile"
              id="mobile"
              value={mobile}
              onChange={handleInput}
              className="form-control"
              type="Number"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <div>
            <input
              name="address"
              id="address"
              value={address}
              onChange={handleInput}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <div>
            <input
              name="website"
              id="website"
              value={website}
              onChange={handleInput}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="story">Story</label>
          <div className="">
            <textarea
              name="story"
              id="story"
              value={story}
              onChange={handleInput}
              className="form-control"
              
              col="6"
              row="4"
            />
            <small className="d-block text-right text-danger">
              {story ? story.length : 0}/200
            </small>
          </div>
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend mb-4 px-0">
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={handleInput}
            className="custom-select text-capitalize"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="w-100 btn btn-info" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
