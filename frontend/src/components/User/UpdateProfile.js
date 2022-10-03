import "./UpdateProfile.css";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Metadata from "../layout/Metadata";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  

  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvartarPreview] = useState();

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvartarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvartarPreview(user.avatar.url);
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("user updated successfully");

      dispatch(loadUser());
      
      history.push("/account");

      dispatch({type: UPDATE_PROFILE_RESET})

    }
  }, [dispatch, error, history,user, isUpdated ]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Update Profile"} />
          <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
              <h2 className="UpdateProfileHeading">Update Profile</h2>
              <form
                className="UpdateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="UpdateProfileName">
                  <TagFacesOutlinedIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="UpdateProfileEmail">
                  <MailOutlineOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="UpdateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="UpdateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
