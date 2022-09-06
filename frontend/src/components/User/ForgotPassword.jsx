import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm))
  };

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch(clearErrors())
    }

    if (message) {
      alert(message);
    }
  }, [dispatch, error, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Forgot Password"} />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="loginEmail">
                  <MailOutlineOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
