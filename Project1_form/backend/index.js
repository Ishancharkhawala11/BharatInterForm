const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const User = require("../backend/model/user");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/BharatIntern")
  .then(() => {
    console.log("success");
  })
  .catch(() => {
    console.log("fail");
  });
app.use(express.json());
app.use(cors());

app.post("/submit_registration", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (password.length > 8) {
    if (password == cpassword) {
      const user = new User({ name, email, password });
      try {
        await user.save();
        res
          .status(200)
          .json({ success: true, message: "registration successful" });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "email id is already  registered" });
      }
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: "password and confirm password does not match",
        });
    }
  }
  else
  {
    res
        .status(400)
        .json({
          success: false,
          message: "Password must be length of  more than 8 character",
        });
  }
});
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
