require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const SocketServer = require("./socketServer");
const { PDFDocument } = require("pdf-lib");
const path = require("path");
const cron = require("node-cron");
const { pingServer } = require("./utils/ping");
const { ExpressPeerServer } = require("peer");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json("Hello!");
});

//Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  SocketServer(socket);
});

// Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));
app.use("/api", require("./routes/notifyRouter"));
app.use("/api", require("./routes/messageRouter"));
app.use("/api", require("./routes/bookRouter"));
app.use("/api", require("./routes/bookshelfRouter"));
app.use("/api", require("./routes/ratingRouter"));
app.use("/api", require("./routes/reviewRouter"));
app.use("/api", require("./routes/reportRouter"));
app.use("/api", require("./routes/groupRouter"));

app.get("/books/:id/:pageNumber", async (req, res) => {
  try {
    const { id, pageNumber } = req.params;

    const url = `https://books.google.com/books?id=${id}&lpg=PP1&pg=PA${pageNumber}&output=embed`;
    const response = await axios.get(url);

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, (err) => {
  if (err) throw err;
  console.log("Connected to mongodb");
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.get("/iframe-url/:id/:pageNumber", async (req, res) => {
  const { id, pageNumber } = req.params;
  const iframeSrc = `https://books.google.com/books?id=${id}&lpg=PP1&pg=PA${pageNumber}&output=embed`;
  try {
    res.send(iframeSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
function getRandomPingTime() {
  // Generate a random number between 1 and 10
  const minutes = 3;
  // Convert minutes to cron format
  const cronTime = `*/${minutes} * * * *`;

  return cronTime;
}

//cron ping server

cron.schedule(getRandomPingTime(), pingServer);
const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log("Server is running on port", port);
});
