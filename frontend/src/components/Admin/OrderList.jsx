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
import { deleteOrder, getAllOrders } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import { clearErrors } from "../../actions/orderAction";


const OrderList = ({history}) => {
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.order
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert("order deleted successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, isDeleted, history, deleteError]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  return (
    <Fragment>
      <Metadata title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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


export default OrderList
