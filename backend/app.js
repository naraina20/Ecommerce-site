const express = require("express");
const errormiddleware = require("./middleware/error");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//routes import
const product = require("./routes/productroute");
const user = require("./routes/userroute");
const order = require("./routes/orderroute");
const payment = require("./routes/paymentroute");
const category = require("./routes/categoryroute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", category);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware
app.use(errormiddleware);

module.exports = app;
