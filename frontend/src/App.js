import axios from "axios";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./components/layout/Navbar/Navbar";
import UserOptions from "./components/layout/Header/UserOptions";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/search/Search.jsx";
import webFont from "webfontloader";
import LoginSignup from "./components/User/LoginSignup";
import Profile from "./components/User/Profile";
import store from "./store";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import ShippingInfo from "./components/Cart/ShippingInfo";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductsList from "./components/Admin/ProductsList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Category from "./components/Admin/Category";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound";
import ScrollToTop from "./ScrollToTop";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <UserOptions user={user} />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />

        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/shipping" component={ShippingInfo} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/products"
          component={ProductsList}
        />
        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/newproduct"
          component={NewProduct}
        />
        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/category"
          component={Category}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/product/:id"
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/orders"
          component={OrderList}
        />

        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/users"
          component={UsersList}
        />
        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          exact
          isAdmin={true}
          path="/admin/reviews"
          component={ProductReviews}
        />

        {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
