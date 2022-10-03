import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const Cart = ({history}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQnt = quantity + 1;

    if (stock <= quantity) return;

    dispatch(addItemToCart(id, newQnt));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQnt = quantity - 1;

    if (1 >= quantity) return;

    dispatch(addItemToCart(id, newQnt));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in your Cart</Typography>
          <Link to={"/products"}>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
              </div>
              

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,0
                )}`}</p>
              </div>

              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
