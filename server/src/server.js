const http = require("http");
//import express app from the app.js file
//pass app as a callback function to the http.createServer method
//this is to enable our htp server to listen to incoming http requests
//and also to easily handle http response
const app = require("./app");
const connectDb = require("./helpers/db");
const httpServer = http.createServer(app);
const { PORT } = require("./config/index");

//start the server
const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
