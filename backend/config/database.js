const mongoose = require("mongoose");

const connectmongodb = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`mongodb is connected ${data.connection.host}`);
    });
};

module.exports = connectmongodb;
