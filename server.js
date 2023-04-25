const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const dotenv = require("dotenv");
const studentRoute = require("./routes/student.route");
dotenv.config();
const port = process.env.PORT;
const assignmentRoute = require('./routes/assignment.route');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((e) => console.log("mongoDB connected"))
  .catch((e) => console.log(e));

app.use("/student", studentRoute);
app.use("/assignment", assignmentRoute);

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
