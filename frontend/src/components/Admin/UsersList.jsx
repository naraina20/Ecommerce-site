import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import React, { Fragment, useEffect } from "react";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.profile
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      return alert(deleteError);
    }

    if (isDeleted) {
      alert("User deleted successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, history]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });

  return (
    <Fragment>
      <Metadata title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
