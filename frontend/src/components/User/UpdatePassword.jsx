import "./UpdatePassword.css";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Metadata from "../layout/Metadata";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import KeyIcon from '@mui/icons-material/Key';


const UpdatePassword = ({history}) => {
  const dispatch = useDispatch();

  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Password updated successfully");

      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, history, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Change Password"} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="signUpPassword">
                  <KeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e)=> setOldPassword(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e)=> setNewPassword(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
