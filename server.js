const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const connectDB = require('./config/db');
const userRouter = require("./routers/user");

require("dotenv").config();

const app = express();

// Connect to Database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected successfully.."))
  .catch((error) => console.error(error));

// bodyParser
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("API is Running..."));
app.use("/user", userRouter);

// Define Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
