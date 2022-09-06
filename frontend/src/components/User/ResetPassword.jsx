import "./ResetPassword.css";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.ResetPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Password is Successfully Changed")
      history.push("/login");
    }
  }, [error, history, success,dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Reset Password"} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
