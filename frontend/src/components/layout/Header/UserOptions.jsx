import React, { Fragment, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useHistory } from "react-router-dom";
import { logOut } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <AccountBoxIcon />, name: "Profile", func: profile },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <LogoutIcon />, name: "Logout", func: logOutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function orders() {
    history.push("/orders");
  }
  function profile() {
    history.push("/account");
  }
  function dashboard() {
    history.push("/admin/dashboard");
  }
  function cart() {
    history.push("/cart");
  }
  function logOutUser() {
    dispatch(logOut());
    alert("logout successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "0" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="speedDial"
        style={{ zIndex: "11" }}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="icon"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth<=600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
