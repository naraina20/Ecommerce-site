const express = require("express");
const errormiddleware = require("./middleware/error");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const React = require("react")
const ReactDOMServer = require("react-dom/server")
const fs = require("fs")
const { getallproduct } = require("./controllers/productcontroller.js");
const axios = require("axios")
const { Provider } = require("react-redux");

const app = express();
require("dotenv")


// Allow all origins (not secure for production)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
// app.use(errormiddleware);



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

const buildPath = path.join(__dirname, "../frontend/build")


// app.get("/", async (req, res) => {
//   console.log("SENDING THE HTML ===============> ")
//   const indexFile = path.resolve(buildPath, "index.html")
//   let indexHTML = fs.readFileSync(indexFile, "utf8")
//   // Fetch products
//   const { data } = await axios.get("http://localhost:4000/api/v1/products")
//   const products = data.products

//   const appHtml = ReactDOMServer.renderToString(
//     React.createElement(Home, { products })
//   );
//   // const appHtml = ReactDOMServer.renderToString(<Home products = {products}/>);

//   indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
//   console.log("innerHtml ==> ", indexHTML)

//   res.send(indexHTML)

// })

// app.use(express.static(buildPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });



module.exports = app;
