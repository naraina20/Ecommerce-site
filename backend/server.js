const app = require("./app");
const connectmongodb = require('./config/database');
// const  path  = require("./app")
const cloudinary = require("cloudinary")

//handling uncought Exception
process.on("uncaughtException", err => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down server due to uncaught Exception");
  process.exit(1);
})

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


//connect database
connectmongodb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log("server is started at http://localhost:4000");
});


//unhandler promise rejection
process.on("unhandledRejection", err => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down server due to unhandled promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});