/**
 * Node-JS Boilerplate
 * @author Shuja Naqvi
 */
require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 5000;
require("./database");

// Middleware
require("./middleware/common")(app);

// API Routes
app.use("/api", require("./routes"));

// Server
server.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});

//Notification

io.on("connection", (socket) => {
  try {
    console.log("Connected");
    exports.io = io;
    exports.socket = socket;
  } catch (error) {
    console.log(error.message);
  }
});
