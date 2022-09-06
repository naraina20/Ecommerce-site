import { Button } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "./newProduct.css";
import { clearErrors, getUserDetails, updateUser } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MailIcon from "@mui/icons-material/Mail";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "../layout/Loader/Loader";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      return alert(updateError);
    }

    if (isUpdated) {
      alert("User updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, history,user, isUpdated, updateError, userId]);

  return (
    <Fragment>
      <Metadata title="Update User --Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Category</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateUser;
