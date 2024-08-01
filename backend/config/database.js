const mongoose = require("mongoose");

const connectmongodb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      dbName: 'Ecommerce' // Add this line
    })
    .then((data) => {
      console.log(`MongoDB is connected to ${data.connection.host}`);
      console.log(`Using database: ${data.connection.name}`);
    });
};

module.exports = connectmongodb;